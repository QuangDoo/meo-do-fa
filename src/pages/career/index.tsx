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
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Career" property="og:title" />
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
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
