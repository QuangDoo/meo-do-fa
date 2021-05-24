import { Trans, useTranslation } from 'i18n';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import useWebsitePost from 'src/hooks/useWebsitePost';
import redirect from 'src/utils/redirect';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';
import Career from '../../components/Modules/Career';

const CareerPage = () => {
  const { t } = useTranslation(['common', 'hr', 'header']);
  const hrList = useWebsitePost('HR');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
        <meta property="og:title" content="Career" />
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
      <Career hrList={hrList} />
    </MainLayout>
  );
};

CareerPage.getInitialProps = async (ctx) => {
  // redirect({
  //   ctx,
  //   location: '/'
  // });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

export default withToken({ ssr: true })(CareerPage);
