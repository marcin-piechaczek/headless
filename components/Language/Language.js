import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useApolloClient } from '@apollo/client';
import cookie from 'js-cookie';
import activeLanguage from '../../lib/i18n';

const Language = () => {
  const router = useRouter();
  const [lang, setLang] = useState(router.defaultLocale);
  const [redirectUrl, setRedirectUrl] = useState(router.asPath);
  const client = useApolloClient();

  const fetcher = (url) =>
    axios
      .post(url, {
        lang,
        url: router.asPath
      })
      .then((res) => res.data);
  const { data, mutate } = useSWR('/api/routes', fetcher);

  useEffect(() => {}, [lang, redirectUrl]);

  const handleChangeLang = async (language) => {
    router.locale = language;
    activeLanguage(language);
    cookie.set('language', language);
    localStorage.removeItem('cartId');
    window.location.href = `/${language}`;
  };
  return (
    <>
      <select name="lang" value={router.locale} onChange={(e) => handleChangeLang(e.target.value)}>
        <option value="pl">PL</option>
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </>
  );
};

export default Language;
