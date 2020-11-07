import { withTranslation } from 'i18n';
import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';
import DealsPage from '../components/Modules/Deals';

function Deal() {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />

      <Nav />

      <DealsPage />

      <Footer />
    </>
  );
}

Deal.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default withTranslation('common')(Deal);
