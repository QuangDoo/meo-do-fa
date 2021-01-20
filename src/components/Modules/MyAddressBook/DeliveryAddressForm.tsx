import { useLazyQuery, useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import { City, GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  District,
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars, Ward } from 'src/graphql/address/getWards';

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
  const { register, setValue } = useFormContext();

  const { t } = useTranslation(['checkout', 'errors']);

  const isFirstAddressLoad = useRef(true);

  const [cities, setCities] = useState<City[]>([]);

  const [districts, setDistricts] = useState<District[]>([]);

  const [wards, setWards] = useState<Ward[]>([]);

  useQuery<GetCitiesData, undefined>(GET_CITIES, {
    onCompleted: (data) => {
      // Set city options
      setCities(data.getCities);

      // If this is first load, and city has default value
      // => Use city name to find city id to set default value and get districts
      if (isFirstAddressLoad.current && props.defaultValues.city) {
        const defaultCity = data.getCities.find((city) => city.name === props.defaultValues.city);

        setValue(props.names.city, defaultCity.name + '__' + defaultCity.id);

        getDistricts({
          variables: {
            city_id: defaultCity.id
          }
        });
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const [getDistricts] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(GET_DISTRICTS, {
    onCompleted: (data) => {
      setDistricts(data.getDistricts);

      if (!data.getDistricts.length) return;

      if (isFirstAddressLoad.current && props.defaultValues.district) {
        const defaultDistrict = data.getDistricts.find(
          (district) => district.name === props.defaultValues.district
        );

        setValue(props.names.district, defaultDistrict.name + '__' + defaultDistrict.id);

        getWards({
          variables: {
            district_id: defaultDistrict.id
          }
        });
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const [getWards] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    onCompleted: (data) => {
      setWards(data.getWards);

      if (isFirstAddressLoad.current && props.defaultValues.ward) {
        const defaultWard = data.getWards.find((ward) => ward.name === props.defaultValues.ward);

        setValue(props.names.ward, defaultWard.name + '__' + defaultWard.id);

        // Finish setting default address value
        isFirstAddressLoad.current = false;
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const handleCityChange = (e) => {
    setDistricts([]);
    setWards([]);
    getDistricts({
      variables: {
        city_id: +e.target.value.split('__')[1]
      }
    });
  };

  const handleDistrictChange = (e) => {
    setWards([]);
    getWards({
      variables: {
        district_id: +e.target.value.split('__')[1]
      }
    });
  };

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
          required
          onChange={handleCityChange}>
          <option value="">{t('checkout:city_placeholder')}</option>

          {cities.map((city) => (
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
          disabled={!districts.length}
          onChange={handleDistrictChange}>
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
          name={props.names.ward}
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
    </React.Fragment>
  );
}
