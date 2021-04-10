import { useTranslation } from 'i18n';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useUser } from 'src/contexts/User';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ProfileLayout from '../ProfileLayout';
import AddressSelect from './AddressSelect';
import CertificateUpload from './CertificateUpload';
import FormCard from './FormCard';

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

export default function MyAccountPage() {
  const { t } = useTranslation(['myAccount', 'common', 'errors']);

  // User data
  const { data: user, refetch: refetchUser } = useUser();

  // Form controller
  const methods = useForm<Inputs>();

  const { register, handleSubmit } = methods;

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

  const vat = user?.vat?.replace('-', ' - ');

  const onError = (error) => {
    toast.error(error[Object.keys(error)[0]].message);
  };

  return (
    <ProfileLayout title={t('myAccount:title')}>
      <LoadingBackdrop open={updatingUser} />

      <FormProvider {...methods}>
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
                defaultValue={user?.company_name ? user.company_name : user.name}
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

            <CertificateUpload />

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

            <AddressSelect />
          </FormCard>

          <div className="col-12 d-flex justify-content-center">
            <Button type="submit" variant="primary" size="lg">
              {t('update_button')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </ProfileLayout>
  );
}
