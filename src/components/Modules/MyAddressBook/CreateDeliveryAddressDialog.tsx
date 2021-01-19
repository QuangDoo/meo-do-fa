import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';

import DeliveryAddressForm from './DeliveryAddressForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Inputs = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

const defaultValues: Inputs = {
  name: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  district: '',
  ward: ''
};

export default function CreateDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['myAddressBook']);

  const methods = useForm<Inputs>({
    defaultValues
  });

  const onSubmit = (data) => {
    console.log('Submit data:', data);
  };

  return (
    <MuiDialog
      onClose={props.onClose}
      open={props.open}
      maxWidth="md"
      fullWidth
      title={t('myAddressBook:create_dialog_title')}
      actionsNode={
        <Button color="primary" variant="contained" onClick={methods.handleSubmit(onSubmit)}>
          {t('myAddressBook:submit_create')}
        </Button>
      }>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DeliveryAddressForm
            names={{
              name: 'name',
              phone: 'phone',
              email: 'email',
              street: 'street',
              city: 'city',
              district: 'district',
              ward: 'ward'
            }}
          />
        </form>
      </FormProvider>
    </MuiDialog>
  );
}
