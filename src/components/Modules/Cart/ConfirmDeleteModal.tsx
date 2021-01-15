import { useTranslation } from 'i18n';
import React, { FC } from 'react';
import PriceText from 'src/components/Form/PriceText';
import ModalBase from 'src/components/Layout/Modal/ModalBase';

type Props = {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  // On confirm delete
  onConfirm: () => void;

  productName: string;

  price: number;

  image: string;
};

const ConfirmDeleteModal: FC<Props> = (props) => {
  const { open, onClose, onConfirm, productName, price, image } = props;

  const { t } = useTranslation(['cart', 'errors']);

  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="modal-content">
        <div className="modal-body">
          <div className="swal2-header">
            <div className="swal2-icon swal2-warning swal2-icon-show d-flex">
              <div className="swal2-icon-content">!</div>
            </div>
            <h2 className="swal2-title d-flex" id="swal2-title">
              {t('cart:remove_title')}
            </h2>
            <button
              type="button"
              className="swal2-close d-flex"
              aria-label="Close this dialog"
              onClick={onClose}>
              ×
            </button>
          </div>
          <div className="cart-item-remove-dialog">
            <div className="container-fluid">
              <div className="swal2-content">{t('cart:remove_confirm')}</div>
              <div className="elevated p-3 d-flex">
                <div className="mr-3">
                  <img alt="" className="lozad img-fluid loaded" src={image} width={100} />
                </div>
                <div className="text-left">
                  <div className="cart-item__name mb-2">{productName}</div>
                  <div className="cart-item__price">
                    <PriceText price={price} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swal2-actions">
            <button
              type="button"
              className="swal2-cancel btn btn-outline-primary px-4 m-2"
              onClick={onClose}>
              {t('cart:no')}
            </button>
            <button
              type="button"
              className="swal2-confirm btn btn-primary px-4 m-2"
              onClick={onConfirm}>
              {t('cart:yes')}
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmDeleteModal;
