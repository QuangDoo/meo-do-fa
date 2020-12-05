import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddressSelect from 'src/components/Form/AddressSelect';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import FormCard from 'src/components/Modules/MyAccount/FormCard';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import useAddress from 'src/hooks/useAddress';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useUser from 'src/hooks/useUser';
import toBase64 from 'src/utils/toBase64';

import withApollo from '../../utils/withApollo';

type Inputs = {
  name: string;
  display_name: string;
  email: string;
  contact_address: string;
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
  district_name: string;
};

const MyAccount = (): JSX.Element => {
  const { t } = useTranslation('myAccount');

  const formMethods = useForm<Inputs>();

  const { register, handleSubmit, watch } = formMethods;

  const chosenFile: FileList = watch('businessLicense');

  const {
    cities: companyCities,
    districts: companyDistricts,
    wards: companyWards,
    chosenCity: companyChosenCity,
    chosenDistrict: companyChosenDistrict,
    chosenWard: companyChosenWard
  } = useAddress({
    cityId: +watch('companyCityId'),
    districtId: +watch('companyDistrictId'),
    wardId: +watch('companyWardId')
  });

  const {
    cities: deliveryCities,
    districts: deliveryDistricts,
    wards: deliveryWards,
    chosenCity: deliveryChosenCity,
    chosenDistrict: deliveryChosenDistrict,
    chosenWard: deliveryChosenWard
  } = useAddress({
    cityId: +watch('deliveryCityId'),
    districtId: +watch('deliveryDistrictId'),
    wardId: +watch('deliveryWardId')
  });

  const [updateUser] = useMutationAuth<UpdateUserData, UpdateUserVars>(UPDATE_USER, {
    onCompleted: () => {
      toast.success(t('myAccount:update_success'));
    }
  });

  const { user } = useUser();

  const onSubmit = async (data) => {
    let businessLicenseBase64;

    if (data.businessLicense.length) {
      businessLicenseBase64 = await toBase64(data.businessLicense[0]).catch((err) => {
        console.log('Error converting file to base64:', err);
      });
    }

    updateUser({
      variables: {
        name: data.name,
        display_name: data.name,
        contact_address: {
          street: data.companyStreet,
          city: companyChosenCity.name,
          district: companyChosenDistrict.name,
          ward: companyChosenWard.name
        },
        company_name: data.companyName,
        vat: data.taxCode,
        representative: data.representative,
        business_license: businessLicenseBase64
      }
    });
  };

  const onError = (error) => {
    console.log('form error:', error);
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
              ref={register}
              disabled
              label={t('myAccount:phone_label')}
              name="phone"
              type="text"
              defaultValue={user?.phone}
            />

            {/* Email */}
            <InputWithLabel
              ref={register}
              disabled
              label={t('myAccount:email_label')}
              name="email"
              type="text"
              defaultValue={user?.email}
            />

            {/* New password */}
            <InputWithLabel
              ref={register}
              label={t('myAccount:new_password_label')}
              name="newPassword"
              type="password"
              guide={t('myAccount:new_password_rule')}
            />
          </FormCard>

          <FormCard title={t('myAccount:business_info')}>
            <div className="row">
              {/* Account type */}
              <InputWithLabel
                disabled
                containerClass="col-md-4"
                label={t('myAccount:account_type_label')}
                name="accountType"
                type="text"
                defaultValue={t(`myAccount:account_type_${user?.account_type}`)}
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
          </FormCard>

          <FormCard title={t('myAccount:invoice_info')}>
            {/* Tax code */}
            <InputWithLabel
              ref={register}
              label={t('myAccount:tax_code_label')}
              name="taxCode"
              type="text"
              placeholder={t('myAccount:tax_code_placeholder')}
            />

            <InputWithLabel
              ref={register}
              label={t('myAccount:company_street_label')}
              name="companyStreet"
              type="text"
              placeholder={t('myAccount:company_street_placeholder')}
              defaultValue={user?.street}
            />

            <AddressSelect
              cityProps={{
                name: 'companyCityId',
                register: register({
                  required: t('myAccount:company_city_required') + ''
                }),
                options: companyCities,
                currentValue: companyChosenCity?.id
              }}
              districtProps={{
                name: 'companyDistrictId',
                register: register({
                  required: t('myAccount:company_district_required') + ''
                }),
                options: companyDistricts,
                currentValue: companyChosenDistrict?.id
              }}
              wardProps={{
                name: 'companyWardId',
                register: register({
                  required: t('myAccount:company_Ward_required') + ''
                }),
                options: companyWards,
                currentValue: companyChosenWard?.id
              }}
            />
          </FormCard>

          <FormCard title={t('myAccount:delivery_info')}>
            <InputWithLabel
              ref={register}
              label={t('myAccount:delivery_street_label')}
              type="text"
              name="deliveryStreet"
              guide={t('myAccount:delivery_street_guide')}
            />

            <AddressSelect
              cityProps={{
                name: 'deliveryCityId',
                register: register({
                  required: t('myAccount:delivery_city_required') + ''
                }),
                options: deliveryCities,
                currentValue: deliveryChosenCity?.id
              }}
              districtProps={{
                name: 'deliveryDistrictId',
                register: register({
                  required: t('myAccount:delivery_district_required') + ''
                }),
                options: deliveryDistricts,
                currentValue: deliveryChosenDistrict?.id
              }}
              wardProps={{
                name: 'deliveryWardId',
                register: register({
                  required: t('myAccount:delivery_Ward_required') + ''
                }),
                options: deliveryWards,
                currentValue: deliveryChosenWard?.id
              }}
            />
          </FormCard>

          <div className="col-12 d-flex justify-content-center">
            <Button type="submit" variant="primary" size="lg">
              {t('update_button')}
            </Button>
          </div>
        </form>
      </ProfileLayout>

      <Footer />
    </>
  );
};

MyAccount.getInitialProps = async () => ({
  namespacesRequired: ['account']
});

export default withApollo({ ssr: true })(MyAccount);
