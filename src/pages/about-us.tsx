import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

import Head from '../components/Layout/Head';

function AboutUs() {
  const aboutUsData = useWebsitePost('ABOUT');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <StaticPage pageContent={aboutUsData} />
    </MainLayout>
  );
}

AboutUs.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(AboutUs);
