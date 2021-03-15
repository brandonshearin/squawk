import mongoose from "mongoose";
import { app } from "./app";
import { CommentCreatedListener } from "./events/listeners/comment-created-listener";
import { CommentDeletedEventListener } from "./events/listeners/comment-deleted-listener";
import { CommentUpdatedEventListener } from "./events/listeners/comment-updated-listener";
import { natsWrapper } from "./nats-wrapper";

import { buildSchema } from "type-graphql";
import { OrgResolver } from "./resolvers/organization-resolver";

import { ApolloServer } from "apollo-server-express";
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

    new CommentCreatedListener(natsWrapper.client).listen();
    new CommentUpdatedEventListener(natsWrapper.client).listen();
    new CommentDeletedEventListener(natsWrapper.client).listen();

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
    console.log("connected to mongo", process.env.DB_NAME);
  } catch (err) {
    console.log(err);
  }

  const schema = await buildSchema({
    resolvers: [OrgResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        user: req.currentUser,
      } as Context;
    },
  });
  server.applyMiddleware({ app, path: "/api/orgs/graphql" });

  await app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start().catch((err) => {
  console.log("service failure: ", err);
});
