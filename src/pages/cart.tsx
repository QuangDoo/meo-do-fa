import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import CartPage from 'src/components/Modules/Cart';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

Cart.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'cart']
});

function Cart() {
  const { t } = useTranslation(['cart']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('cart:cart')}</title>
        <meta property="og:title" content="Cart" />
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

      <CartPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(Cart);
