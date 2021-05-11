import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { GET_COUNSEL } from 'src/graphql/order/getCounsel';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

Checkout.getInitialProps = async (ctx) => {
  await asyncQuery({
    ctx,
    query: GET_COUNSEL,
    fetchPolicy: 'network-only',
    auth: true
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'checkout', 'myAccount']
  };
};

function Checkout() {
  const { t } = useTranslation(['checkout']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('checkout:checkout')}</title>
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Checkout" property="og:title" />
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

      <CheckoutPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(Checkout);
