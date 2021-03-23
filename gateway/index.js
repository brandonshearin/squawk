import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
//   "http://organizations-srv:3000/api/orgs/603b93fda582cf0019141a73"

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "organizations",
      url: "http://organizations-srv:3000/api/orgs/graphql",
    },
    // { name: "products", url: "http://localhost:4002" },
    // { name: "reviews", url: "http://localhost:4003" },
  ],
});

const server = new ApolloServer({ gateway, subscriptions: false });

server.listen({ port: 3000, url: "/api/gateway" }, () => {
  console.log(server.graphqlPath);
});
