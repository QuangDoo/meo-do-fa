import axios from 'axios';
import { useTranslation } from 'i18n';
import _partition from 'lodash/partition';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { FILES_GATEWAY } from 'src/constants';
import { useUser } from 'src/contexts/User';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ProfileLayout from '../ProfileLayout';
import AddressSelect from './AddressSelect';
import CertificateUpload from './CertificateUpload';
import CertificateUploadNew from './CertificateUploadNew';
import FormCard from './FormCard';

export type ImageObject = {
  file?: File;
  src: string;
};

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

  // Image ids that got replaced by new images, we will delete them later
  const [certificateImages, setCertificateImages] = useState<ImageObject[]>([]);

  const onSubmit = async (data: Inputs) => {
    // Array to hold all of user's certificate image ids
    // We will modify this to update certificates later
    let originalImageIds: string[] = user.business_license.split(',');

    // Separate old images from new images with Lodash partition based on if ImageObject has file or not
    // If an ImageObject has file, that means it's a new image chosen by the user
    const [untouchedImages, newImages] = _partition(certificateImages, (image) => image.file);

    // Uploaded image ids that weren't deleted or replaced
    // We get the image id by splitting the string by '/' and get the last item
    const untouchedImageIds = untouchedImages.map((image) => image.src.split('/').pop());

    // Image ids to delete
    // They are ids that were in the original ids but have been deleted or replaced
    //   which means they are not in the untouched image array
    const imageIdsToDelete: string[] = originalImageIds.filter(
      (id) => !untouchedImageIds.includes(id)
    );

    // Delete images
    axios
      .delete(`${FILES_GATEWAY}/certificate`, {
        data: {
          ids: imageIdsToDelete
        }
      })
      .then(() => {
        // On delete success
        // Remove deleted ids from originalImageIds
        imageIdsToDelete.forEach((id) => {
          const index = originalImageIds.indexOf(id);

          if (index > -1) {
            originalImageIds.splice(index, 1);
          }
        });
      })
      .catch((error) => {
        console.log('Delete certificate error:', error);
      });

    // Loop through old image ids, if they're not present in oldImages
    // that means they've been deleted or replaced by new images
    // so we add them to imageIdsToDelete

    // Form data to upload new images
    const formData = new FormData();

    // Add new images to form data
    newImages.forEach((image) => {
      formData.append('images', image.file);
    });

    // Upload new images
    axios.post(`${FILES_GATEWAY}/certificate`, formData).then((response) => {
      // Response is an array of uploaded image ids
      originalImageIds = response.data;
    });

    // Loop through

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
        vat: userVat || undefined,
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
              defaultValue={user?.phone || ''}
            />

            {/* Email */}
            <InputWithLabel
              disabled
              label={t('myAccount:email_label')}
              type="text"
              defaultValue={user?.email || ''}
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
                defaultValue={user?.company_name || user?.name || ''}
                placeholder={t('myAccount:company_name_placeholder')}
              />
            </div>

            {/* Legal representative */}
            <InputWithLabel
              ref={register}
              label={t('myAccount:representative_label')}
              name="representative"
              type="text"
              defaultValue={user?.representative || ''}
              placeholder={t('myAccount:representative_placeholder')}
            />

            {/* Tax code */}
            <InputWithLabel
              ref={register}
              label={t('myAccount:tax_code_label')}
              name="taxCode"
              type="text"
              defaultValue={vat || ''}
              placeholder={t('myAccount:tax_code_placeholder')}
            />

            <CertificateUploadNew
              certificateImages={certificateImages}
              setCertificateImages={setCertificateImages}
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
