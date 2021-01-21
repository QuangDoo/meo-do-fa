import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars } from 'src/graphql/address/getWards';

export type DeliveryAddressInputs = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

type Props = {
  names: DeliveryAddressInputs;
  defaultValues?: DeliveryAddressInputs;
};

export default function DeliveryAddressForm(props: Props) {
  const { register, setValue, watch } = useFormContext();

  const { t } = useTranslation(['checkout', 'errors']);

  const isFirstAddressLoad = useRef(true);

  const chosenCity = watch(props.names.city, '');
  const chosenDistrict = watch(props.names.district, '');

  const { data: getCitiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!data.getCities?.length) return;

      const { id, name } = data.getCities.find((city) => city.name === props.defaultValues.city);

      setValue(props.names.city, name + '__' + id);
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const { data: getDistrictsData } = useQuery<GetDistrictsData, GetDistrictsVars>(GET_DISTRICTS, {
    skip: !chosenCity,
    variables: {
      city_id: +chosenCity.split('__')[1]
    },
    onCompleted: (data) => {
      if (isFirstAddressLoad.current && props.defaultValues?.district) {
        const { id, name } = data.getDistricts.find(
          (district) => district.name === props.defaultValues.district
        );

        setValue(props.names.district, name + '__' + id);
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const { data: getWardsData } = useQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    skip: !chosenDistrict,
    variables: {
      district_id: +chosenDistrict.split('__')[1]
    },
    onCompleted: (data) => {
      if (isFirstAddressLoad.current && props.defaultValues?.ward) {
        // Finish setting default address value
        isFirstAddressLoad.current = false;

        const { id, name } = data.getWards.find((ward) => ward.name === props.defaultValues.ward);

        setValue(props.names.ward, name + '__' + id);
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  return (
    <React.Fragment>
      {/* Name input */}
      <InputWithLabel
        name={props.names.name}
        ref={register({
          required: t('checkout:name_required') + ''
        })}
        label={t('checkout:name_label')}
        type="text"
        required
        defaultValue={props.defaultValues?.name || ''}
      />

      <div className="row">
        {/* Phone input */}
        <InputWithLabel
          name={props.names.phone}
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
          required
          defaultValue={props.defaultValues?.phone || ''}
        />

        {/* Email input */}
        <InputWithLabel
          name={props.names.email}
          ref={register({
            pattern: {
              value: emailRegex,
              message: t('checkout:email_invalid')
            }
          })}
          type="text"
          label={t('checkout:email_label')}
          containerClass="col-sm-8"
          defaultValue={props.defaultValues?.email || ''}
        />
      </div>

      {/* Street input */}
      <InputWithLabel
        name={props.names.street}
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
        defaultValue={props.defaultValues?.street || ''}
      />

      <div className="row">
        {/* Select city */}
        <SelectWithLabel
          name={props.names.city}
          ref={register({
            required: t('checkout:city_required') + ''
          })}
          label={t('checkout:city_label')}
          containerClass="col-md-4"
          required>
          <option value="">{t('checkout:city_placeholder')}</option>

          {getCitiesData?.getCities.map((city) => (
            <option key={city.id} value={city.name + '__' + city.id}>
              {city.name}
            </option>
          ))}
        </SelectWithLabel>

        {/* Select district */}
        <SelectWithLabel
          name={props.names.district}
          ref={register({
            required: t('checkout:district_required') + ''
          })}
          label={t('checkout:district_label')}
          labelClass="required"
          containerClass="col-md-4"
          disabled={!getDistrictsData?.getDistricts.length}>
          <option value="">{t('checkout:district_placeholder')}</option>

          {/* Map districts from chosen city */}
          {getDistrictsData?.getDistricts.map((district) => (
            <option key={district.id} value={district.name + '__' + district.id}>
              {district.name}
            </option>
          ))}
        </SelectWithLabel>

        {/* Select ward */}
        <SelectWithLabel
          name={props.names.ward}
          ref={register({
            required: t('checkout:ward_required') + ''
          })}
          label={t('checkout:ward_label')}
          labelClass="required"
          containerClass="col-md-4"
          disabled={!getWardsData?.getWards.length}>
          <option value="">{t('checkout:ward_placeholder')}</option>

          {/* Map wards from chosen district */}
          {getWardsData?.getWards.map((ward) => (
            <option key={ward.id} value={ward.name + '__' + ward.id}>
              {ward.name}
            </option>
          ))}
        </SelectWithLabel>
      </div>
    </React.Fragment>
  );
}
