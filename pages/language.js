import { useRouter } from 'next/router';

const Language = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  return (
    <div>
      <p>Current locale: {locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(locales)}</p>
    </div>
  );
};

export default Language;
