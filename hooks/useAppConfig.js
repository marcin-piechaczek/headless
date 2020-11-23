import { initializeApollo } from '../lib/apollo';
import APP_QUERY from '../queries/root/App.graphql';

const useAppConfig = async (client, locale) => {
  const apolloClient = client || initializeApollo();

  const { error, data, loading } = await apolloClient.query({
    query: APP_QUERY
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-first'
  });
  return {
    error,
    data,
    loading
  };
};

export default useAppConfig;
