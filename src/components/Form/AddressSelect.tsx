import { useTranslation } from 'i18n';
import React from 'react';

import SelectWithLabel from './SelectWithLabel';

type SelectProps = {
  name: string;
  register;
  options: {
    id: number;
    name: string;
  }[];
  currentValue: number;
};

type Props = {
  cityProps: SelectProps;
  districtProps: SelectProps;
  wardProps: SelectProps;
};

const AddressSelect = (props: Props) => {
  const { t } = useTranslation('common');

  const { options: cities, register: cityRegister, name: cityName } = props.cityProps;

  const {
    options: districts,
    register: districtRegister,
    name: districtName
  } = props.districtProps;

  const { options: wards, register: wardRegister, name: wardName } = props.wardProps;

  return (
    <div className="row">
      <SelectWithLabel
        name={cityName}
        ref={cityRegister}
        containerClass="col-md-4"
        required
        label={t('common:city_select_label')}>
        <option value="">{t('common:city_select_placeholder')}</option>

        {cities.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>

      <SelectWithLabel
        name={districtName}
        ref={districtRegister}
        containerClass="col-md-4"
        required
        label={t('common:district_select_label')}
        disabled={!districts.length}>
        <option value="">{t('common:district_select_placeholder')}</option>

        {districts.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>

      <SelectWithLabel
        ref={wardRegister}
        containerClass="col-md-4"
        required
        label={t('common:ward_select_label')}
        name={wardName}
        disabled={!wards.length}>
        <option value="">{t('common:ward_select_placeholder')}</option>

        {wards.map(({ id, name }) => (
          <option key={id} value={name + '__' + id}>
            {name}
          </option>
        ))}
      </SelectWithLabel>
    </div>
  );
};

export default AddressSelect;
