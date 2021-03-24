import buildClient from "../api/build-client";
import Header from "../components/header";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../api/apollo-client";
import { UserContext } from "../hooks/UserContext";
import { Provider } from "next-auth/client";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  pageProps = { ...pageProps, currentUser };
  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const data = {};
  // const { data } = await client.get("/api/users/currentuser");

  // we need the following lines so that the getInitialProps function
  // on any individual component is invoked
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return { pageProps, ...data };
};

export default AppComponent;
