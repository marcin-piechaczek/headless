import { Provider } from 'react-redux';
import { useStore } from '../lib/store';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/Theme';
import { useApollo } from '../lib/apollo';
import GlobalStyle from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
