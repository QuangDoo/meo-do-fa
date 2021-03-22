import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import SearchScreen from 'src/components/Modules/SearchScreen';
import {
  GET_ALL_MANUFACTURERS,
  GetAllManufacturersData
} from 'src/graphql/manufacturers/manufacturers.query';
import withToken from 'src/utils/withToken';

Manufacturers.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'manufacturers']
});

function Manufacturers() {
  const { t } = useTranslation(['manufacturers', 'errors']);

  const { data } = useQuery<GetAllManufacturersData, undefined>(GET_ALL_MANUFACTURERS, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  return (
    <MainLayout>
      <Head>
        <title>{t('manufacturers:title')} - Medofa</title>
      </Head>

      <SearchScreen
        data={
          data?.getManufactoriesAll.map((i) => ({
            id: i.id,
            name: i.name,
            short_name: i.short_name
          })) || []
        }
        getItemHref={(id) => `/products?manufacturer=${id}`}
        getInfoHref={(id) => `/manufacturers/${id}`}
      />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Manufacturers);
