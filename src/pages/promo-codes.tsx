import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';
import withToken from 'src/utils/withToken';

PromotionCode.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promoCodes']
});

const WithToken = withToken(PromotionCode);

function PromotionCode(props) {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <PromoCodes />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(WithToken);
