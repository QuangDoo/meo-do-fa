import { Backdrop, Fade, Modal as MaterialModal, Modal } from '@material-ui/core';
import React, { FC } from 'react';

type RemoveModalProps = {
  // Modal is open
  open: boolean;

  // Modal title
  title: string;

  // On modal close
  onClose: () => void;

  // Additional classname for modal content container
  className?: string;
  productName: string;
  price: string;
  image: string;
};

const RemoveModal: FC<RemoveModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300
      }}>
      <Fade in={props.open} timeout={300}>
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-body">
              {/* <div className="d-none"> */}

              <div className="swal2-header">
                <ul className="swal2-progress-steps" style={{ display: 'none' }} />
                <div className="swal2-icon swal2-error" style={{ display: 'none' }} />
                <div className="swal2-icon swal2-question" style={{ display: 'none' }} />
                <div
                  className="swal2-icon swal2-warning swal2-icon-show"
                  style={{ display: 'flex' }}>
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
                  <div className="swal2-content">
                    Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?
                  </div>
                  <div className="elevated p-3 d-flex">
                    <div className="mr-3">
                      <img
                        alt="phosphalugel boehringer ingelheim (h/26g)"
                        className="lozad img-fluid loaded"
                        data-src={props.image}
                        src={props.image}
                        width={100}
                        data-loaded="true"
                      />
                    </div>
                    <div className="text-left">
                      <div className="cart-item__name mb-2">{props.productName}</div>
                      <div className="cart-item__price">
                        {props.price}
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
                  aria-live="off"
                  style={{ display: 'inline-block' }}>
                  Không
                </button>
                <button
                  type="button"
                  className="swal2-confirm btn btn-primary px-4 m-2"
                  aria-live="off"
                  style={{ display: 'inline-block' }}>
                  Có
                </button>
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default RemoveModal;
