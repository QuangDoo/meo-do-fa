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
        <meta property="og:title" content="Terms of use" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <StaticPage pageContent={termsOfUseData} />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(TermsOfUse);
