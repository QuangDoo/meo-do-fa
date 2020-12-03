import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PromoCodes from 'src/components/Modules/PromoCodes';
import withApollo from 'src/utils/withApollo';

function PromotionCode(): JSX.Element {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <PromoCodes />

      <Footer />
    </>
  );
}

PromotionCode.getInitialProps = async () => ({
  namespacesRequired: ['promoCodes']
});

export default withApollo({ ssr: true })(PromotionCode);
