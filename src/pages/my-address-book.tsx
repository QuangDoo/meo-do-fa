import { Button, Card, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import AddressItem from 'src/components/Modules/MyAddressBook/AddressItem';
import CreateDeliveryAddressDialog from 'src/components/Modules/MyAddressBook/CreateDeliveryAddressDialog';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ADDRESS_INFO_USER, GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

const useStyles = makeStyles((theme) => ({
  addButton: {
    padding: theme.spacing(2),
    fontSize: 16
  },
  normalText: {
    textTransform: 'unset'
  }
}));

MyAddresses.getInitialProps = async (ctx) => {
  await asyncQuery({
    ctx,
    query: GET_ADDRESS_INFO_USER,
    fetchPolicy: 'network-only',
    auth: true
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myAddressBook']
  };
};

function MyAddresses() {
  const classes = useStyles();

  const { t } = useTranslation(['myAddressBook', 'errors']);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { data: addressInfoUserData, refetch: refetchAddressInfoUser, loading } = useQueryAuth<
    GetAddressInfoUserData,
    undefined
  >(GET_ADDRESS_INFO_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const addressBook = addressInfoUserData?.getAddressInfoUser?.deliveries || [];

  const onCreateCompleted = () => {
    setOpenCreate(false);
    refetchAddressInfoUser();
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myAddressBook:title')}</title>
      </Head>

      <LoadingBackdrop open={loading} />

      <CreateDeliveryAddressDialog
        onCompleted={onCreateCompleted}
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      <ProfileLayout title={t('myAddressBook:title')}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <Button
                color="primary"
                fullWidth
                startIcon={<AddIcon />}
                className={clsx(classes.addButton, classes.normalText)}
                onClick={() => setOpenCreate(true)}>
                {t('myAddressBook:create')}
              </Button>
            </Card>
          </Grid>

          {addressBook.map((address) => (
            <AddressItem
              address={address}
              key={address?.id}
              refetchAddressInfoUser={refetchAddressInfoUser}
            />
          ))}
        </Grid>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAddresses);
