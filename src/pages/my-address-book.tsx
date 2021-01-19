import { Button, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import CreateDeliveryAddressDialog from 'src/components/Modules/MyAddressBook/CreateDeliveryAddressDialog';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ADDRESS_INFO_USER, GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';
import { useLazyQueryAuth } from 'src/hooks/useApolloHookAuth';
import getToken from 'src/utils/getToken';
import withToken from 'src/utils/withToken';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2)
  },
  addButton: {
    padding: theme.spacing(2),
    fontSize: 16
  },
  normalText: {
    textTransform: 'unset'
  },
  deleteButton: {
    color: theme.palette.error.main
  }
}));

MyAddresses.getInitialProps = async (ctx) => {
  const token = getToken(ctx);

  const addressInfoUser = await ctx.apolloClient.query({
    query: GET_ADDRESS_INFO_USER,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        Authorization: token
      }
    }
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myAddressBook'],
    addressBook: addressInfoUser.data.getAddressInfoUser.deliveries
  };
};

type Props = {
  addressBook: GetAddressInfoUserData['getAddressInfoUser']['deliveries'];
};

function MyAddresses(props: Props) {
  const classes = useStyles();

  const { t } = useTranslation(['myAddressBook', 'errors']);

  const [addressBook, setAddressBook] = useState<typeof props['addressBook']>(props.addressBook);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [getAddressInfoUser, { loading: gettingAddressInfoUser }] = useLazyQueryAuth<
    GetAddressInfoUserData,
    undefined
  >(GET_ADDRESS_INFO_USER, {
    fetchPolicy: 'network-only',
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
    getAddressInfoUser();
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <LoadingBackdrop open={gettingAddressInfoUser} />

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
            <Grid item key={address.id} xs={12}>
              <Card variant="outlined" className={classes.card}>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="h6">{address.name}</Typography>
                  </Grid>

                  <Grid item>
                    <Button color="primary" size="small" className={classes.normalText}>
                      {t('myAddressBook:edit')}
                    </Button>

                    <Button size="small" className={clsx(classes.normalText, classes.deleteButton)}>
                      {t('myAddressBook:delete')}
                    </Button>
                  </Grid>
                </Grid>

                <h6 className="delivery-address-content mt-2">
                  <div>{t('myAddressBook:address')}:</div>
                  <div>
                    {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                  </div>

                  <div>{t('myAddressBook:phone')}:</div>
                  <div>{address.phone}</div>

                  <div>{t('myAddressBook:email')}:</div>
                  <div>{address.email || t('myAddressBook:email_not_provided')}</div>
                </h6>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAddresses);
