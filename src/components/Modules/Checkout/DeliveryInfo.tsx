import { Box, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeliveryInfo as DeliveryAddress } from 'src/graphql/user/getAddressInfoUser';

import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import InputCard from './InputCard';

type State = 'chosen' | 'create' | undefined;

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout']);

  const [state, setState] = useState<State>(undefined);

  const [open, setOpen] = useState(false);

  const handleAddressChoose = (address: DeliveryAddress) => {
    setOpen(false);
    setState('chosen');
    console.log('chosen address:', address);
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
          <Button
            variant="contained"
            color="default"
            onClick={() => setState(undefined)}
            startIcon={<ArrowBackIcon />}>
            Trở về
          </Button>
        </div>
      )}

      {state === 'create' && <CreateDeliveryAddressForm />}

      {state === 'chosen' && <div>Chosen address here</div>}

      <ChooseDeliveryAddressDialog
        open={open}
        onClose={() => setOpen(false)}
        onChoose={handleAddressChoose}
      />
    </InputCard>
  );
};

export default DeliveryInfo;
