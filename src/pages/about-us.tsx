import { useTranslation } from 'i18n';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import StaticPage from 'src/components/Modules/StaticPage';
import useWebsitePost from 'src/hooks/useWebsitePost';
import withToken from 'src/utils/withToken';

import Head from '../components/Layout/Head';

function AboutUs() {
  const aboutUsData = useWebsitePost('ABOUT');
  const { t } = useTranslation(['aboutUs']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('aboutUs:title')}</title>
        <meta property="og:title" content="About us" />
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

      <StaticPage pageContent={aboutUsData} />
    </MainLayout>
  );
}

AboutUs.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(AboutUs);
