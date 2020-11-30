import cookie from 'js-cookie';
import { initializeApollo } from '../lib/apollo';
import PRODUCT_QUERY from '../queries/products/Product.graphql';
import activeLanguage from '../lib/i18n';

const useProduct = async (variables, client) => {
  const apolloClient = client || initializeApollo();
  console.log('Sending from [useProduct]', activeLanguage());

  const { error, data, loading } = await apolloClient.query({
    query: PRODUCT_QUERY,
    ...variables
  });
  return {
    error,
    data,
    loading
  };
};

export default useProduct;
