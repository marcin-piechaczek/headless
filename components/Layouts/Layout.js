import Head from 'next/head';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { getStoreSettings } from '../../store/reducers/root/storeSettings';
import APP_QUERY from '../../queries/root/App.graphql';
// import Cart from '../Cart/Cart';
import Cart2 from '../Cart/Cart2';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { isCartOpen } = useSelector(getStoreSettings);

  const { data, loading } = useQuery(APP_QUERY, {
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-first'
  });

  if (loading) return <Loader />;

  const store = data.storeConfig;
  const categories = data.categoryList[0].children;

  return (
    <>
      <Head>
        <title>{store.default_title}</title>
      </Head>
      <Header categoryList={categories} store={store} />
      <main style={{ position: 'realtive' }}>{children}</main>
      <Cart2 />
      {store.copyright && <footer>{data.storeConfig.copyright}</footer>}
    </>
  );
}
