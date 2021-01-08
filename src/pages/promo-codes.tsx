import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PromoCodes from 'src/components/Modules/PromoCodes';
import { TokenContext } from 'src/contexts/Token';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

PromotionCode.getInitialProps = async (ctx) => ({
  namespacesRequired: ['promoCodes'],
  token: getToken(ctx)
});

function PromotionCode(props): JSX.Element {
  return (
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <PromoCodes />

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(PromotionCode);
