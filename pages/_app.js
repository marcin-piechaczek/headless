import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useStore } from '../lib/store';
import theme from '../styles/Theme';
import { useApollo } from '../lib/apollo';
import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layouts/Layout';
import '../styles/tailwind.css';
import * as locales from '../locales/index';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const localeCopy = locales[locale];

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={localeCopy}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </IntlProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
