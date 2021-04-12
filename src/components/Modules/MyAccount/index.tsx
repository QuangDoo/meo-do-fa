import axios from 'axios';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import FormGroup from 'src/components/Form/FormGroup';
import FormGroupLabel from 'src/components/Form/FormGroupLabel';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { FILES_GATEWAY } from 'src/constants';
import { useUser } from 'src/contexts/User';
import { UPDATE_USER, UpdateUserData, UpdateUserVars } from 'src/graphql/user/updateUser';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ProfileLayout from '../ProfileLayout';
import AddCertificate from './AddCertificate';
import AddressSelect from './AddressSelect';
import CertificateImage from './CertificateImage';
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

  const { data: user, refetch: refetchUser } = useUser();

  const methods = useForm<Inputs>();

  const { register, handleSubmit } = methods;

  const [updatingUser, setUpdatingUser] = useState<boolean>(false);

  const [updateUser] = useMutationAuth<UpdateUserData, UpdateUserVars>(UPDATE_USER, {
    onError: (err) => {
      setUpdatingUser(false);

      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const [previewImages, setPreviewImages] = useState<ImageObject[]>([]);

  // On user load
  useEffect(() => {
    if (!user) return;

    // Uploaded image ids
    const ids = user.business_license.split(',');

    // Display uploaded images
    setPreviewImages(
      ids.map((id) => ({
        src: `${FILES_GATEWAY}/certificate/${id}`
      }))
    );
  }, [user]);

  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const uploadNewImages = async () => {
    // Get new images (images that has file)
    const newImages = previewImages.filter((o) => o.file);

    if (newImages.length === 0) return;

    // Form data to upload new images
    const formData = new FormData();

    // Add new images to form data
    newImages.forEach((image) => {
      formData.append('images', image.file);
    });

    try {
      // Upload new images
      // response.data is a string array containing updated image ids
      const response = await axios.post(`${FILES_GATEWAY}/certificate`, formData);

      return response.data;
    } catch (error) {
      console.log('Upload certificates error:', error);
    }
  };

  const deleteOldImages = async () => {
    if (deletedImageIds.length === 0) return;

    // Delete images
    axios
      .delete(`${FILES_GATEWAY}/certificate`, {
        data: {
          ids: deletedImageIds
        }
      })
      .then(() => {
        setDeletedImageIds([]);
      })
      .catch((error) => {
        console.log('Delete certificates error:', error);
        console.log('Certificate ids to delete:', deletedImageIds);
      });
  };

  const onSubmit = async (data: Inputs) => {
    setUpdatingUser(true);

    deleteOldImages();

    const newIds = await uploadNewImages();

    const imageIds = previewImages.map((o) =>
      o.src.startsWith(FILES_GATEWAY) ? o.src.split('/').pop() : newIds.shift()
    );

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
        representative: data.representative,
        business_license: imageIds.join(',')
      }
    })
      .then(() => refetchUser())
      .then(() => {
        setUpdatingUser(false);

        animateScroll.scrollToTop();

        toast.success(t('myAccount:update_success'));
      });
  };
  // console.log(typeof user.vat);
  const vat = user.vat?.replace('-', ' - ');
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

            <FormGroup>
              <FormGroupLabel>{t('myAccount:business_license_label')}</FormGroupLabel>

              <div className="certificate-container">
                {previewImages.map((image, index) => (
                  <CertificateImage
                    key={image.src}
                    image={image}
                    index={index}
                    setCertificateImages={setPreviewImages}
                    setDeletedImageIds={setDeletedImageIds}
                  />
                ))}

                <AddCertificate setPreviewImages={setPreviewImages} previewImages={previewImages} />
              </div>
            </FormGroup>

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
