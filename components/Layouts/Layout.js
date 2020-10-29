import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { getStoreSettings } from '../../store/reducers/root/storeSettings';
import APP_QUERY from '../../queries/root/App.graphql';

export default function Layout({ children }) {
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
      <main>{children}</main>
      {store.copyright && <footer>{data.storeConfig.copyright}</footer>}
    </>
  );
}
