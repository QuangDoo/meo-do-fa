import { useTranslation, withTranslation } from 'i18n';
import React, { FC } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import ModalBase from 'src/components/Layout/Modal/ModalBase';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';

type Props = {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  _id: string;

  productName: string;

  price: number;

  image: string;

  isKeyDown?: boolean;

  updateCart?: (quanity) => void;
};

const ConfirmDeleteModal: FC<Props> = (props) => {
  const { open, onClose, _id, productName, price, image, isKeyDown, updateCart } = props;

  const { t } = useTranslation(['cart', 'errors']);

  const { refetchCart } = useCart();

  const [deleteCart] = useMutationAuth<DeleteCartData, DeleteCartVars>(DELETE_CART, {
    onCompleted: () => {
      toast.success(t('cart:delete_success'));

      refetchCart();

      onClose();
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions.code}`));
    }
  });

  const handleOnClose = () => {
    if (isKeyDown) {
      updateCart(1);
    }
    onClose();
  };

  const onConfirmDelete = () => {
    deleteCart({
      variables: {
        _id: _id
      }
    });
  };

  return (
    <ModalBase open={open} onClose={handleOnClose}>
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
              onClick={handleOnClose}>
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
              onClick={handleOnClose}>
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

export default ConfirmDeleteModal;
