import buildClient from "../api/build-client";
import Header from "../components/header";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../api/apollo-client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  // we need the following lines so that the getInitialProps function
  // on any individual component is invoked
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data };
};

export default AppComponent;
