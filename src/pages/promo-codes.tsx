import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

PromotionCode.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promoCodes'],
  token: getToken(ctx)
});

function PromotionCode(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <PromoCodes />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(PromotionCode);
