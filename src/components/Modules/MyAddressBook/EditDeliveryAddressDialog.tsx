import { Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import _ from 'lodash';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import { GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';

import DeliveryAddressForm from './DeliveryAddressForm';

type Inputs = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

type Props = {
  address: GetAddressInfoUserData['getAddressInfoUser']['deliveries'][0];
  open: boolean;
  onClose: () => void;
};

export default function EditDeliveryAddressDialog({ address, open, onClose }: Props) {
  const { t } = useTranslation(['myAddressBook']);

  const methods = useForm<Inputs>();

  // const { loading } = useMutationAuth();
  const loading = false;

  const onSubmit = (data) => {
    console.log('Submit edit data:', data);
  };

  const onError = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      title={t('myAddressBook:edit_dialog_title')}
      actionsNode={
        <Button
          color="primary"
          variant="contained"
          onClick={methods.handleSubmit(onSubmit, onError)}>
          {t('myAddressBook:submit_edit')}
        </Button>
      }>
      <LoadingBackdrop open={loading} />

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
            defaultValues={_.pick(address, [
              'name',
              'phone',
              'email',
              'street',
              'city',
              'district',
              'ward'
            ])}
          />
        </form>
      </FormProvider>
    </MuiDialog>
  );
}
