import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

TermsOfUse.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'productCard', 'productBadge']
});

function TermsOfUse() {
  const termsOfUseData = useWebsitePost('TOU');
  const { t } = useTranslation(['termsOfService']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('termsOfService:title')}</title>
      </Head>

      <StaticPage pageContent={termsOfUseData} />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(TermsOfUse);
