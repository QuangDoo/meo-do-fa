import axios from 'axios';
import { useTranslation } from 'i18n';
import getConfig from 'next/config';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormGroup from 'src/components/Form/FormGroup';
import FormGroupLabel from 'src/components/Form/FormGroupLabel';
import InputWithLabel from 'src/components/Form/InputWithLabel';
import Loading from 'src/components/Layout/Loading';
import { useUser } from 'src/contexts/User';

const { publicRuntimeConfig } = getConfig();

const FILES_GATEWAY = `https://${
  publicRuntimeConfig.FILES_GATEWAY_EXT || process.env.NEXT_PUBLIC_FILES_GATEWAY
}`;

const defaultCertificateIds = '1611';

export default function CertificateUpload() {
  const { t } = useTranslation(['myAccount', 'cart']);

  const { register } = useFormContext();

  // User data
  const { data: user } = useUser();

  // Hide license or not
  const [licenseHidden, setLicenseHidden] = useState<boolean>(false);

  // Uploading certificate image
  const [loadingCertificate, setLoadingCertificate] = useState<boolean>(false);

  // Timestamp to manually refresh license image
  const [licenseTime, setLicenseTime] = useState<number>(new Date().getTime());

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
        console.log('Image upload error:', err.message);
      });
  };

  return (
    <React.Fragment>
      <FormGroup>
        <FormGroupLabel>{t('myAccount:business_license_label')}</FormGroupLabel>

        <div className="certificate_upload_button">Ảnh</div>
      </FormGroup>

      {user?.activated ? (
        <label className="form__label mb-2">{t('myAccount:business_license_label')}</label>
      ) : (
        <InputWithLabel
          label={t('myAccount:business_license_label')}
          type="file"
          accept="image/*"
          placeholder={t('myAccount:business_license_placeholder')}
          onChange={handleFileChange}
          containerClass="mb-2"
          disabled={user?.activated}
        />
      )}

      <input
        hidden
        ref={register}
        name="certificateIds"
        // defaultValue={user?.business_license}
        defaultValue={defaultCertificateIds}
      />

      {loadingCertificate && (
        <div className="text-center">
          <Loading />
        </div>
      )}

      {!loadingCertificate && (
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
    </React.Fragment>
  );
}
