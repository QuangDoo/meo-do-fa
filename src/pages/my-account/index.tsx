import { useLazyQuery, useQuery } from '@apollo/client';
import Cookies from 'cookies';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import SelectWithLabel from 'src/components/Form/SelectWithLabel';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Nav from 'src/components/Layout/Nav';
import FormCard from 'src/components/Modules/MyAccount/FormCard';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_CITIES, GetCitiesData } from 'src/graphql/address/getCities';
import {
  GET_DISTRICTS,
  GetDistrictsData,
  GetDistrictsVars
} from 'src/graphql/address/getDistricts';
import { GET_WARDS, GetWardsData, GetWardsVars } from 'src/graphql/address/getWards';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useUser from 'src/hooks/useUser';
import toBase64 from 'src/utils/toBase64';

import withApollo from '../../utils/withApollo';

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

const MyAccount = (): JSX.Element => {
  const { t } = useTranslation(['myAccount', 'common', 'errors']);

  const { user, refetchUser } = useUser();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const chosenFile: FileList = watch('businessLicense');

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

  const [updateUser, { loading: loadingUpdateUser }] = useMutationAuth<
    UpdateUserData,
    UpdateUserVars
  >(UPDATE_USER, {
    onCompleted: () => {
      toast.success(t('myAccount:update_success'));
      refetchUser();
      window.scrollTo(0, 0);
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onSubmit = async (data: Inputs) => {
    let businessLicenseBase64 = '';

    if (data.businessLicense.length) {
      try {
        businessLicenseBase64 = await toBase64(data.businessLicense[0]);
      } catch (err) {
        console.log('Error converting file to base64:', err);
      }
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
        vat: data.taxCode,
        representative: data.representative,
        business_license: businessLicenseBase64
      }
    });
  };

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout title={t('myAccount:title')}>
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
              accept="image/*, .pdf, .doc, .docx"
              placeholder={
                chosenFile?.length
                  ? chosenFile[0].name
                  : t('myAccount:business_license_placeholder')
              }
            />

            <InputWithLabel
              ref={register}
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

      <LoadingBackdrop open={loadingUpdateUser} />

      <Footer />
    </>
  );
};

MyAccount.getInitialProps = async (ctx) => {
  if (typeof window === 'undefined') {
    const cookies = new Cookies(ctx.req, ctx.res);

    if (!cookies.get('token')) {
      ctx.res.writeHead(302, {
        Location: '/'
      });

      ctx.res.end();
    }
  }

  return {
    namespacesRequired: ['myAccount', 'common', 'errors']
  };
};

export default withApollo({ ssr: true })(MyAccount);
