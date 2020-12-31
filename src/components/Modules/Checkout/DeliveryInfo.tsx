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
  const openCreateDialog = () => setCreateDialogOpen(true);
  const closeCreateDialog = () => setCreateDialogOpen(false);

  const [changeDialogOpen, setChangeDialogOpen] = useState(false);
  const openChangeDialog = () => setChangeDialogOpen(true);
  const closeChangeDialog = () => setChangeDialogOpen(false);

  const [chosen, setChosen] = useState(undefined);

  const handleCreateDeliveryAddressCompleted = () => {
    closeCreateDialog();
  };

  return (
    <div className="elevated p-3 p-md-4">
      <CreateDeliveryAddressDialog
        open={createDialogOpen}
        onClose={closeCreateDialog}
        onCompleted={handleCreateDeliveryAddressCompleted}
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
          <Button type="button" variant="contained" color="primary" onClick={openChangeDialog}>
            {t('checkout:choose_address_button')}
          </Button>
        </div>
        {t('checkout:or')}
        <div className="ml-2">
          <Button type="button" variant="contained" color="primary" onClick={openCreateDialog}>
            {t('checkout:create_address_button')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
