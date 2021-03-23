import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set("user-cookie", context.userCookie);
  }
}

const start = async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.set("trust proxy", true);
  const gateway = new ApolloGateway({
    serviceList: [
      {
        name: "organizations",
        url: "http://organizations-srv:3000/api/orgs/graphql",
      },
      // { name: "products", url: "http://localhost:4002" },
      // { name: "reviews", url: "http://localhost:4003" },
    ],
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: async ({ req }) => {
      const cookies = req.cookies;
      const userCookie =
        cookies["next-auth.session-token"] ||
        cookies["__Secure-next-auth.session-token"];
      return { userCookie };
    },
  });

  server.applyMiddleware({ app, path: "/api/gateway/graphql" });
  await app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start().catch((err) => {
  console.log("gateway failure: ", err);
});
