import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import withApollo from 'src/utils/withApollo';

const GeneralPolicy = () => {
  const { t } = useTranslation(['common', 'generalPolicy']);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('generalPolicy:title')}</h2>

        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      </div>

      <Footer />
    </>
  );
};

GeneralPolicy.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'generalPolicy']
});

export default withApollo({ ssr: true })(GeneralPolicy);
