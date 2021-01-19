import { Button, Card, Grid, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ADDRESS_INFO_USER, GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

MyAddresses.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAddressBook']
});

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2)
  },
  addButton: {
    padding: theme.spacing(2)
  }
}));

function MyAddresses() {
  const classes = useStyles();

  const { t } = useTranslation(['myAddressBook', 'errors']);

  const { data, loading } = useQueryAuth<GetAddressInfoUserData, undefined>(GET_ADDRESS_INFO_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <ProfileLayout title={t('myAddressBook:title')}>
        <LoadingBackdrop open={loading} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <Button
                color="primary"
                fullWidth
                startIcon={<AddIcon />}
                className={classes.addButton}>
                Thêm địa chỉ mới
              </Button>
            </Card>
          </Grid>

          {data?.getAddressInfoUser?.deliveries?.map((address) => (
            <Grid item key={address.id} xs={12}>
              <Card className={classes.card}>
                <div className="text-uppercase mb-2">{address.name}</div>

                <div className="delivery-address-content">
                  <div>Địa chỉ:</div>
                  <div>
                    {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                  </div>

                  <div>Điện thoại:</div>
                  <div>{address.phone}</div>

                  <div>Email:</div>
                  <div>{address.email}</div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAddresses);
