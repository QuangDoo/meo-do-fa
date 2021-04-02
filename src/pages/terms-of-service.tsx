import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

TermsOfService.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function TermsOfService() {
  const termsOfServiceData = useWebsitePost('TOS');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <StaticPage pageContent={termsOfServiceData} />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(TermsOfService);
