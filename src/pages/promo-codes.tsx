import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import withApollo from 'src/utils/withApollo';

PromotionCode.getInitialProps = async () => ({
  namespacesRequired: ['promoCodes']
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

export default withApollo({ ssr: true })(PromotionCode);
