import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { useStore } from '../lib/store';
import theme from '../styles/Theme';
import { useApollo } from '../lib/apollo';
import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layouts/Layout';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
