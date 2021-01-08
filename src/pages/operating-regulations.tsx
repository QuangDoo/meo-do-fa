import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import { TokenContext } from 'src/contexts/Token';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

OperatingRegulations.getInitialProps = async (ctx) => ({
  namespacesRequired: ['common', 'operatingRegulations'],
  token: getToken(ctx)
});

function OperatingRegulations(props) {
  const { t } = useTranslation(['common', 'operatingRegulations']);

  return (
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('operatingRegulations:title')}</h2>

        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      </div>

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(OperatingRegulations);
