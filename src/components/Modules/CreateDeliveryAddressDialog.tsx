import { useMutation } from '@apollo/client';
import { Dialog } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import {
  CREATE_DELIVERY_USER,
  CreateDeliveryUserData,
  CreateDeliveryUserVars
} from 'src/graphql/user/createDeliveryUser';
import useAddress from 'src/hooks/useAddress';
import useUser from 'src/hooks/useUser';

import Button from '../Form/Button';
import InputWithLabel from '../Form/InputWithLabel';
import SelectWithLabel from '../Form/SelectWithLabel';
import ModalWithHeader from '../Layout/Modal/ModalWithHeader';
import InputCard from './Checkout/InputCard';

type FormInputs = {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation('checkout');

  const { user } = useUser();

  const { register, handleSubmit, watch } = useForm();

  const { cities, districts, wards } = useAddress({
    cityId: +watch('city')?.split('__')[1],
    districtId: +watch('district')?.split('__')[1],
    wardId: +watch('ward')?.split('__')[1]
  });

  const [createDeliveryUser, { loading }] = useMutation<
    CreateDeliveryUserData,
    CreateDeliveryUserVars
  >(CREATE_DELIVERY_USER);

  const onError = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { city, district, ward } = data;
    const [cityName, cityId] = city.split('__');
    const [districtName, districtId] = district.split('__');
    const [wardName, wardId] = ward.split('__');

    createDeliveryUser({
      variables: {
        inputs: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          shipping_address: {
            street: data.street,
            city: {
              id: +cityId,
              name: cityName
            },
            district: {
              id: +districtId,
              name: districtName
            },
            ward: {
              id: +wardId,
              name: wardName
            }
          }
        }
      }
    });
  };

  return (
    <ModalWithHeader
      open={props.open}
      onClose={props.onClose}
      title="Tạo địa chỉ giao hàng"
      maxWith="md"
      fullWith>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <InputWithLabel
          name="fullName"
          ref={register({
            required: t('checkout:name_required') + ''
          })}
          label={t('checkout:name_label')}
          type="text"
          placeholder={t('checkout:name_placeholder')}
          required
        />

        <div className="row">
          <InputWithLabel
            name="phone"
            ref={register({
              required: t('checkout:phone_required') + '',
              pattern: {
                value: viPhoneNumberRegex,
                message: t('checkout:phone_invalid')
              }
            })}
            type="number"
            label={t('checkout:phone_label')}
            containerClass="col-sm-4"
            placeholder={t('checkout:phone_placeholder')}
            required
          />

          <InputWithLabel
            name="email"
            ref={register({
              pattern: {
                value: emailRegex,
                message: t('checkout:email_invalid')
              }
            })}
            type="text"
            label={t('checkout:email_label')}
            containerClass="col-sm-8"
            placeholder={t('checkout:email_placeholder')}
          />
        </div>

        <InputWithLabel
          name="street"
          ref={register({
            required: t('checkout:address_required') + ''
          })}
          label={
            <>
              {t('checkout:address_label')}{' '}
              <span className="text-muted">{t('checkout:address_instructions')}</span>
            </>
          }
          type="text"
          required
        />

        <div className="row">
          <SelectWithLabel
            name="city"
            ref={register({
              required: t('checkout:city_required') + ''
            })}
            label={t('checkout:city_label')}
            containerClass="col-md-4"
            required>
            <option value="">{t('checkout:city_placeholder')}</option>

            {/* Map cities from api */}
            {cities.map((city) => (
              <option key={city.id} value={city.name + '__' + city.id}>
                {city.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select district */}
          <SelectWithLabel
            name="district"
            ref={register({
              required: t('checkout:district_required') + ''
            })}
            label={t('checkout:district_label')}
            labelClass="required"
            containerClass="col-md-4"
            disabled={!districts.length}>
            <option value="">{t('checkout:district_placeholder')}</option>

            {/* Map districts from chosen city */}
            {districts.map((district) => (
              <option key={district.id} value={district.name + '__' + district.id}>
                {district.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select ward */}
          <SelectWithLabel
            name="ward"
            ref={register({
              required: t('checkout:ward_required') + ''
            })}
            label={t('checkout:ward_label')}
            labelClass="required"
            containerClass="col-md-4"
            disabled={!wards.length}>
            <option value="">{t('checkout:ward_placeholder')}</option>

            {/* Map wards from chosen district */}
            {wards.map((ward) => (
              <option key={ward.id} value={ward.name + '__' + ward.id}>
                {ward.name}
              </option>
            ))}
          </SelectWithLabel>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </ModalWithHeader>
  );
}
