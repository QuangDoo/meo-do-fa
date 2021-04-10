import { Menu, MenuItem } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  SwapHoriz as SwapHorizIcon,
  Visibility as VisibilityIcon
} from '@material-ui/icons';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { ImageObject } from '.';

type Props = {
  image: ImageObject;
  index: number;
  setCertificateImages: React.Dispatch<React.SetStateAction<ImageObject[]>>;
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
  const { image, index, setCertificateImages: setImages } = props;

  const { t } = useTranslation(['myAccount', 'cart']);

  const [loadFailed, setLoadFailed] = useState<boolean>(false);

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

  const handleLoadError = () => {
    setLoadFailed(true);
  };

  return (
    <React.Fragment>
      <button
        className={clsx('certificate-image-button', loadFailed && 'error')}
        tabIndex={0}
        type="button"
        onClick={handleImageClick}>
        {loadFailed ? (
          <React.Fragment>
            <WarningIcon />
            <div>{t('myAccount:certificate_image_load_error')}</div>
          </React.Fragment>
        ) : (
          <img alt={`certificate-${index}`} src={image.src} onError={handleLoadError} />
        )}
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
        <MenuItem onClick={handleViewImageClick}>
          <VisibilityIcon />

          <span className="certificate-image-menu-item-label">
            {t('myAccount:menu_view_image')}
          </span>
        </MenuItem>

        <MenuItem onClick={handleChangeImageClick}>
          <SwapHorizIcon />

          <span className="certificate-image-menu-item-label">
            {t('myAccount:menu_change_image')}
          </span>
        </MenuItem>

        <MenuItem onClick={handleDeleteImageClick}>
          <DeleteIcon />

          <span className="certificate-image-menu-item-label">
            {t('myAccount:menu_delete_image')}
          </span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
