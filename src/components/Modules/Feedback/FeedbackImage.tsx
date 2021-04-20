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
export type ImageObject = {
  file?: File;
  src: string;
};

type Props = {
  image: ImageObject;
  index: number;
  setFeedbackImages: React.Dispatch<React.SetStateAction<ImageObject[]>>;
  setDeletedImageIds: React.Dispatch<React.SetStateAction<string[]>>;
};

type MenuPosition = {
  x: number | null;
  y: number | null;
};

const initialState: MenuPosition = {
  x: null,
  y: null
};

export default function FeedbackImage(props: Props) {
  const { image, index, setFeedbackImages, setDeletedImageIds } = props;

  const { t } = useTranslation(['myAccount', 'cart']);

  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  // File input's ref, we will use this to interact with the file input
  const fileInputRef = useRef(null);

  // Mouse position to open image option menu
  const [menuPosition, setMenuPosition] = useState<MenuPosition>(initialState);

  // On image button click and key down
  const handleImageClick = (event: React.MouseEvent) => {
    setMenuPosition(() => {
      // If event is fired through mouse click,
      //   we set menu position to mouse position
      if (event.detail) {
        return {
          x: event.clientX,
          y: event.clientY
        };
      }

      // Else event is fired through key press,
      //   we set menu position to pressed element

      const { left, top } = (event.target as HTMLElement).getBoundingClientRect();

      return {
        x: left,
        y: top
      };
    });
  };

  // Close menu by resetting position to initialState
  const closeMenu = () => {
    setMenuPosition(initialState);
  };

  // On menu item click
  const handleMenuItemClick = (type: 'view' | 'update' | 'delete') => {
    switch (type) {
      case 'view': {
        // Open image in new tab
        const w = window.open('', '_blank');
        w.document.body.innerHTML = `<img src="${image.src}" />`;
        break;
      }

      case 'update': {
        // Fire click event on file input to open file browser
        fileInputRef.current.click();

        break;
      }

      case 'delete': {
        // Delete item from images array
        setFeedbackImages((images) => {
          const newImages = [...images];

          newImages.splice(index, 1);

          return newImages;
        });

        // If it's an old uploaded image, push it's id into an array to delete later
        if (!image.file) {
          setDeletedImageIds((ids) => [...ids, image.src.split('/').pop()]);
        }

        break;
      }
    }

    closeMenu();
  };

  // On change image file select
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files[0];

    // If file is not an image
    if (!file.type.startsWith('image')) {
      toast.error(t('cart:file_is_not_image'));

      return;
    }

    // If it's an old uploaded image, push it's id into an array to delete later
    if (!image.file) {
      setDeletedImageIds((ids) => [...ids, image.src.split('/').pop()]);
    }

    // File reader
    const reader = new FileReader();

    // Read file
    reader.readAsDataURL(file);

    // On read complete
    reader.onloadend = () => {
      // Replace old image with new image
      setFeedbackImages((images) => {
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
          <img alt={`feedback-${index}`} src={image.src} onError={handleLoadError} />
        )}
      </button>

      <input hidden accept="image/*" type="file" onChange={handleFileChange} ref={fileInputRef} />

      <Menu
        open={menuPosition.x !== null && menuPosition.y !== null}
        onClose={closeMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          menuPosition.x !== null && menuPosition.y !== null
            ? { left: menuPosition.x, top: menuPosition.y }
            : undefined
        }>
        <MenuItem onClick={() => handleMenuItemClick('view')}>
          <VisibilityIcon />

          <span className="certificate-image-menu-item-label">
            {t('myAccount:menu_view_image')}
          </span>
        </MenuItem>
        {/* Only allow update and delete if user is not activated */}
        <>
          <MenuItem onClick={() => handleMenuItemClick('update')}>
            <SwapHorizIcon />

            <span className="certificate-image-menu-item-label">
              {t('myAccount:menu_change_image')}
            </span>
          </MenuItem>

          <MenuItem onClick={() => handleMenuItemClick('delete')}>
            <DeleteIcon />

            <span className="certificate-image-menu-item-label">
              {t('myAccount:menu_delete_image')}
            </span>
          </MenuItem>
        </>
        )
      </Menu>
    </React.Fragment>
  );
}
