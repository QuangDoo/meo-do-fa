import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

DisputeResolution.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function DisputeResolution() {
  const disputeResolutionData = useWebsitePost('DISPUTE');
  const { t } = useTranslation(['disputeResolution']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('disputeResolution:title')}</title>
      </Head>

      <StaticPage pageContent={disputeResolutionData} />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(DisputeResolution);
