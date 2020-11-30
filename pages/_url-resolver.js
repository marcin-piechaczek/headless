import Error from 'next/error';
import React from 'react';
import CmsPageLayout from '../components/Layouts/CmsPage/CmsPageLayout';
import CategoryLayout from '../components/Layouts/Category/CategoryLayout';
import ProductLayout from '../components/Layouts/Product/ProductLayout';
import { initializeApollo } from '../lib/apollo';
import useUrlResolver from '../hooks/useUrlResolver';
import useCategories from '../hooks/useCategories';
import useProducts from '../hooks/useProducts';
import useProduct from '../hooks/useProduct';
import useAppConfig from '../hooks/useAppConfig';
import useCreateCart from '../hooks/useCreateCart';
import CheckoutLayout from '../components/Layouts/Checkout/Checkout';
import ResetPass from '../components/Signin/ResetPass';
import activeLanguage from '../lib/i18n';
import cookie from 'js-cookie';
import { initializeStore } from '../lib/store';
import { setStoreLanguage } from '../store/actions/storeSettings';
import detectLanguage from '../lib/detectLanguage';

const CONTENT_TYPE = {
  CMS_PAGE: 'CMS_PAGE',
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  CHECKOUT: 'CHECKOUT',
  RESET_PASS: 'RESET_PASS',
  NOT_FOUND: '404'
};

const URLResolver = ({ type, urlKey }) => {
  if (type === CONTENT_TYPE.CMS_PAGE) {
    return <CmsPageLayout />;
  }

  if (type === CONTENT_TYPE.CATEGORY) {
    return <CategoryLayout filters={{ url_key: { eq: urlKey } }} />;
  }

  if (type === CONTENT_TYPE.CHECKOUT) {
    return <CheckoutLayout />;
  }

  if (type === CONTENT_TYPE.PRODUCT) {
    return <ProductLayout filters={{ url_key: { eq: urlKey } }} />;
  }

  if (type === CONTENT_TYPE.RESET_PASS) {
    return <ResetPass />;
  }

  return <Error statusCode={500} />;
};

URLResolver.getInitialProps = async (ctx) => {
  const { req, res, query, locale } = ctx;
  res?.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');
  const isBrowser = typeof window !== 'undefined';
  const lang = detectLanguage(ctx);
  activeLanguage(lang);

  console.log('dskakdaskdklasdklaskld', ctx);

  if (isBrowser) {
    await useCreateCart();
  }

  const apolloClient = initializeApollo();

  let pathname = query?.pathname.join('/');
  const urlKey = query?.pathname?.pop().split('.')?.shift() || '';
  const resetPassToken = query?.token;

  const regex = /[a-zA-Z]{2}[\/]/g; // fr/ pl/ en/

  if (regex.test(pathname)) {
    pathname = pathname.slice(2, pathname.length);
  }

  /** If a type has been provided then return the props and render the Component ... */
  if (query.type) {
    return { type: query.type, urlKey };
  }

  /** ... if not, let's resolver the URL ...  */
  const urlResolverVar = { variables: { url: pathname } };
  const { data } = await useUrlResolver(urlResolverVar, apolloClient, ctx);

  /** ... if not found, return 404 ... */
  if (!data?.urlResolver) {
    if (res) res.statusCode = 404;
    return { type: '404', pathname };
  }

  const { type, id } = data.urlResolver;

  /** ... if the request is done by the server, then let's load the data in cache of SSR goodness ... */
  if (req) {
    await useAppConfig(apolloClient, ctx);
    switch (type) {
      case CONTENT_TYPE.CMS_PAGE:
        // Not implemented...
        break;
      case CONTENT_TYPE.CATEGORY:
        const categoryVar = { variables: { filters: { url_key: { eq: urlKey } } } };
        const { data } = await useCategories(categoryVar, apolloClient);

        /** If the category is set to show products, then load those products as well */
        if (/PRODUCTS/.test(data.categoryList[0]?.display_mode)) {
          const productsVar = { variables: { filters: { category_id: { eq: id } } } };
          await useProducts(productsVar, apolloClient);
        }
        break;
      case CONTENT_TYPE.PRODUCT:
        const productVar = { variables: { filters: { url_key: { eq: urlKey } } } };
        await useProduct(productVar, apolloClient);
        break;
      default:
        break;
    }
  }

  return {
    type,
    urlKey,
    initialApolloState: apolloClient.cache.extract()
  };
};

export default URLResolver;
