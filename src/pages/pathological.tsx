import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import withApollo from 'src/utils/withApollo';

function Pathological() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container text-center py-3">
        <h1>{t('common:updating')}</h1>
      </div>

      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Pathological);
