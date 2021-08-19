import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import { DeliveryAddress } from 'src/graphql/user/getAddressInfoUser';

const useStyles = makeStyles(() => ({
  cardContent: {
    paddingBottom: 0
  }
}));

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
  onChoose: (address: DeliveryAddress) => void;
  addresses: DeliveryAddress[];
};

export default function ChooseDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['chooseDeliveryAddress', 'errors']);

  const classes = useStyles();

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      title={t('chooseDeliveryAddress:dialog_title')}
      fullWidth>
      <Grid container spacing={3}>
        {props.addresses.map((address) => (
          <Grid key={address.id} item xs={12}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">{address.name}</Typography>

                <Box mt={1}>
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
