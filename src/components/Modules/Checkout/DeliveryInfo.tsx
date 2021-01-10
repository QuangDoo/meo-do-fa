import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'i18n';
import { AddressInfo } from 'net';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeliveryInfo as DeliveryInfoType } from 'src/graphql/user/getAddressInfoUser';

import CreateDeliveryAddressDialog from '../CreateDeliveryAddressDialog';
import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';

type Props = {
  deliveryAddresses: DeliveryInfoType[];
};

const DeliveryInfo = (props: Props) => {
  const { register, setValue } = useFormContext();

  const { t } = useTranslation(['checkout']);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const openCreateDialog = () => setCreateDialogOpen(true);
  const closeCreateDialog = () => setCreateDialogOpen(false);

  const [chooseDialogOpen, setChooseDialogOpen] = useState(false);
  const openChooseDialog = () => setChooseDialogOpen(true);
  const closeChooseDialog = () => setChooseDialogOpen(false);

  const [chosenDeliveryAddress, setChosenDeliveryAddress] = useState<DeliveryInfoType>(undefined);

  const handleCreateDeliveryAddressCompleted = () => {
    closeCreateDialog();
  };

  const handleChooseDeliveryAddress = (address: DeliveryInfoType) => {
    setChosenDeliveryAddress(address);
    setValue('partnerId', address.id);
    closeChooseDialog();
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
        handleDeliveryAddressChoose={handleChooseDeliveryAddress}
      />

      <input hidden type="text" ref={register} name="partnerId" />

      <div className="d-flex align-items-center mb-4">
        <h6 className="m-0">{t('checkout:deliveryInfo_title')}</h6>
      </div>

      {!!chosenDeliveryAddress && (
        <div className="mb-4">
          <Typography variant="h5" component="h2">
            {chosenDeliveryAddress.name}
          </Typography>

          <Box pt={2}>
            <h6 className="delivery-address-content">
              <div>Địa chỉ:</div>
              <div>{`${chosenDeliveryAddress.street}, ${chosenDeliveryAddress.ward}, ${chosenDeliveryAddress.district}, ${chosenDeliveryAddress.city}`}</div>
            </h6>

            <h6 className="delivery-address-content">
              <div>Điện thoại:</div>
              <div>{chosenDeliveryAddress.phone}</div>
            </h6>

            <h6 className="delivery-address-content">
              <div>Email:</div>
              <div>{chosenDeliveryAddress.email}</div>
            </h6>
          </Box>
        </div>
      )}

      <div className="d-flex align-items-center">
        <div className="mr-2">
          <Button type="button" variant="contained" color="primary" onClick={openChooseDialog}>
            {chosenDeliveryAddress
              ? t('checkout:choose_another_address')
              : t('checkout:choose_address')}
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
