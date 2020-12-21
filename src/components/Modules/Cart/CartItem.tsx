import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { UPDATE_CART, UpdateCartData, UpdateCartVars } from 'src/graphql/cart/updateCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

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
};

function CartItem(props: Props): JSX.Element {
  const { t } = useTranslation(['cart', 'errors']);

  const [open, setOpen] = useState(false);

  const openDeleteModal = () => setOpen(true);
  const closeDeleteModal = () => setOpen(false);

  const [displayQuantity, setDisplayQuantity] = useState<string>(props.quantity + '');

  const [quantity, setQuantity] = useState<number>(props.quantity);

  const { refetchCart } = useCart();

  const [updateCart, { loading: updatingCart }] = useMutationAuth<UpdateCartData, UpdateCartVars>(
    UPDATE_CART,
    {
      onCompleted: () => {
        toast.success(t('cart:update_success'));
        refetchCart();
      },
      onError: (error) => {
        const errorCode = error.graphQLErrors?.[0].extensions?.code;

        if (errorCode) {
          toast.error(t(`errors:code_${errorCode}`));
        }
      }
    }
  );

  const [deleteCart, { loading: deletingCart }] = useMutationAuth<DeleteCartData, DeleteCartVars>(
    DELETE_CART,
    {
      onCompleted: () => {
        toast.success(t('cart:delete_success'));
        refetchCart();
        closeDeleteModal();
      },
      onError: (error) => {
        const errorCode = error.graphQLErrors?.[0].extensions?.code;

        if (errorCode) {
          toast.error(t(`errors:code_${errorCode}`));
        }
      }
    }
  );

  // Set quantity back to 1 if user doesn't confirm delete
  const handleCloseModal = () => {
    if (quantity === 0) {
      setDisplayQuantity('1');
      setQuantity(1);
    }
    closeDeleteModal();
  };

  const handleDeleteCart = () => {
    deleteCart({
      variables: {
        _id: props._id
      }
    });
  };

  const handlePlusClick = () => {
    const newQty = +displayQuantity + 1;
    setDisplayQuantity(newQty + '');
    setQuantity(newQty);
  };

  const handleMinusClick = () => {
    const newQty = Math.max(+displayQuantity - 1, 0);
    setDisplayQuantity(newQty + '');
    setQuantity(newQty);
  };

  // Blur on Esc or Enter
  const handleKeyDown = (e) => {
    if ([13, 27].includes(e.keyCode)) {
      e.target.blur();
    }
  };

  // Change display quantity but not real quantity for update
  const handleChange = (event) => {
    const string = event.target.value.replace(/\D/g, '');

    const newQuantity = +string || 0;

    setDisplayQuantity(newQuantity + '');
  };

  // Only change real quantity on input blur
  const handleInputBlur = () => {
    setQuantity(+displayQuantity);
  };

  // Set display quantity to 0 on delete
  const handleDeleteClick = () => {
    openDeleteModal();
  };

  // Debounce when real quantity change
  useDebouncedEffect(
    () => {
      if (quantity === 0) {
        openDeleteModal();
        return;
      }

      updateCart({
        variables: {
          inputs: {
            _id: props._id,
            quantity: quantity
          }
        }
      });
    },
    450,
    [quantity]
  );

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

              {/* <div className="cart-item__package">
                <small>{props.uom_name}</small>
              </div> */}
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
                      value={displayQuantity}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleInputBlur}
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
              <button onClick={handleDeleteClick} className="cart-item__remove">
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleDeleteCart}
        productName={props.productName}
        image={props.image}
        price={props.price}
      />

      <LoadingBackdrop open={updatingCart || deletingCart} />
    </div>
  );
}

export default CartItem;
