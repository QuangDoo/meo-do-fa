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
            <div className="swal2-icon swal2-warning swal2-icon-show" style={{ display: 'flex' }}>
              <div className="swal2-icon-content">!</div>
            </div>
            <div className="swal2-icon swal2-info" style={{ display: 'none' }} />
            <div className="swal2-icon swal2-success" style={{ display: 'none' }} />
            <img className="swal2-image" style={{ display: 'none' }} alt="" />
            <h2 className="swal2-title" id="swal2-title" style={{ display: 'flex' }}>
              {t('cart:remove_title')}
            </h2>
            <button
              type="button"
              className="swal2-close"
              aria-label="Close this dialog"
              style={{ display: 'flex' }}
              onClick={onClose}>
              ×
            </button>
          </div>
          <div className="cart-item-remove-dialog" id="cart-item-remove-dialog-3206540">
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
                    <span className="unit">đ</span>
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
              {t('cart:No')}
            </button>
            <button
              type="button"
              className="swal2-confirm btn btn-primary px-4 m-2"
              onClick={onConfirm}>
              {t('cart:Yes')}
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmDeleteModal;
