import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import { TokenContext } from 'src/contexts/Token';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

Pathological.getInitialProps = async (ctx) => ({
  namespacesRequired: ['common'],
  token: getToken(ctx)
});

function Pathological(props) {
  const { t } = useTranslation('common');

  return (
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container text-center py-3">
        <h1>{t('common:updating')}</h1>
      </div>

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(Pathological);
