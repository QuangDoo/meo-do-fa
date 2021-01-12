import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GetAddressInfoUserData } from 'src/graphql/user/getAddressInfoUser';

import { CheckoutFormInputs } from '.';
import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import InputCard from './InputCard';

type State = 'chosen' | 'create' | undefined;

type Address = GetAddressInfoUserData['getAddressInfoUser']['deliveries'][0];

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout']);

  const [state, setState] = useState<State>(undefined);

  const [open, setOpen] = useState(false);

  const [chosenAddress, setChosenAddress] = useState<Address>(undefined);

  const { setValue } = useFormContext<CheckoutFormInputs>();

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
      {state === undefined ? (
        <Box alignItems="baseline" display="flex">
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Chọn địa chỉ
          </Button>
          <div className="text-uppercase mx-2">hoặc</div>
          <Button variant="contained" color="primary" onClick={() => setState('create')}>
            Tạo địa chỉ mới
          </Button>
        </Box>
      ) : (
        <div className="mb-3">
          <Button variant="contained" color="default" onClick={reset} startIcon={<ArrowBackIcon />}>
            Trở về
          </Button>
        </div>
      )}

      {state === 'create' && <CreateDeliveryAddressForm />}

      {state === 'chosen' && (
        <React.Fragment>
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
      />
    </InputCard>
  );
};

export default DeliveryInfo;
