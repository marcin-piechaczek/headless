import { initializeApollo } from '../lib/apollo';
import PRODUCT_QUERY from '../queries/products/Product.graphql';

const useProduct = async (variables, client) => {
  const apolloClient = client || initializeApollo();

  const { error, data, loading } = await apolloClient.query({
    query: PRODUCT_QUERY,
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

export default useProduct;
