import { useMutation } from '@apollo/react-hooks';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import React, { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import ModalBase from 'src/components/Layout/Modal/ModalBase';
import { useCart } from 'src/contexts/Cart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';

type Props = WithTranslation & {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  _id: string;

  productName: string;

  price: number;

  image: string;
};

const ConfirmDeleteModal: FC<Props> = (props) => {
  const { t, open, onClose, _id, productName, price, image } = props;

  const { refetchCart } = useCart();

  const [deleteCart, { data, error }] = useMutation<DeleteCartData, DeleteCartVars>(DELETE_CART);

  // onCompleted
  useEffect(() => {
    if (!data) return;

    toast.success(t('cart:delete_success'));

    refetchCart();

    onClose();
  }, [data]);

  // onError
  useEffect(() => {
    if (!error) return;

    console.log('Delete cart error:', { error });
    toast.error(t(`errors:code_${error.graphQLErrors[0].extensions.code}`));
  }, [error]);

  const onConfirmDelete = () => {
    deleteCart({
      variables: {
        _id: _id
      }
    });
  };

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
              Xin xác nhận
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
              <div className="swal2-content">Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?</div>
              <div className="elevated p-3 d-flex">
                <div className="mr-3">
                  <img alt="" className="lozad img-fluid loaded" src={image} width={100} />
                </div>
                <div className="text-left">
                  <div className="cart-item__name mb-2">{productName}</div>
                  <div className="cart-item__price">
                    {price.toLocaleString('de-DE')}
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
              Không
            </button>
            <button
              type="button"
              className="swal2-confirm btn btn-primary px-4 m-2"
              onClick={onConfirmDelete}>
              Có
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default withTranslation(['cart', 'errors'])(ConfirmDeleteModal);
