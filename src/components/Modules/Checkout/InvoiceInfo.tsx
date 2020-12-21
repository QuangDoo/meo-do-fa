import { Trans, useTranslation } from 'i18n';
import React, { useState } from 'react';
import { emailRegex } from 'src/assets/regex/email';
import Checkbox from 'src/components/Form/Checkbox';
import Dropdown from 'src/components/Form/Dropdown';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import { City } from 'src/graphql/address/getCities';
import { District } from 'src/graphql/address/getDistricts';
import { Ward } from 'src/graphql/address/getWards';
import useUser from 'src/hooks/useUser';
import { ReactHookFormRegister } from 'src/types/ReactHookFormRegister';

import BillingExport from './BillingExport';
import InputCard from './InputCard';

type DataCityType = {
  id: number;
  name: string;
};
type Props = {
  cities: City[];
  districts: District[];
  wards: Ward[];
  required?: boolean;
} & ReactHookFormRegister;

const InvoiceInfo = (props: Props): JSX.Element => {
  const { cities, districts, wards, register } = props;

  const { t } = useTranslation(['checkout', 'myAccount']);

  const { user } = useUser();

  return (
    <BillingExport ref={register} name="isInvoice" label={t('checkout:billing_export')}>
      <InputCard title={t('checkout:billing_info_title')} hasRequired>
        {/* Name input */}
        <InputWithLabel
          name="name"
          ref={register({
            required: t('checkout:name_required') + ''
          })}
          label={t('checkout:name_label')}
          type="text"
          placeholder={t('checkout:name_placeholder')}
          defaultValue={user?.name}
          required
        />

        <div className="row">
          {/* Taxe_code input */}
          <InputWithLabel
            ref={register({
              required: t('checkout:taxcode_required') + ''
            })}
            label={t('myAccount:tax_code_label')}
            name="vat"
            type="text"
            placeholder={t('myAccount:tax_code_placeholder')}
            defaultValue={user?.vat}
            containerClass="col-sm-4"
            required
          />

          {/* Email input */}
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
            defaultValue={user?.email}
          />
        </div>

        {/* Address input */}
        <InputWithLabel
          name="address"
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
          defaultValue={user?.contact_address?.street || ''}
        />

        <div className="row">
          {/* Select city */}
          <SelectWithLabel
            name="cityId"
            ref={register({
              required: t('checkout:city_required') + ''
            })}
            label={t('checkout:city_label')}
            containerClass="col-md-4"
            required>
            {user?.contact_address.city.name && (
              <option value="">{user?.contact_address.city.name}</option>
            )}
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select district */}
          <SelectWithLabel
            name="districtId"
            ref={register({
              required: t('checkout:district_required') + ''
            })}
            label={t('checkout:district_label')}
            labelClass="required"
            containerClass="col-md-4">
            {user?.contact_address.district.name && (
              <option value="">{user?.contact_address.district.name}</option>
            )}

            {/* Map districts from chosen city */}
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select ward */}
          <SelectWithLabel
            name="wardId"
            ref={register({
              required: t('checkout:ward_required') + ''
            })}
            label={t('checkout:ward_label')}
            labelClass="required"
            containerClass="col-md-4">
            <option value="">{user?.contact_address.ward.name}</option>

            {/* Map wards from chosen district */}
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </SelectWithLabel>
        </div>

        <Checkbox
          ref={register}
          name="saveInfo"
          containerClass="mt-2"
          label={t('checkout:saveInfo_label')}
          labelClass="form__label"
        />
      </InputCard>
    </BillingExport>
  );
};

export default InvoiceInfo;
