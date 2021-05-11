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
        <meta property="og:title" content="Checkout" />
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

      <CheckoutPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(Checkout);
