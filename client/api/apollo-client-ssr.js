import { ApolloClient, InMemoryCache } from "@apollo/client";

/*
  We will define BASE_URL and HOST in the local docker file, but when
  we are running outside of our cluster locally, or on DO, we will
  use the second url/host
*/
// const client = new ApolloClient({
//   uri: "http://squawktherapy.com/api/orgs/graphql",
//   headers: {
//     Host: "www.squawktherapy.com",
//   },
//   cache: new InMemoryCache(),
// });

// for local dev with skaffold (so jank right now, need to figure out a better way)
const client = new ApolloClient({
  uri:
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orgs/graphql",
  headers: {
    Host: process.env.HOST ? "squawk.dev" : "www.squawktherapy.com",
  },
  cache: new InMemoryCache(),
});

export default client;
