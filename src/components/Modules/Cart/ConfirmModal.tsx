import { useTranslation } from 'i18n';
import React from 'react';
import ModalBase, { ModalBaseProps } from 'src/components/Layout/Modal/ModalBase';

export type ConfirmModalProps = ModalBaseProps & {
  onConfirm: () => void;
  title: string;
  question?: string;
  children?: React.ReactNode;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const { open, onClose, onConfirm } = props;

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
              {props.title}
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
              {props.question && <div className="swal2-content">{props.question}</div>}

              {props.children}
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

export default ConfirmModal;
