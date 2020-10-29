import { initializeApollo } from '../lib/apollo';
import PRODUCTS_QUERY from '../queries/products/Products.graphql';

const useProducts = async (variables, client) => {
  const apolloClient = client || initializeApollo();

  const { error, data, loading } = await apolloClient.query({
    query: PRODUCTS_QUERY,
    ...variables
  });
  return {
    error,
    data,
    loading
  };
};

export default useProducts;
