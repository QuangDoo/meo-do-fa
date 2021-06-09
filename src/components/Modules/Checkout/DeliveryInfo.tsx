import { Box } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { Fragment, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUser } from 'src/contexts/User';
import {
  Address,
  GET_ADDRESS_INFO_USER,
  GetAddressInfoUserData
} from 'src/graphql/user/getAddressInfoUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import getAddressString from 'src/utils/getAddressString';

import DeliveryAddressForm from '../MyAddressBook/DeliveryAddressForm';
import { CheckoutFormInputs } from '.';
import ChooseDeliveryAddressDialog from './ChooseDeliveryAddressDialog';
import InputCard from './InputCard';

const DeliveryInfo = () => {
  const { t } = useTranslation(['checkout', 'errors']);

  const { data: user } = useUser();

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

  const handleCreateAddressClick = () => {
    setChosenAddress(undefined);
    setValue('deliveryPartnerId', '');
  };

  return (
    <InputCard title={t('checkout:deliveryInfo_title')} hasRequired={!chosenAddress}>
      {chosenAddress ? (
        <h6 className="delivery-address-content">
          <div className="font-weight-bold">{t('chooseDeliveryAddress:company_name')}:</div>
          <div className="font-weight-bold">{chosenAddress.name}</div>

          <div>{t('chooseDeliveryAddress:address')}:</div>
          <div>
            {getAddressString({
              street: chosenAddress.street,
              ward: chosenAddress.ward,
              district: chosenAddress.district,
              city: chosenAddress.city
            })}
          </div>

          <div>{t('chooseDeliveryAddress:phone')}:</div>
          <div>{chosenAddress.phone}</div>

          <div>{t('chooseDeliveryAddress:email')}:</div>
          <div>{chosenAddress.email || t('chooseDeliveryAddress:email_not_provided')}</div>
        </h6>
      ) : (
        <DeliveryAddressForm
          fieldNames={{
            name: 'deliveryName',
            phone: 'deliveryPhone',
            email: 'deliveryEmail',
            street: 'deliveryStreet',
            city: 'deliveryCity',
            district: 'deliveryDistrict',
            ward: 'deliveryWard'
          }}
          defaultValues={{
            name: user?.name,
            phone: user?.phone,
            email: user?.email,
            street: user?.contact_address?.street,
            ward: user?.contact_address?.ward?.name,
            district: user?.contact_address?.district?.name,
            city: user?.contact_address?.city?.name
          }}
        />
      )}

      {chosenAddress ? (
        <Box alignItems="baseline" display="flex" mt={2} whiteSpace="break-spaces" fontSize={14}>
          {t('checkout:not_this_address') + ' '}

          {data?.getAddressInfoUser.deliveries.length > 1 && (
            <Fragment>
              <button type="button" className="btn-link" onClick={() => setOpen(true)}>
                {t('checkout:choose_another_address')}
              </button>
              {' ' + t('checkout:or') + ' '}
            </Fragment>
          )}

          <button type="button" className="btn-link" onClick={handleCreateAddressClick}>
            {t('checkout:create_address')}
          </button>
        </Box>
      ) : (
        data?.getAddressInfoUser.deliveries.length > 0 && (
          <Box alignItems="baseline" display="flex" mt={2} whiteSpace="break-spaces" fontSize={14}>
            {t('checkout:use_previous_address') + ' '}
            <button type="button" className="btn-link" onClick={() => setOpen(true)}>
              {t('checkout:choose_address')}
            </button>
          </Box>
        )
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
