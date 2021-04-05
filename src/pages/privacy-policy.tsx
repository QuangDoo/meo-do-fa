import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

PrivacyPolicy.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'privacyPolicy']
});

function PrivacyPolicy() {
  const privacyPolicyData = useWebsitePost('PPOLICY');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <StaticPage pageContent={privacyPolicyData} />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(PrivacyPolicy);
