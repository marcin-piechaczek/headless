import Head from 'next/head';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import APP_QUERY from '../../queries/root/App.graphql';
import Cart2 from '../Cart/Cart2';
import SignInWrapper from '../Signin/SignInWrapper';
import useTidioChat from '../../hooks/useTidioChat';
import Chat from '../Chat/Chat';

export default function Layout({ children }) {
  const router = useRouter();

  const { data, loading } = useQuery(APP_QUERY, {});

  if (loading) return <Loader />;

  const store = data.storeConfig;
  const categories = data.categoryList[0].children;

  return (
    <>
      <Head>
        <title>{store.default_title}</title>
      </Head>
      <Chat />
      <Header categoryList={categories} store={store} />
      <main style={{ position: 'relative' }}>{children}</main>
      <Cart2 />
      {store.copyright && <footer>{data.storeConfig.copyright}</footer>}
    </>
  );
}
