import { useLazyQuery, useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useUser } from 'src/contexts/User';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars } from 'src/graphql/address/getWards';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import toBase64 from 'src/utils/toBase64';

import ProfileLayout from '../ProfileLayout';
import FormCard from './FormCard';

type Inputs = {
  name: string;
  phone: string;
  email: string;
  newPassword: string;
  accountType: string;
  companyName: string;
  representative: string;
  businessLicense: FileList;
  taxCode: string;
  companyStreet: string;
  companyCity: string;
  companyDistrict: string;
  companyWard: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryWard: string;
};

export default function MyAccountPage() {
  const { t } = useTranslation(['myAccount', 'common', 'errors']);

  const { data: user, refetch: refetchUser } = useUser();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const businessLicense: FileList = watch('businessLicense');

  const [firstLoadCities, setFirstLoadCities] = useState(true);
  const [firstLoadDistricts, setFirstLoadDistricts] = useState(true);
  const [firstLoadWards, setFirstLoadWards] = useState(true);

  const { data: citiesData } = useQuery<GetCitiesData, undefined>(GET_CITIES);

  const cities = citiesData?.getCities || [];

  const chosenCity = watch('companyCity');

  useEffect(() => {
    if (!user?.contact_address || !citiesData || !firstLoadCities) return;

    setFirstLoadCities(false);
    const { city } = user.contact_address;
    setValue('companyCity', city.name + '__' + city.id);
    getDistricts({
      variables: {
        city_id: city.id
      }
    });
  }, [citiesData, user]);

  const handleCityChange = (event) => {
    const { value } = event.target;

    setValue('companyDistrict', '');
    setValue('companyWard', '');

    if (value) {
      getDistricts({
        variables: {
          city_id: +value.split('__')[1]
        }
      });
    }
  };

  const [getDistricts, { data: districtsData }] = useLazyQuery<GetDistrictsData, GetDistrictsVars>(
    GET_DISTRICTS,
    {
      onCompleted: () => {
        if (!firstLoadDistricts || !user?.contact_address) return;

        setFirstLoadDistricts(false);
        const { district } = user.contact_address;
        setValue('companyDistrict', district.name + '__' + district.id);
        getWards({
          variables: {
            district_id: district.id
          }
        });
      }
    }
  );

  const handleDistrictChange = (event) => {
    const { value } = event.target;

    setValue('companyWard', '');

    if (value) {
      getWards({
        variables: {
          district_id: +value.split('__')[1]
        }
      });
    }
  };

  const districts = districtsData?.getDistricts || [];

  const chosenDistrict = watch('companyDistrict');

  const [getWards, { data: wardsData }] = useLazyQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    onCompleted: () => {
      if (!firstLoadWards || !user?.contact_address) return;

      setFirstLoadWards(false);
      const { ward } = user.contact_address;
      setValue('companyWard', ward.name + '__' + ward.id);
    }
  });

  const wards = wardsData?.getWards || [];

  const [updateUser, { loading: updatingUser }] = useMutationAuth<UpdateUserData, UpdateUserVars>(
    UPDATE_USER,
    {
      onCompleted: () => {
        refetchUser().then(() => {
          toast.success(t('myAccount:update_success'));
        });
        window.scrollTo(0, 0);
      },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];

    const isImage = file.type.startsWith('image');

    if (!isImage) {
      setValue('businessLicense', undefined);
      toast.error(t('cart:file_is_not_image'));
    }
  };

  const onSubmit = async (data: Inputs) => {
    let rawBase64 = '';

    if (data.businessLicense.length) {
      try {
        rawBase64 = await toBase64(data.businessLicense[0]);
      } catch (err) {
        console.log('Error converting file to base64:', err);
      }
    }

    const base64 = rawBase64.replace('data:image/jpeg;base64,', '');

    const [cityName, cityId] = data.companyCity.split('__');
    const [districtName, districtId] = data.companyDistrict.split('__');
    const [wardName, wardId] = data.companyWard.split('__');

    updateUser({
      variables: {
        name: data.name,
        display_name: data.name,
        contact_address: {
          street: data.companyStreet,
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
        },
        company_name: data.companyName,
        vat: data.taxCode,
        representative: data.representative,
        business_license: base64
      }
    });
  };

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  return (
    <ProfileLayout title={t('myAccount:title')}>
      <LoadingBackdrop open={updatingUser} />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormCard title={t('myAccount:account_info')}>
          {/* Full name */}
          <InputWithLabel
            ref={register({
              required: t('myAccount:name_required') + ''
            })}
            required
            label={t('myAccount:name_label')}
            name="name"
            type="text"
            placeholder={t('myAccount:name_placeholder')}
            defaultValue={user?.name}
          />

          {/* Phone number */}
          <InputWithLabel
            disabled
            label={t('myAccount:phone_label')}
            type="text"
            defaultValue={user?.phone}
          />

          {/* Email */}
          <InputWithLabel
            disabled
            label={t('myAccount:email_label')}
            type="text"
            defaultValue={user?.email}
          />
        </FormCard>

        <FormCard title={t('myAccount:business_info')}>
          <div className="row">
            {/* Account type */}
            <InputWithLabel
              disabled
              containerClass="col-md-4"
              label={t('myAccount:account_type_label')}
              type="text"
              defaultValue={
                user?.account_type ? t(`myAccount:account_type_${user.account_type}`) : ''
              }
            />

            {/* Pharmacy/clinic name */}
            <InputWithLabel
              ref={register}
              containerClass="col-md-8"
              label={t('myAccount:company_name_label')}
              name="companyName"
              type="text"
              defaultValue={user?.company_name}
              placeholder={t('myAccount:company_name_placeholder')}
            />
          </div>

          {/* Legal representative */}
          <InputWithLabel
            ref={register}
            label={t('myAccount:representative_label')}
            name="representative"
            type="text"
            defaultValue={user?.representative}
            placeholder={t('myAccount:representative_placeholder')}
          />

          {/* Tax code */}
          <InputWithLabel
            ref={register}
            label={t('myAccount:tax_code_label')}
            name="taxCode"
            type="text"
            placeholder={t('myAccount:tax_code_placeholder')}
          />

          {/* Business license file */}
          <InputWithLabel
            ref={register}
            label={t('myAccount:business_license_label')}
            name="businessLicense"
            type="file"
            accept="image/*"
            placeholder={
              businessLicense?.length
                ? businessLicense[0].name
                : t('myAccount:business_license_placeholder')
            }
            onChange={handleFileChange}
          />

          <InputWithLabel
            ref={register({
              required: t('myAccount:street_required') + ''
            })}
            label={t('myAccount:company_street_label')}
            name="companyStreet"
            type="text"
            placeholder={t('myAccount:company_street_placeholder')}
            defaultValue={user?.contact_address?.street || ''}
            required
          />

          <div className="row">
            <SelectWithLabel
              onChange={handleCityChange}
              name="companyCity"
              ref={register({
                required: t('myAccount:company_city_required') + ''
              })}
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
              onChange={handleDistrictChange}
              name="companyDistrict"
              ref={register({
                required: t('myAccount:company_district_required') + ''
              })}
              containerClass="col-md-4"
              required
              label={t('common:district_select_label')}
              disabled={!districts.length || !chosenCity}>
              <option value="">{t('common:district_select_placeholder')}</option>

              {districts.map(({ id, name }) => (
                <option key={id} value={name + '__' + id}>
                  {name}
                </option>
              ))}
            </SelectWithLabel>

            <SelectWithLabel
              name="companyWard"
              ref={register({
                required: t('myAccount:company_ward_required') + ''
              })}
              containerClass="col-md-4"
              required
              label={t('common:ward_select_label')}
              disabled={!wards.length || !chosenCity || !chosenDistrict}>
              <option value="">{t('common:ward_select_placeholder')}</option>

              {wards.map(({ id, name }) => (
                <option key={id} value={name + '__' + id}>
                  {name}
                </option>
              ))}
            </SelectWithLabel>
          </div>
        </FormCard>

        <div className="col-12 d-flex justify-content-center">
          <Button type="submit" variant="primary" size="lg">
            {t('update_button')}
          </Button>
        </div>
      </form>
    </ProfileLayout>
  );
}
