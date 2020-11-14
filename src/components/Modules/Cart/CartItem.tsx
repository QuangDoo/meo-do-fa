import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';

import { ProductPrice } from '../ProductCard/ProductPrice';
import QuantityInput from '../QuantityInput';
import ConfirmDeleteModal from './ConfirmDeleteModal';

type Props = {
  image: string;
  productName: string;
  productId: string;
  uom_name: string;
  list_price: number;
  standard_price: number;
  quantity: number;
};

function CartItem(props: Props): JSX.Element {
  console.log('props', props);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-7 d-flex align-items-center pl-4">
          <div className="cart-item__important-btn inactive">
            <i className="fas fa-star" />
          </div>
          <div
            className="cart-item__image lozad mr-2 loaded"
            style={{
              backgroundImage: `url(data:image/png;base64,${props.image})`
            }}
          />
          <div>
            <a
              className="cart-item__name"
              href={'products/' + props.productId}
              title={props.productName}>
              {props.productName}
            </a>
            <div className="cart-item__package">
              <small>{props.uom_name}</small>
            </div>
          </div>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <ProductPrice list_price={props.list_price} standard_price={props.standard_price} />
              </div>
              <div className="cart-item__qty">
                <QuantityInput {...props} quantity={props.quantity} />
              </div>
            </div>
          </div>
          <DeleteIcon className="cart-item__remove" onClick={openModal} />
        </div>

        {/* {props.limit && (
          <div className="col-12">
            <small className="text-danger">
              Số lượng có hạn! Hãy mau thanh toán để được hưởng giá ưu đãi.
            </small>
          </div>
        )} */}
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={closeModal}
        productName={props.productName}
        image={props.image}
        price={props.list_price}
      />
    </div>
  );
}

export default CartItem;
