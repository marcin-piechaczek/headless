import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout({ children, title = 'This is the default title' }) {
  const router = useRouter();
  const { locale } = router;
  console.log(router);
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |
          <Link href="/about">
            <a>About</a>
          </Link>
          |
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
        <p>Current locale: {locale}</p>
      </header>

      {children}

      <footer>{'I`m here to stay'}</footer>
    </div>
  );
}
