import { initializeApollo } from '../lib/apollo';
import CATEGORY_QUERY from '../queries/category/Category.graphql';
import activeLanguage from '../lib/i18n';
import cookie from 'js-cookie';

const useCategories = async (variables, client) => {
  const apolloClient = client || initializeApollo();
  console.log('Sending from [useCategories]', activeLanguage());

  const { error, data, loading } = await apolloClient.query({
    query: CATEGORY_QUERY,
    ...variables
  });
  return {
    error,
    data,
    loading
  };
};

export default useCategories;
