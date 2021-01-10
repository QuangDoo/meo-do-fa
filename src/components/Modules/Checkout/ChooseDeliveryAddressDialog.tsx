import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import { DeliveryInfo } from 'src/graphql/user/getAddressInfoUser';

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
  deliveryAddresses: DeliveryInfo[];
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
                <h5 className="mb-4">{address.name}</h5>

                <h6 className="mb-3 delivery-address-content">
                  <div>Địa chỉ:</div>
                  <div>
                    {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                  </div>
                </h6>

                <h6 className="mb-3 delivery-address-content">
                  <div>Điện thoại:</div>
                  <div>{address.phone}</div>
                </h6>

                <h6 className="mb-3 delivery-address-content">
                  <div>Email:</div>
                  <div>{address.email}</div>
                </h6>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MuiDialog>
  );
}
