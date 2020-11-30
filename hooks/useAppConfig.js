import { initializeApollo } from '../lib/apollo';
import APP_QUERY from '../queries/root/App.graphql';
import activeLanguage from '../lib/i18n';
import cookie from 'js-cookie';

const useAppConfig = async (client) => {
  const apolloClient = client || initializeApollo();
  console.log('Sending from [useAppConfig]', activeLanguage());
  console.log('Sending from [useAppConfig] cookie', cookie.get('language'));

  const { error, data, loading } = await apolloClient.query({
    query: APP_QUERY,
    context: {
      headers: {
        store: activeLanguage()
      }
    }
  });
  return {
    error,
    data,
    loading
  };
};

export default useAppConfig;
