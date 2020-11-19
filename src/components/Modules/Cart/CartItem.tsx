import { useMutation } from '@apollo/react-hooks';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { UPDATE_CART, UpdateCartData, UpdateCartVars } from 'src/graphql/cart/updateCart.mutation';

import { ProductPrice } from '../ProductCard/ProductPrice';
import ConfirmDeleteModal from './ConfirmDeleteModal';

type Props = {
  image: string;

  productName: string;

  productId: string;

  uom_name: string;

  price: number;

  standard_price: number;

  quantity: number;

  _id: string;

  refetchCart: () => void;
};

function CartItem(props: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  const [isImportant, setIsImportant] = useState(false);

  const [updateCart] = useMutation<UpdateCartData, UpdateCartVars>(UPDATE_CART, {
    onError: (error) => {
      console.log('Update cart error:', { error });
      toast.error('Update cart error:' + error);
    },
    onCompleted: (data) => {
      if (data.updateCart.code !== 200) return;

      toast.success('Update cart success');

      props.refetchCart();
    }
  });

  const handlePlusClick = () => {
    const newQty = props.quantity + 1;

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  const handleMinusClick = () => {
    const newQty = props.quantity - 1;

    if (newQty === 0) {
      toast.error(
        <div>
          Product quantity cannot be smaller than 1.
          <br />
          Please press the trash can button if you want to remove this product.
        </div>
      );
      return;
    }

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = +e.target.value;

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-7 d-flex align-items-center pl-4">
          <button
            className={clsx('cart-item__important-btn', isImportant ? 'active' : 'inactive')}
            onClick={() => setIsImportant((isImportant) => !isImportant)}>
            <i className="fas fa-star" />
          </button>
          <div
            className="cart-item__image lozad mr-2 loaded"
            style={{
              backgroundImage: `url(data:image/png;base64,${props.image})`
            }}
          />
          <div>
            <Link href={'products/' + props.productId}>
              <a className="cart-item__name" title={props.productName}>
                {props.productName}
              </a>
            </Link>

            <div className="cart-item__package">
              <small>{props.uom_name}</small>
            </div>
          </div>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <ProductPrice price={props.price} standard_price={props.standard_price} />
              </div>
              <div className="cart-item__qty">
                {/* <QuantityInput {...props} quantity={props.quantity} /> */}

                <div className="qty js-qty">
                  <button
                    className="btn btn-sm qty__button qty__button--minus"
                    onClick={handleMinusClick}>
                    <i className="fas fa-minus" />
                  </button>

                  <input
                    type="tel"
                    name="item_quantity"
                    className="form-control px-1 no-spinner text-center qty__input"
                    inputMode="numeric"
                    min={0}
                    max={100000}
                    step={1}
                    autoComplete="off"
                    value={props.quantity}
                    onChange={handleInputChange}
                  />

                  <button
                    className="btn btn-sm qty__button qty__button--plus"
                    onClick={handlePlusClick}>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-3">
            <button onClick={() => setOpen(true)} className="cart-item__remove">
              <i className="fas fa-trash" />
            </button>
          </div>
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
        onClose={() => setOpen(false)}
        productName={props.productName}
        image={props.image}
        price={props.price}
        refetchCart={props.refetchCart}
        _id={props._id}
      />
    </div>
  );
}

export default CartItem;
