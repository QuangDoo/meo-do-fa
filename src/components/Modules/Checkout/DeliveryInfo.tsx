import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeliveryInfo as DeliveryInfoType } from 'src/graphql/user/getAddressInfoUser';
import useUser from 'src/hooks/useUser';

import CreateDeliveryAddressDialog from '../CreateDeliveryAddressDialog';

type Props = {
  deliveryAddresses: DeliveryInfoType[];
};

const DeliveryInfo = (props: Props) => {
  const { register } = useFormContext();

  const { t } = useTranslation('checkout');

  const { user } = useUser();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [changeDialogOpen, setChangeDialogOpen] = useState(false);

  const [chosen, setChosen] = useState(undefined);

  return (
    <div className="elevated p-3 p-md-4">
      <CreateDeliveryAddressDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />

      <input hidden type="text" ref={register} name="partnerId" />

      <div className="d-flex align-items-center mb-4">
        <h6 className="m-0">{t('checkout:deliveryInfo_title')}</h6>
      </div>

      <div className="mb-4">
        <div>Name: {chosen?.name}</div>
        <div>Phone: {chosen?.phone}</div>
        <div>Email: {chosen?.email}</div>
        <div>
          Address: {`${chosen?.street}, ${chosen?.city}, ${chosen?.district}, ${chosen?.ward}`}
        </div>
      </div>

      <div className="d-flex align-items-center">
        <div className="mr-2">
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setChangeDialogOpen(true)}>
            Chọn địa chỉ khác
          </Button>
        </div>
        hoặc
        <div className="ml-2">
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setCreateDialogOpen(true)}>
            tạo địa chỉ mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
