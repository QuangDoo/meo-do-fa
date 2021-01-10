import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import redirect from 'src/utils/redirect';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';
import Career from '../../components/Modules/Career';

const CareerPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <Career />
    </MainLayout>
  );
};

CareerPage.getInitialProps = async (ctx) => {
  redirect({
    ctx,
    location: '/'
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

export default withToken({ ssr: true })(CareerPage);
