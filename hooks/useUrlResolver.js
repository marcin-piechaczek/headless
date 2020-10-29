import { initializeApollo } from '../lib/apollo';
import URL_RESOLVER_QUERY from '../queries/urlResolver/UrlResolver.graphql';

const useUrlResolver = async (variables, client) => {
  const apolloClient = client || initializeApollo();

  const { error, data, loading } = await apolloClient.query({
    query: URL_RESOLVER_QUERY,
    ...variables
  });
  return {
    error,
    data,
    loading
  };
};

export default useUrlResolver;
