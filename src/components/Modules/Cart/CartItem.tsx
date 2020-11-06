import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

import { ProductPrice } from '../ProductCard/ProductPrice';
import QuantityInput from '../ProductCard/QuantityInput';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function CartItem(props): JSX.Element {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-7 d-flex align-items-center pl-4">
          <div
            className="cart-item__important-btn inactive"
            data-action="click->cart#updateImportantButton"
            data-item-id={3206540}>
            <i className="fas fa-star" />
          </div>
          <div
            className="cart-item__image lozad mr-2 loaded"
            data-background-image={props.image}
            style={{
              backgroundImage: `url(${props.image})`
            }}
            data-loaded="true"
          />
          <div>
            <a
              className="cart-item__name"
              href={'products/' + props.slug}
              title={props.productName}>
              {props.productName}
            </a>
            <div className="cart-item__package">
              <small>{props.description}</small>
            </div>
          </div>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {' '}
                <ProductPrice price={props.price.toLocaleString('de-DE')} />{' '}
                {props.oldPrice > props.price && (
                  <span className="cart-item__old-price">
                    {props.oldPrice.toLocaleString('de-DE')}
                    <span className="unit">đ</span>
                  </span>
                )}
              </div>
              <div className="cart-item__qty">
                <QuantityInput {...props} quantity={props.quantity} />
              </div>
            </div>
          </div>
          <DeleteIcon className="cart-item__remove" onClick={openModal} />
        </div>

        {props.limit && (
          <div className="col-12">
            <small className="text-danger">
              Số lượng có hạn! Hãy mau thanh toán để được hưởng giá ưu đãi.
            </small>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={closeModal}
        productName={props.productName}
        image={props.image}
        price={props.price}
      />
    </div>
  );
}

export default CartItem;
