import Head from 'next/head';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Promotions from 'src/components/Modules/Promtions';
import withToken from 'src/utils/withToken';

Promotion.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promotions']
});

function Promotion(): JSX.Element {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <Promotions />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Promotion);
