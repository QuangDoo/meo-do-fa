import { useMutation } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { toast } from 'react-toastify';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';

import ModalBase from '../../Layout/Modal/ModalBase';

type Props = {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  _id: string;

  productName: string;

  price: number;

  image: string;

  refetchCart: () => void;
};

const ConfirmDeleteModal: FC<Props> = (props) => {
  const [deleteCart] = useMutation<DeleteCartData, DeleteCartVars>(DELETE_CART, {
    onError: (error) => {
      console.log('Delete cart error:', { error });
      toast.error('Delete cart error:' + error);
    },
    onCompleted: (data) => {
      if (data.deleteCart.code !== 200) return;

      toast.success('Đã xóa khỏi giỏ hàng');

      props.refetchCart();

      props.onClose();
    }
  });

  const handleDelete = () => {
    deleteCart({
      variables: {
        _id: props._id
      }
    });
  };

  return (
    <ModalBase open={props.open} onClose={props.onClose}>
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
              onClick={props.onClose}>
              ×
            </button>
          </div>
          <div className="cart-item-remove-dialog" id="cart-item-remove-dialog-3206540">
            <div className="container-fluid">
              <div className="swal2-content">Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?</div>
              <div className="elevated p-3 d-flex">
                <div className="mr-3">
                  <img alt="" className="lozad img-fluid loaded" src={props.image} width={100} />
                </div>
                <div className="text-left">
                  <div className="cart-item__name mb-2">{props.productName}</div>
                  <div className="cart-item__price">
                    {props.price.toLocaleString('de-DE')}
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
              onClick={props.onClose}>
              Không
            </button>
            <button
              type="button"
              className="swal2-confirm btn btn-primary px-4 m-2"
              onClick={handleDelete}>
              Có
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmDeleteModal;
