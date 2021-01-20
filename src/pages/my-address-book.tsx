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
import getToken from 'src/utils/getToken';
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
  const token = getToken(ctx);

  let addressInfoUser;

  try {
    addressInfoUser = await ctx.apolloClient.query({
      query: GET_ADDRESS_INFO_USER,
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      context: {
        headers: {
          Authorization: token
        }
      }
    });
  } catch (error) {
    console.log('Error:', error);
  }

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myAddressBook'],
    addressBook: addressInfoUser?.data.getAddressInfoUser.deliveries
  };
};

type Props = {
  addressBook: GetAddressInfoUserData['getAddressInfoUser']['deliveries'];
};

function MyAddresses(props: Props) {
  const classes = useStyles();

  const { t } = useTranslation(['myAddressBook', 'errors']);

  const [addressBook, setAddressBook] = useState<typeof props['addressBook']>(
    props.addressBook || []
  );

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const { refetch: refetchAddressInfoUser, loading } = useQueryAuth<
    GetAddressInfoUserData,
    undefined
  >(GET_ADDRESS_INFO_USER, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setAddressBook(data.getAddressInfoUser.deliveries);
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onCreateCompleted = () => {
    setOpenCreate(false);
    refetchAddressInfoUser();
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
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
              key={address.id}
              onDeleteCompleted={() => refetchAddressInfoUser()}
            />
          ))}
        </Grid>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAddresses);
