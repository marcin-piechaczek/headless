import { initializeApollo } from '../lib/apollo';
import CATEGORY_QUERY from '../queries/category/Category.graphql';

const useCategories = async (variables, client) => {
  const apolloClient = client || initializeApollo();

  const { error, data, loading } = await apolloClient.query({
    query: CATEGORY_QUERY,
    ...variables
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-first'
  });
  return {
    error,
    data,
    loading
  };
};

export default useCategories;
