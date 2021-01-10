import { Button } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeliveryInfo as DeliveryInfoType } from 'src/graphql/user/getAddressInfoUser';

import CreateDeliveryAddressDialog from '../CreateDeliveryAddressDialog';
import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';

type Props = {
  deliveryAddresses: DeliveryInfoType[];
};

const DeliveryInfo = (props: Props) => {
  const { register } = useFormContext();

  const { t } = useTranslation(['checkout']);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const openCreateDialog = () => setCreateDialogOpen(true);
  const closeCreateDialog = () => setCreateDialogOpen(false);

  const [chooseDialogOpen, setChooseDialogOpen] = useState(false);
  const openChooseDialog = () => setChooseDialogOpen(true);
  const closeChooseDialog = () => setChooseDialogOpen(false);

  const [chosenAddress, setChosenAddress] = useState(undefined);

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

      <ChooseDeliveryAddressDialog
        open={chooseDialogOpen}
        onClose={closeChooseDialog}
        deliveryAddresses={props.deliveryAddresses}
      />

      <input hidden type="text" ref={register} name="partnerId" />

      <div className="d-flex align-items-center mb-4">
        <h6 className="m-0">{t('checkout:deliveryInfo_title')}</h6>
      </div>

      <div className="mb-4">
        <div>Name: {chosenAddress?.name}</div>
        <div>Phone: {chosenAddress?.phone}</div>
        <div>Email: {chosenAddress?.email}</div>
        <div>
          Address:{' '}
          {`${chosenAddress?.street}, ${chosenAddress?.city}, ${chosenAddress?.district}, ${chosenAddress?.ward}`}
        </div>
      </div>

      <div className="d-flex align-items-center">
        <div className="mr-2">
          <Button type="button" variant="contained" color="primary" onClick={openChooseDialog}>
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
