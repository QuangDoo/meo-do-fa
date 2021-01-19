import { Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MuiDialog from 'src/components/Layout/Modal/MuiDialog';
import {
  CREATE_DELIVERY_USER,
  CreateDeliveryUserData,
  CreateDeliveryUserVars
} from 'src/graphql/user/createDeliveryUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import DeliveryAddressForm from './DeliveryAddressForm';

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted: () => void;
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
  const { t } = useTranslation(['myAddressBook', 'errors']);

  const methods = useForm<Inputs>({
    defaultValues
  });

  const [createDeliveryUser, { loading }] = useMutationAuth<
    CreateDeliveryUserData,
    CreateDeliveryUserVars
  >(CREATE_DELIVERY_USER, {
    onCompleted: () => {
      toast.success(t('myAddressBook:create_success'));
      props.onCompleted();
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onSubmit = (data) => {
    createDeliveryUser({
      variables: {
        inputs: {
          fullName: data.name,
          phone: data.phone,
          email: data.email,
          shipping_address: {
            street: data.street,
            city: data.city,
            district: data.district,
            ward: data.ward
          }
        }
      }
    });
  };

  const onError = (errors) => {
    const fields = Object.keys(errors);

    toast.error(errors[fields[0]].message);
  };

  return (
    <MuiDialog
      onClose={props.onClose}
      open={props.open}
      maxWidth="md"
      fullWidth
      title={t('myAddressBook:create_dialog_title')}
      actionsNode={
        <Button
          color="primary"
          variant="contained"
          onClick={methods.handleSubmit(onSubmit, onError)}>
          {t('myAddressBook:submit_create')}
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
          />
        </form>
      </FormProvider>
    </MuiDialog>
  );
}
