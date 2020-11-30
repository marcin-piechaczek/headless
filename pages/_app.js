import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import cookie from 'js-cookie';
import { useStore } from '../lib/store';
import theme from '../styles/Theme';
import { useApollo } from '../lib/apollo';
import GlobalStyle from '../styles/GlobalStyle';
import Layout from '../components/Layouts/Layout';
import '../styles/tailwind.css';
import * as locales from '../locales/index';
import activeLanguage from '../lib/i18n';
import useLogger from '../hooks/useLogger';

function MyApp({ Component, pageProps, language }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const { locale, defaultLocale } = router;
  activeLanguage(locale);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={locales.default[locale]}>
        <ApolloProvider client={apolloClient}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </IntlProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const language = appContext.router.locale;
  activeLanguage(language);
  cookie.set('language', appContext.router.locale);
  useLogger('initial props', activeLanguage());
  return { ...appProps, language };
};

export default MyApp;
