import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.BASE_URL || "http://squawktherapy.com";
const host = process.env.HOST || "www.squawktherapy.com";

console.log(`${uri}/api/orgs/graphql`);
console.log(host);
const client = new ApolloClient({
  uri: `${uri}/api/orgs/graphql`,
  headers: { Host: host },
  cache: new InMemoryCache(),
});

export default client;

// uri: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orgs/graphql"
// headers: {Host: "squawk.dev"}
