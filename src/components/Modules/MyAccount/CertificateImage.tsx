import { Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FILES_GATEWAY } from 'src/constants';

import { ImageObject } from './CertificateUploadNew';

type Props = {
  image: ImageObject;
  index: number;
  setImages: React.Dispatch<React.SetStateAction<ImageObject[]>>;
  setImageIdsToDelete: React.Dispatch<React.SetStateAction<string[]>>;
};

type MenuPosition = {
  x: number | null;
  y: number | null;
};

const initialState: MenuPosition = {
  x: null,
  y: null
};

export default function CertificateImage(props: Props) {
  const { image, index, setImages, setImageIdsToDelete } = props;

  const { t } = useTranslation(['myAccount', 'cart']);

  // File input's ref, we will use this to interact with the file input
  const fileInputRef = useRef(null);

  // Mouse position to open image option menu
  const [menuPosition, setMenuPosition] = useState<MenuPosition>(initialState);

  // On image button click and key down
  const handleImageClick = (event: React.MouseEvent) => {
    // If event is fired through key down, mouse position will be (0, 0)
    if (event.clientX === 0 && event.clientY === 0) {
      // Get element rectangle in DOM
      const targetRect = (event.target as HTMLElement).getBoundingClientRect();

      // Set menu position to top left of element
      setMenuPosition({
        x: targetRect.left,
        y: targetRect.top
      });

      // End
      return;
    }

    // Else, event is fired through click so mouse position is available

    // Set menu position to mouse position
    setMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  // Close menu by resetting position
  const handleClose = () => {
    setMenuPosition(initialState);
  };

  // On 'View image' menu item click
  const handleViewImageClick = () => {
    // Close menu
    handleClose();

    // Open image in new tab
    window.open(image.src, '_blank');
  };

  // On 'Change image' menu item click
  const handleChangeImageClick = () => {
    // Close menu
    handleClose();

    // Fire click event on file input to open it's file browser
    fileInputRef.current.click();
  };

  // On 'Delete image' menu item click
  const handleDeleteImageClick = () => {
    // Close menu
    handleClose();

    // Delete item from images array
    setImages((images) => {
      const newImages = [...images];

      newImages.splice(index, 1);

      return newImages;
    });

    // If this is an uploaded image, it's src will start with FILES_GATEWAY
    if (image.src.startsWith(FILES_GATEWAY)) {
      // Get it's id
      const id = image.src.split('/').pop();

      // Add to array of image ids to delete later
      setImageIdsToDelete((ids) => [...ids, id]);
    }
  };

  // On change image file select
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files[0];

    // If file is not an image
    if (!file.type.startsWith('image')) {
      toast.error(t('cart:file_is_not_image'));

      return;
    }

    // File reader
    const reader = new FileReader();

    // Read file
    reader.readAsDataURL(file);

    // On read complete
    reader.onloadend = () => {
      // Replace old image with new image
      setImages((images) => {
        const newImages = [...images];

        newImages[index] = {
          file: file,
          src: reader.result as string
        };

        return [...newImages];
      });
    };
  };

  return (
    <React.Fragment>
      <button
        className="certificate-image-button"
        tabIndex={0}
        type="button"
        onClick={handleImageClick}>
        <img alt={`certificate-${index}`} src={image.src} />
      </button>

      <input hidden accept="image/*" type="file" onChange={handleFileChange} ref={fileInputRef} />

      <Menu
        open={menuPosition.x !== null && menuPosition.y !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menuPosition.x !== null && menuPosition.y !== null
            ? { top: menuPosition.y, left: menuPosition.x }
            : undefined
        }>
        <MenuItem onClick={handleViewImageClick}>{t('myAccount:menu_view_image')}</MenuItem>
        <MenuItem onClick={handleChangeImageClick}>{t('myAccount:menu_change_image')}</MenuItem>
        <MenuItem onClick={handleDeleteImageClick}>{t('myAccount:menu_delete_image')}</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
