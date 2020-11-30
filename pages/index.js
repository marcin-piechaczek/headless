import { useIntl } from 'react-intl';
import Layout from '../components/Layouts/Layout';
import { initializeStore } from '../lib/store';
import {
  setStoreLanguage,
  storeTypes,
  toggleSearchResultAction
} from '../store/actions/storeSettings';
import useAppConfig from '../hooks/useAppConfig';
import useProducts from '../hooks/useProducts';
import { initializeApollo } from '../lib/apollo';
import APP_QUERY from '../queries/root/App.graphql';
import CATEGORY_QUERY from '../queries/category/Category.graphql';
import PRODUCTS_QUERY from '../queries/products/Products.graphql';
import PRODUCT_QUERY from '../queries/products/Product.graphql';
import URLResolver from './_url-resolver';
import useCategories from '../hooks/useCategories';
import locale from 'yup/lib/locale';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function Home() {
  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setStoreLanguage({
        data: {
          language: 'test'
        }
      })
    );
  };

  return (
    <>
      <div>Index</div>
      <h1>Locale: {router.locale}</h1>
      <h1>{f('hello')}, Kuba!</h1>
      <button onClick={handleClick}>redux</button>
    </>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  const productsVar = { variables: { search: '' } };

  await useAppConfig(apolloClient);
  await useProducts(productsVar, apolloClient);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};
