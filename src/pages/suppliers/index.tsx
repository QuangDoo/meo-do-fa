import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_SUPPLIERS,
  GetAllSuppliersData,
  GetSuppliersVars
} from 'src/graphql/suppliers/suppliers.query';
import withToken from 'src/utils/withToken';

SuppliersPage.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'general']
});

function SuppliersPage() {
  const { t } = useTranslation(['general', 'errors']);

  const { data: getSuppliersData, loading: loadingSuppliers, error: errorReturn } = useQuery<
    GetAllSuppliersData,
    GetSuppliersVars
  >(GET_ALL_SUPPLIERS, {
    variables: { page: 1, pageSize: 20, name: '' },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });
  const dataReturn = getSuppliersData?.getSuppliers;
  if (errorReturn) {
    console.log('errorReturn suppliers page', errorReturn);
  }

  return (
    <MainLayout>
      <Head>
        <title>{t('general:all_suppliers')} - Medofa</title>
      </Head>
      {loadingSuppliers && <CircularProgress size={60} />}
      <SearchScreen
        data={
          dataReturn?.map((i) => ({
            id: i.id,
            name: i.name
          })) || []
        }
        getItemHref={(id) => `/products?supplier=${id}`}
        getInfoHref={(id) => `/suppliers/${id}`}
      />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(SuppliersPage);
