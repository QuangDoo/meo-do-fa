import { Button, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';
import getAddressString from 'src/utils/getAddressString';

import DeleteDeliveryAddressDialog from './DeleteDeliveryAddressDialog';
import EditDeliveryAddressDialog from './EditDeliveryAddressDialog';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2)
  },
  normalText: {
    textTransform: 'unset'
  },
  deleteButton: {
    color: theme.palette.error.main
  }
}));

type Props = {
  address: GetAddressInfoUserData['getAddressInfoUser']['deliveries'][0];
  refetchAddressInfoUser: () => void;
};

export default function AddressItem(props: Props) {
  const { address } = props;

  const { t } = useTranslation(['myAddressBook']);

  const classes = useStyles();

  const [editDialogIsOpen, setEditDialogIsOpen] = useState<boolean>(false);

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState<boolean>(false);

  const onDeleteCompleted = () => {
    setDeleteDialogIsOpen(false);

    props.refetchAddressInfoUser();
  };

  const onUpdateCompleted = () => {
    setEditDialogIsOpen(false);

    props.refetchAddressInfoUser();
  };

  return (
    <Grid item key={address?.id} xs={12}>
      <EditDeliveryAddressDialog
        open={editDialogIsOpen}
        onClose={() => setEditDialogIsOpen(false)}
        address={address}
        onUpdateCompleted={onUpdateCompleted}
      />

      <DeleteDeliveryAddressDialog
        open={deleteDialogIsOpen}
        onClose={() => setDeleteDialogIsOpen(false)}
        id={address?.id}
        onDeleteCompleted={onDeleteCompleted}
      />

      <Card variant="outlined" className={classes.card}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h6">{address?.name}</Typography>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              size="small"
              className={classes.normalText}
              onClick={() => setEditDialogIsOpen(true)}>
              {t('myAddressBook:edit')}
            </Button>

            <Button
              size="small"
              className={clsx(classes.normalText, classes.deleteButton)}
              onClick={() => setDeleteDialogIsOpen(true)}>
              {t('myAddressBook:delete')}
            </Button>
          </Grid>
        </Grid>

        <h6 className="delivery-address-content mt-2">
          <div>{t('myAddressBook:address')}:</div>
          <div>
            {getAddressString({
              street: address.street,
              ward: address.ward,
              district: address.district,
              city: address.city
            })}
          </div>

          <div>{t('myAddressBook:phone')}:</div>
          <div>{address?.phone}</div>

          <div>{t('myAddressBook:email')}:</div>
          <div>{address?.email || t('myAddressBook:email_not_provided')}</div>
        </h6>
      </Card>
    </Grid>
  );
}
