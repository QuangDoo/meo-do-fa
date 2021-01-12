import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import {
  AddressInfo,
  GET_ADDRESS_INFO_USER,
  GetAddressInfoUserData
} from 'src/graphql/user/getAddressInfoUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
  onChoose: (address: AddressInfo) => void;
};

export default function ChooseDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['chooseDeliveryAddress', 'errors']);

  const { data } = useQueryAuth<GetAddressInfoUserData, undefined>(GET_ADDRESS_INFO_USER, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions.code}`));
    }
  });

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      title={t('chooseDeliveryAddress:dialog_title')}
      fullWidth>
      <Grid container spacing={3}>
        {data?.getAddressInfoUser?.deliveries.map((address) => (
          <Grid key={address.id} item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {address.name}
                </Typography>

                <Box pt={2}>
                  <h6 className="delivery-address-content">
                    <div>{t('chooseDeliveryAddress:address')}:</div>
                    <div>
                      {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                    </div>

                    <div>{t('chooseDeliveryAddress:phone')}:</div>
                    <div>{address.phone}</div>

                    <div>{t('chooseDeliveryAddress:email')}:</div>
                    <div>{address.email || t('chooseDeliveryAddress:email_not_provided')}</div>
                  </h6>
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.onChoose?.(address)}>
                  {t('chooseDeliveryAddress:choose_this_address')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MuiDialog>
  );
}
