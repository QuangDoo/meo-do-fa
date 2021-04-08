import { useQuery } from '@apollo/client';
import axios from 'axios';
import { useTranslation } from 'i18n';
import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import Loading from 'src/components/Layout/Loading';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useUser } from 'src/contexts/User';
import { City, GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  District,
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars, Ward } from 'src/graphql/address/getWards';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ProfileLayout from '../ProfileLayout';
import FormCard from './FormCard';

const { publicRuntimeConfig } = getConfig();

type Inputs = {
  name: string;
  phone: string;
  email: string;
  newPassword: string;
  accountType: string;
  companyName: string;
  representative: string;
  businessLicense: string;
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

const FILES_GATEWAY = `https://${
  publicRuntimeConfig.FILES_GATEWAY_EXT || process.env.NEXT_PUBLIC_FILES_GATEWAY
}`;

export default function MyAccountPage() {
  const { t } = useTranslation(['myAccount', 'common', 'errors']);

  // User data
  const { data: user, refetch: refetchUser } = useUser();

  // Form controller
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  // Hide license or not
  const [licenseHidden, setLicenseHidden] = useState<boolean>(false);

  // Timestamp to manually refresh license image
  const [licenseTime, setLicenseTime] = useState<number>(new Date().getTime());

  // Uploading certificate image
  const [loadingCertificate, setLoadingCertificate] = useState<boolean>(false);

  const [cities, setCities] = useState<City[]>([]);

  const [districts, setDistricts] = useState<District[]>([]);

  const [wards, setWards] = useState<Ward[]>([]);

  // Get cities
  const { refetch: getCities } = useQuery<GetCitiesData, undefined>(GET_CITIES, {
    skip: true,
    notifyOnNetworkStatusChange: true
  });

  // Get districts
  const { refetch: getDistricts } = useQuery<GetDistrictsData, GetDistrictsVars>(GET_DISTRICTS, {
    skip: true,
    notifyOnNetworkStatusChange: true
  });

  // Get wards
  const { refetch: getWards } = useQuery<GetWardsData, GetWardsVars>(GET_WARDS, {
    skip: true,
    notifyOnNetworkStatusChange: true
  });

  const chosenCity = watch('companyCity');
  const chosenDistrict = watch('companyDistrict');

  // On user load
  useEffect(() => {
    let city: City;

    if (user.contact_address) {
      city = user.contact_address.city;
    }

    // Always get cities
    getCities().then((response) => {
      setCities(response.data.getCities);

      // If user has contact address
      if (city) {
        setValue('companyCity', city.name + '__' + city.id);
      }
    });

    // Abort if user doesn't have contact address
    if (!user?.contact_address) return;

    // Get user's city, district and ward
    const { district, ward } = user.contact_address;

    // Get districts then set selected district to user's district
    getDistricts({
      city_id: city.id
    }).then((response) => {
      setDistricts(response.data.getDistricts);
      setValue('companyDistrict', district.name + '__' + district.id);
    });

    // Get wards then set selected ward to user's ward
    getWards({
      district_id: district.id
    }).then((response) => {
      setWards(response.data.getWards);
      setValue('companyWard', ward.name + '__' + ward.id);
    });
  }, [user]);

  // On city change
  const handleCityChange = (event) => {
    // Selected city value
    // Format: cityName__cityId
    const { value } = event.target;

    // Selected city name and id
    // We don't use city name here so we don't destructure it
    const [, cityId] = value.split('__');

    // Reset district and ward value
    setValue('companyDistrict', '');
    setValue('companyWard', '');

    // Clear district and ward data
    setDistricts([]);
    setWards([]);

    // Get districts of the selected city
    getDistricts({
      city_id: +cityId
    }).then((response) => {
      setCities(response.data.getDistricts);
    });
  };

  // On district change
  const handleDistrictChange = (event) => {
    // Selected district value
    // Format: districtName__districtId
    const { value } = event.target;

    // Selected district name and id
    // We don't use district name here so we don't destructure it
    const [, districtId] = value.split('__');

    // Reset ward value
    setValue('companyWard', '');

    // Clear ward data
    setWards([]);

    // Get wards of the selected district
    getWards({
      district_id: +districtId
    }).then((response) => {
      setWards(response.data.getWards);
    });
  };

  // Update user
  const [updateUser, { loading: updatingUser }] = useMutationAuth<UpdateUserData, UpdateUserVars>(
    UPDATE_USER,
    {
      // On update completed
      onCompleted: () => {
        // Refetch user data then show success toast
        refetchUser().then(() => {
          toast.success(t('myAccount:update_success'));
        });

        // Scroll to top
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
      toast.error(t('cart:file_is_not_image'));
      return;
    }

    const formData = new FormData();

    formData.append('image', file);
    formData.append('id', user?.id + '');
    setLoadingCertificate(true);
    axios
      .post(`${FILES_GATEWAY}/certificate`, formData)
      .then(() => {
        setLicenseTime(new Date().getTime());
        setLicenseHidden(false);
        setLoadingCertificate(false);
      })
      .catch((err) => {
        console.log('Image upload error:', err);
      });
  };

  const onSubmit = async (data: Inputs) => {
    const regVat = /(^[0-9]{10}$)|(^[0-9]{13}$)/g;

    let userVat = data?.taxCode.replace(/-/g, '');

    if (userVat !== '' && !regVat.test(userVat)) {
      toast.error(t('errors:tax_code_invalid'));
      return;
    }

    if (userVat.length === 13) {
      userVat = userVat.slice(0, 10) + '-' + userVat.slice(10, 13);
    }

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
        vat: userVat,
        representative: data.representative
      }
    });
  };

  const vat = user.vat.replace('-', ' - ');
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
            maxLength={100}
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
            defaultValue={vat}
            placeholder={t('myAccount:tax_code_placeholder')}
          />

          {user.activated ? (
            <label className="form__label mb-2">{t('myAccount:business_license_label')}</label>
          ) : (
            <InputWithLabel
              label={t('myAccount:business_license_label')}
              type="file"
              accept="image/*"
              placeholder={t('myAccount:business_license_placeholder')}
              onChange={handleFileChange}
              containerClass="mb-2"
              disabled={user.activated}
            />
          )}

          <input
            hidden
            ref={register}
            name="businessLicense"
            defaultValue={user?.business_license}
          />
          {loadingCertificate && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          {loadingCertificate && (
            <div>
              <img
                hidden={licenseHidden}
                alt=""
                className="mb-3 business-license-img license-img-mobile"
                src={`${FILES_GATEWAY}/certificate/${user?.id}?${licenseTime}`}
                onError={() => setLicenseHidden(true)}
              />
            </div>
          )}

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
