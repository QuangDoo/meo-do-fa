import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import withToken from 'src/utils/withToken';

PromotionCode.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promoCodes']
});

function PromotionCode() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <PromoCodes />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(PromotionCode);
