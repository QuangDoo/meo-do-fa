import { useTranslation } from 'i18n';
import React from 'react';
import { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import WishListPage from 'src/components/Modules/WishList/index';
import withToken from 'src/utils/withToken';

WishList.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'wishList']
});

function WishList() {
  const { t } = useTranslation(['wishList']);
  return <WishListPage />;
}

export default withToken({ ssr: true })(WishList);
