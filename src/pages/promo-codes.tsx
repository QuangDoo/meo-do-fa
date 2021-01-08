import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

PromotionCode.getInitialProps = async (ctx) => ({
  namespacesRequired: ['promoCodes'],
  token: getToken(ctx)
});

function PromotionCode(props): JSX.Element {
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
