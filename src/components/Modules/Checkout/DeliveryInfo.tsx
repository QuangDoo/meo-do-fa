import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { DeliveryInfo as DeliveryAddress } from 'src/graphql/user/getAddressInfoUser';

import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import InputCard from './InputCard';

type State = 'chosen' | 'create' | undefined;

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout']);

  const [state, setState] = useState<State>();

  const [open, setOpen] = useState(false);

  const handleAddressChoose = (address: DeliveryAddress) => {
    setOpen(false);
    setState('chosen');
    console.log('chosen address:', address);
  };

  return (
    <InputCard title={t('checkout:deliveryInfo_title')} hasRequired>
      {state === undefined && (
        <Box alignItems="baseline" display="flex">
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Chọn địa chỉ
          </Button>
          <div className="text-uppercase mx-2">hoặc</div>
          <Button variant="contained" color="primary">
            Tạo địa chỉ mới
          </Button>
        </Box>
      )}

      {state === 'create' && <CreateDeliveryAddressForm />}

      {state === 'chosen' && <div>Chosen address here</div>}

      <ChooseDeliveryAddressDialog
        open={open}
        onClose={() => setOpen(false)}
        onChoose={handleAddressChoose}
        deliveryAddresses={[]}
      />
    </InputCard>
  );
};

export default DeliveryInfo;
