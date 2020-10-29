import Layout from '../components/Layouts/Layout';
import { initializeStore } from '../lib/store';
import { storeTypes } from '../store/actions/storeSettings';
import useAppConfig from '../hooks/useAppConfig';
import useProducts from '../hooks/useProducts';
import { initializeApollo } from '../lib/apollo';
import APP_QUERY from '../queries/root/App.graphql';
import CATEGORY_QUERY from '../queries/category/Category.graphql';
import PRODUCTS_QUERY from '../queries/products/Products.graphql';
import PRODUCT_QUERY from '../queries/products/Product.graphql';
import URLResolver from './_url-resolver';
import useCategories from '../hooks/useCategories';

export default function Home() {
  return <div>Index</div>;
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
