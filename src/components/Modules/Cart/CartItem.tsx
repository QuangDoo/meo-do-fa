import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { CartItem as CartItemProps } from 'src/graphql/cart/getCart';
import { UPDATE_CART, UpdateCartData, UpdateCartVars } from 'src/graphql/cart/updateCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

import ConfirmDeleteModal from './ConfirmDeleteModal';

type Props = {
  item: CartItemProps;
};

function CartItem(props: Props): JSX.Element {
  const { t } = useTranslation(['cart', 'errors']);

  const { item } = props;

  const totalDiscountAmount = item.promotions
    .filter((promo) => promo.reward_type === 'discount')
    .reduce((total, promo) => {
      return total + promo.discount_percentage;
    }, 0);

  console.log('item:', item);

  const discountedPrice = item.price * ((100 - totalDiscountAmount) / 100);

  const [open, setOpen] = useState(false);

  const openDeleteModal = () => setOpen(true);
  const closeDeleteModal = () => setOpen(false);

  const [displayQuantity, setDisplayQuantity] = useState<string>(item.quantity + '');

  const [quantity, setQuantity] = useState<number>(item.quantity);

  // Refetch cart on update cart complete
  const { refetchCart, loading: loadingCart } = useCart({
    onCompleted: () => {
      toast.success(t('cart:update_success'));
    }
  });

  const [updateCart, { loading: updatingCart }] = useMutationAuth<UpdateCartData, UpdateCartVars>(
    UPDATE_CART,
    {
      onCompleted: () => {
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
        _id: item._id
      }
    });
    closeDeleteModal();
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
            _id: item._id,
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
            backgroundImage: `url(${item.product.image_512})`
          }}
        />
        <div className="flex-1 pl-2 pr-2">
          <div className="d-flex align-items-center">
            <div>
              <Link href={'products/' + item.product.slug}>
                <a className="cart-item__name" title={item.productName}>
                  {item.productName}
                </a>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1 flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {discountedPrice !== item.price && (
                    <>
                      -{totalDiscountAmount}%{' '}
                      <del className="text-muted">
                        <PriceText price={item.price} />
                      </del>{' '}
                    </>
                  )}
                  <PriceText price={discountedPrice} />
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
        productName={item.productName}
        image={item.product.image_512}
        price={item.price}
      />

      <LoadingBackdrop open={updatingCart || deletingCart || loadingCart} />
    </div>
  );
}

export default CartItem;
