import Head from 'next/head';
import Layout from '../components/Layout/Layout';

export default function Home() {
  return (
    <Layout title="Index page">
      {/*<p>Current locale: {props.locale}</p>*/}
      <div>Index</div>
    </Layout>
  );
}

export const getServerSideProps = ({ locale }) => {
  console.log(locale);
  return {
    props: {
      locale
    }
  };
};
