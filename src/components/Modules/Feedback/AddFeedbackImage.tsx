import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'i18n';
import _partition from 'lodash/partition';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { MAX_CERTIFICATES } from 'src/constants';
import isImage from 'src/utils/isImage';

export type ImageObject = {
  file?: File;
  src: string;
};

type Props = {
  previewImages: ImageObject[];
  setPreviewImages: React.Dispatch<React.SetStateAction<ImageObject[]>>;
};

export default function AddFeedbackImage(props: Props) {
  const { setPreviewImages, previewImages } = props;

  const { t } = useTranslation(['cart', 'myAccount']);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    // Fire click event on file input to open it's file browser
    fileInputRef.current.click();

    // We reset value so that user can choose the same file many times
    // If we don't reset it, choosing the same file won't fire onChange again
    fileInputRef.current.value = '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get selected files
    const files = Array.from(event.currentTarget.files);

    // Split files into image files and nonimage files
    const [images, nonimages] = _partition(files, isImage);

    // If has nonimage file, toast error
    if (nonimages.length) {
      toast.error(t('cart:file_is_not_image'));
    }

    // Available slots for new images
    const availableSlots = MAX_CERTIFICATES - previewImages.length;

    // Upload images for available slots
    images.slice(0, availableSlots).forEach((file) => {
      const reader = new FileReader();

      // Read file
      reader.readAsDataURL(file);

      // On read complete, add new image to preview images
      reader.onloadend = () => {
        setPreviewImages((images) => [
          ...images,
          {
            file,
            src: reader.result as string
          }
        ]);
      };
    });
  };

  return (
    <React.Fragment>
      {/* Only show 'Add image' button if user is not activated and not enough 6 images yet */}
      {previewImages.length < 6 && (
        <button className="add-image-button" onClick={handleClick} type="button">
          <AddIcon />
          <div>{t('myAccount:business_license_placeholder')}</div>
        </button>
      )}

      {/* Hidden input for choosing files */}
      <input
        hidden
        accept="image/*"
        type="file"
        multiple
        onChange={handleChange}
        ref={fileInputRef}
      />
    </React.Fragment>
  );
}
