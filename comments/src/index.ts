import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

import { TypegooseMiddleware } from "./typegoose-middleware";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { ObjectIdScalar } from "./object-id.scalar";
import { ObjectId } from "mongodb";
import { CommentResolver } from "./resolvers/comment-resolver";
export interface Context {
  user: {
    id: string;
    email: string;
    iat: number;
  };
}

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_KEY) {
    throw new Error("MONGO_KEY must be defined");
  }
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    /* Mongoose internally keeps track of this connection, so that anytime we use 
       mongoose in any other parts of our code, the package is under-the-hood managing
       connecting us to the same instance */
    await mongoose.connect(
      `mongodb+srv://brandonshearin:${process.env.MONGO_KEY}@cluster0.ybkow.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("connected to mongo");
  } catch (err) {
    console.log(err);
  }

  const schema = await buildSchema({
    resolvers: [CommentResolver],
    emitSchemaFile: true,
    validate: false,
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        user: req.currentUser,
      } as Context;
    },
  });
  server.applyMiddleware({ app, path: "/api/comments/graphql" });

  await app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start().catch((error) => {
  console.log("service failure: ", error);
});
