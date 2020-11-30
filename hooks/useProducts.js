import cookie from 'js-cookie';
import { initializeApollo } from '../lib/apollo';
import PRODUCTS_QUERY from '../queries/products/Products.graphql';
import activeLanguage from '../lib/i18n';

const useProducts = async (variables, client) => {
  const apolloClient = client || initializeApollo();
  console.log('Sending from [useProducts]', activeLanguage());

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
