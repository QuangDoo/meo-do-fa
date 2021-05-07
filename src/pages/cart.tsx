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
      </Head>

      <CartPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(Cart);
