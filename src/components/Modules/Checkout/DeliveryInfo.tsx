import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Address,
  GET_ADDRESS_INFO_USER,
  GetAddressInfoUserData
} from 'src/graphql/user/getAddressInfoUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import { CheckoutFormInputs } from '.';
import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import InputCard from './InputCard';

type State = 'chosen' | 'create' | undefined;

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout']);

  const [state, setState] = useState<State>(undefined);

  const [open, setOpen] = useState(false);

  const [chosenAddress, setChosenAddress] = useState<Address>(undefined);

  const { setValue } = useFormContext<CheckoutFormInputs>();

  const { data } = useQueryAuth<GetAddressInfoUserData, undefined>(GET_ADDRESS_INFO_USER, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions.code}`));
    },
    onCompleted: (data) => {
      const deliveryAddresses = data.getAddressInfoUser.deliveries;

      if (deliveryAddresses.length === 0) return;

      const latest = deliveryAddresses[deliveryAddresses.length - 1];
      setValue('deliveryPartnerId', latest.id);
      setChosenAddress(latest);
      setState('chosen');
    }
  });

  const handleAddressChoose = (address: Address) => {
    setOpen(false);
    setState('chosen');
    setChosenAddress(address);
    setValue('deliveryPartnerId', address.id);
  };

  const reset = () => {
    setState(undefined);
    setValue('deliveryPartnerId', '');
  };

  return (
    <InputCard title={t('checkout:deliveryInfo_title')} hasRequired={state === 'create'}>
      {state === undefined && (
        <Box alignItems="baseline" display="flex">
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            {t('checkout:choose_address')}
          </Button>
          <div className="text-uppercase mx-2">{t('checkout:or')}</div>
          <Button variant="contained" color="primary" onClick={() => setState('create')}>
            {t('checkout:create_address')}
          </Button>
        </Box>
      )}

      {state === 'create' && (
        <React.Fragment>
          <Box alignItems="baseline" display="flex" mb={2}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              {t('checkout:choose_address')}
            </Button>
          </Box>

          <CreateDeliveryAddressForm />
        </React.Fragment>
      )}

      {state === 'chosen' && (
        <React.Fragment>
          <Box alignItems="baseline" display="flex" mb={2}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              {t('checkout:choose_another_address')}
            </Button>
            <div className="text-uppercase mx-2">{t('checkout:or')}</div>
            <Button variant="contained" color="primary" onClick={() => setState('create')}>
              {t('checkout:create_address')}
            </Button>
          </Box>

          <Typography variant="h5" component="h2">
            {chosenAddress.name}
          </Typography>

          <Box pt={2}>
            <h6 className="delivery-address-content">
              <div>{t('chooseDeliveryAddress:address')}:</div>
              <div>{`${chosenAddress.street}, ${chosenAddress.ward}, ${chosenAddress.district}, ${chosenAddress.city}`}</div>

              <div>{t('chooseDeliveryAddress:phone')}:</div>
              <div>{chosenAddress.phone}</div>

              <div>{t('chooseDeliveryAddress:email')}:</div>
              <div>{chosenAddress.email || t('chooseDeliveryAddress:email_not_provided')}</div>
            </h6>
          </Box>
        </React.Fragment>
      )}

      <ChooseDeliveryAddressDialog
        open={open}
        onClose={() => setOpen(false)}
        onChoose={handleAddressChoose}
        addresses={data?.getAddressInfoUser.deliveries || []}
      />
    </InputCard>
  );
};

export default DeliveryInfo;
