import { useMutation } from '@apollo/client';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UPDATE_CART, UpdateCartData, UpdateCartVars } from 'src/graphql/cart/updateCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';

import { ProductPrice } from '../ProductCard/ProductPrice';
import ConfirmDeleteModal from './ConfirmDeleteModal';

type Props = WithTranslation & {
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
  const { t } = props;

  const [open, setOpen] = useState(false);

  const [isKeyDown, setIsKeyDown] = useState(false);

  const [quantity, setQuantity] = useState<string>(props.quantity.toString());

  const { refetchCart } = useCart();

  const [updateCart] = useMutationAuth<UpdateCartData, UpdateCartVars>(UPDATE_CART, {
    onCompleted: () => {
      toast.success('Update cart success');
      refetchCart();
    },
    onError: (error) => {
      toast.error('Update cart error: ' + error);
    }
  });

  const onHandleClick = () => {
    setIsKeyDown(false);
    setOpen(true);
  };

  const handlePlusClick = () => {
    const newQty = props.quantity + 1;
    setIsKeyDown(false);
    setQuantity(newQty + '');
    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: newQty
        }
      }
    });
  };

  const handleUpdateCart = (quantity) => {
    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: quantity
        }
      }
    });
  };

  const handleMinusClick = () => {
    const newQty = Math.max(props.quantity - 1, 0);
    if (newQty === 0) {
      setIsKeyDown(false);
      setOpen(true);
      setQuantity('1');

      // toast.error(<div>{t('cart:quantity_smaller_than_1')}</div>);
      return;
    }
    setQuantity(newQty + '');

    updateCart({
      variables: {
        inputs: {
          _id: props._id,
          quantity: +newQty
        }
      }
    });
  };

  // Blur on Esc or Enter
  const handleKeyDown = (e) => {
    setIsKeyDown(true);
    if ([13, 27].includes(e.keyCode)) {
      e.target.blur();
    }
  };

  const handleBlur = () => {
    if (+quantity === 0) {
      setQuantity('1');
      setOpen(true);
    } else if (+quantity !== props.quantity) {
      updateCart({
        variables: {
          inputs: {
            _id: props._id,
            quantity: +quantity
          }
        }
      });
    }
  };

  const handleChange = (event) => {
    const string = event.target.value.replace(/\D/g, '');

    const newQuantity = parseInt(string, 10) || 0;

    if (newQuantity + '' !== quantity) {
      setQuantity(newQuantity + '');
    }
  };

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div
          className="cart-item__image lozadloaded flex-shrink-0"
          style={{
            backgroundImage: `url(${props.image})`
          }}
        />
        <div className="flex-1 pl-2 pr-2">
          <div className="d-flex align-items-center">
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

          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1 flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <ProductPrice price={props.price} standard_price={props.standard_price} />
                </div>

                <div className="cart-item__qty">
                  <div className="qty js-qty">
                    <button
                      className="btn btn-sm qty__button qty__button--minus"
                      onClick={handleMinusClick}>
                      <i className="fas fa-minus" />
                    </button>

                    <input
                      type="tel"
                      className="form-control px-1 no-spinner text-center qty__input"
                      min={0}
                      max={100000}
                      value={quantity}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleBlur}
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
              <button onClick={onHandleClick} className="cart-item__remove">
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isKeyDown={isKeyDown}
        open={open}
        onClose={() => setOpen(false)}
        productName={props.productName}
        image={props.image}
        price={props.price}
        _id={props._id}
        updateCart={handleUpdateCart}
      />
    </div>
  );
}

export default withTranslation(['cart'])(CartItem);
