import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useUser from 'src/hooks/useUser';

import CreateDeliveryAddressDialog from '../CreateDeliveryAddressDialog';

const DeliveryInfo = () => {
  const { register } = useFormContext();

  const { t } = useTranslation('checkout');

  const { user } = useUser();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Choose another delivery address
      </button>

      <CreateDeliveryAddressDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default DeliveryInfo;
