import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import withApollo from 'src/utils/withApollo';

function QuickOrder(): JSX.Element {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <QuickOrderPage />

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(QuickOrder);
