import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: `${process.env.BASE_URL}/api/orgs/graphql`,
  uri: "http://www.squawktherapy.com/api/orgs/graphql",
  headers: { Host: "www.squawktherapy.com" },
  cache: new InMemoryCache(),
});

export default client;

// uri: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orgs/graphql"
// headers: {Host: "squawk.dev"}
