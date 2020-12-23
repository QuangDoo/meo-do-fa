import { useTranslation } from 'i18n';
import React from 'react';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import Checkbox from 'src/components/Form/Checkbox';
import { City } from 'src/graphql/address/getCities';
import { District } from 'src/graphql/address/getDistricts';
import { Ward } from 'src/graphql/address/getWards';
import useUser from 'src/hooks/useUser';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import InputWithLabel from '../../Form/InputWithLabel';
import SelectWithLabel from '../../Form/SelectWithLabel';
import InputCard from './InputCard';

type DataCityType = {
  id: number;
  name: string;
};

type Props = {
  cities: City[];
  districts: District[];
  wards: Ward[];
} & ReactHookFormRegister;

const DeliveryInfo = (props: Props) => {
  const { cities, districts, wards, register } = props;

  const { t } = useTranslation('checkout');

  const { user } = useUser();

  const { name, phone, email, contact_address } = user || {};

  return (
    <InputCard title={t('checkout:deliveryInfo_title')} hasRequired>
      {/* Name input */}
      <InputWithLabel
        name="deliveryName"
        ref={register({
          required: t('checkout:name_required') + ''
        })}
        label={t('checkout:name_label')}
        type="text"
        defaultValue={name}
        placeholder={t('checkout:name_placeholder')}
        required
      />

      <div className="row">
        {/* Phone input */}
        <InputWithLabel
          name="deliveryPhone"
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
          defaultValue={phone}
          placeholder={t('checkout:phone_placeholder')}
          required
        />

        {/* Email input */}
        <InputWithLabel
          name="deliveryEmail"
          ref={register({
            pattern: {
              value: emailRegex,
              message: t('checkout:email_invalid')
            }
          })}
          type="text"
          label={t('checkout:email_label')}
          containerClass="col-sm-8"
          defaultValue={email}
          placeholder={t('checkout:email_placeholder')}
        />
      </div>

      {/* Street input */}
      <InputWithLabel
        name="deliveryStreet"
        defaultValue={contact_address?.street}
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
        {/* Select city */}
        <SelectWithLabel
          name="deliveryCity"
          ref={register({
            required: t('checkout:city_required') + ''
          })}
          label={t('checkout:city_label')}
          containerClass="col-md-4"
          required>
          <option value="">{t('checkout:city_placeholder')}</option>

          {/* Map cities from api */}
          {cities.map((city: DataCityType) => (
            <option key={city.id} value={city.name + '__' + city.id}>
              {city.name}
            </option>
          ))}
        </SelectWithLabel>

        {/* Select district */}
        <SelectWithLabel
          name="deliveryDistrict"
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
          name="deliveryWard"
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

      {/* Save info for next time */}
      <Checkbox
        ref={register}
        name="deliverySaveInfo"
        containerClass="mt-2"
        label={t('checkout:saveInfo_label')}
        labelClass="form__label"
      />
    </InputCard>
  );
};

export default DeliveryInfo;
