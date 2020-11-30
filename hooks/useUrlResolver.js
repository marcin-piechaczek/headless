import { initializeApollo } from '../lib/apollo';
import URL_RESOLVER_QUERY from '../queries/urlResolver/UrlResolver.graphql';
import detectLanguage from '../lib/detectLanguage';

const useUrlResolver = async (variables, client, ctx) => {
  const apolloClient = client || initializeApollo();
  const lang = detectLanguage(ctx);

  const { error, data, loading } = await apolloClient.query({
    query: URL_RESOLVER_QUERY,
    ...variables,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        store: lang
      }
    }
  });
  return {
    error,
    data,
    loading
  };
};

export default useUrlResolver;
