import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import cookie from 'js-cookie';
import activeLanguage from './i18n';
import useLogger from '../hooks/useLogger';
import { initializeStore } from './store';
import { setStoreLanguage } from '../store/actions/storeSettings';

/**
 * Polyfill Global Variables in Server
 */
if (!process.browser) {
  global.URL = require('url').URL;
}

let apolloClient;
let token;
let cartId;

function createApolloClient() {
  const uri = process.browser
    ? new URL('/graphql', location.href)
    : new URL('/graphql', process.env.MAGENTO_URL).href;
  const reduxStore = initializeStore();

  if (process.browser) {
    token = localStorage.getItem('token');
    cartId = localStorage.getItem('cartId');
  }

  return new ApolloClient({
    ssrMode: !process.browser,
    credentials: 'include',
    link: new HttpLink({
      uri,
      credentials: 'include',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        store: activeLanguage()
      }
    }),
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        Cart: {
          fields: {
            available_payment_methods: {
              keyFields: ['code'],
              merge(existing = [], incoming) {
                return incoming;
              }
            },
            shipping_addresses: {
              keyFields: ['telephone'],
              merge(existing = [], incoming) {
                // return [...existing, ...incoming];
                return incoming;
              }
            }
          }
        },
        Query: {
          fields: {
            activeLanguage: {
              read() {
                return activeLanguage();
              }
            },
            CartId: {
              read(CartId = null) {
                return cartId || CartId;
              }
            }
          }
        }
      }
    })
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
