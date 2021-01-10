import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import { DeliveryInfo } from 'src/graphql/user/getAddressInfoUser';

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
  deliveryAddresses: DeliveryInfo[];
  handleDeliveryAddressChoose: (address: DeliveryInfo) => void;
};

export default function ChooseDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['chooseDeliveryAddress']);

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      title={t('chooseDeliveryAddress:dialog_title')}
      fullWidth>
      <Grid container spacing={3}>
        {props.deliveryAddresses.map((address) => (
          <Grid key={address.id} item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {address.name}
                </Typography>

                <Box pt={2}>
                  <h6 className="delivery-address-content">
                    <div>Địa chỉ:</div>
                    <div>
                      {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                    </div>
                  </h6>

                  <h6 className="delivery-address-content">
                    <div>Điện thoại:</div>
                    <div>{address.phone}</div>
                  </h6>

                  <h6 className="delivery-address-content">
                    <div>Email:</div>
                    <div>{address.email}</div>
                  </h6>
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.handleDeliveryAddressChoose?.(address)}>
                  Chọn địa chỉ này
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MuiDialog>
  );
}
