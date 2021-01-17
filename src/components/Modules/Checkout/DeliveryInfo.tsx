import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { Fragment, useState } from 'react';
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

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout']);

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
    }
  });

  const handleAddressChoose = (address: Address) => {
    setOpen(false);
    setChosenAddress(address);
    setValue('deliveryPartnerId', address.id);
  };

  return (
    <InputCard title={t('checkout:deliveryInfo_title')} hasRequired={!chosenAddress}>
      {chosenAddress ? (
        <Fragment>
          <h6 className="delivery-address-content">
            <div className="font-weight-bold">{t('chooseDeliveryAddress:name')}:</div>
            <div className="font-weight-bold">{chosenAddress.name}</div>

            <div>{t('chooseDeliveryAddress:address')}:</div>
            <div>{`${chosenAddress.street}, ${chosenAddress.ward}, ${chosenAddress.district}, ${chosenAddress.city}`}</div>

            <div>{t('chooseDeliveryAddress:phone')}:</div>
            <div>{chosenAddress.phone}</div>

            <div>{t('chooseDeliveryAddress:email')}:</div>
            <div>{chosenAddress.email || t('chooseDeliveryAddress:email_not_provided')}</div>
          </h6>

          <Box alignItems="baseline" display="flex" mt={2} whiteSpace="break-spaces" fontSize={14}>
            <button type="button" className="btn-link" onClick={() => setOpen(true)}>
              {t('checkout:choose_another_address')}
            </button>
            {' ' + t('checkout:or') + ' '}
            <button type="button" className="btn-link" onClick={() => setChosenAddress(undefined)}>
              {t('checkout:create_address')}
            </button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Box alignItems="baseline" display="flex" mb={2}>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              {t('checkout:choose_address')}
            </Button>
          </Box>

          <CreateDeliveryAddressForm />
        </Fragment>
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
