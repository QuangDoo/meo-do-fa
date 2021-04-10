import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'i18n';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import FormGroup from 'src/components/Form/FormGroup';
import FormGroupLabel from 'src/components/Form/FormGroupLabel';
import { FILES_GATEWAY } from 'src/constants';
import { useUser } from 'src/contexts/User';

import CertificateImage from './CertificateImage';

export type ImageObject = {
  file?: File;
  src: string;
};

type Props = {
  setImageIdsToDelete: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CertificateUpload(props: Props) {
  const { t } = useTranslation(['myAccount', 'cart']);

  const { setImageIdsToDelete } = props;

  const { data: user } = useUser();

  // File input's ref, we will use this to interact with the file input
  const fileInputRef = useRef(null);

  // Image objects to display preview images
  // Includes both old and new image
  // Up to 6 images only
  const [images, setImages] = useState<ImageObject[]>([]);

  // On user load
  useEffect(() => {
    if (!user) return;

    // Add old images to imageSources to display them
    setImages([
      {
        src: `${FILES_GATEWAY}/certificate/1611`
      }
    ]);
  }, [user]);

  // On 'Add image' button click
  const handleButtonClick = () => {
    // Fire click event on file input to open it's file browser
    fileInputRef.current.click();

    // We reset value so that user can choose the same file many times
    // If we don't reset it, choosing the same file won't fire onChange again
    fileInputRef.current.value = '';
  };

  // On image select
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get selected files
    const files = event.currentTarget.files;

    // Boolean to check if error has been toasted
    let errorToasted = false;

    // Loop through all selected files
    Array.from(files).forEach((file) => {
      // If file is not an image
      if (!file.type.startsWith('image')) {
        // Toast error but only once, next time won't toast again
        if (!errorToasted) {
          toast.error(t('cart:file_is_not_image'));
          errorToasted = true;
        }

        // Skip this file
        return;
      }

      // File reader
      const reader = new FileReader();

      // Read file
      reader.readAsDataURL(file);

      // On read complete
      reader.onloadend = () => {
        // Add src to image sources if there isn't 6 images yet
        setImages((images) => {
          if (images.length === 6) {
            return images;
          }

          const newImage: ImageObject = {
            file: file,
            src: reader.result as string
          };

          return [...images, newImage];
        });
      };
    });
  };

  return (
    <React.Fragment>
      <FormGroup>
        <FormGroupLabel>{t('myAccount:business_license_label')}</FormGroupLabel>

        <div className="certificate-container">
          {images.map((image, index) => (
            <CertificateImage
              key={image.src}
              image={image}
              index={index}
              setImages={setImages}
              setImageIdsToDelete={setImageIdsToDelete}
            />
          ))}

          {/* Only show 'Add image' button if user is not activated and not enough 6 images yet */}
          {!user?.activated && images.length < 6 && (
            <button className="add-image-button" onClick={handleButtonClick} type="button">
              <AddIcon />
              <div>{t('myAccount:business_license_placeholder')}</div>
            </button>
          )}
        </div>

        <input
          hidden
          accept="image/*"
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </FormGroup>
    </React.Fragment>
  );
}
