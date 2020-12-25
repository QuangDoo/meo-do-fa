import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import QuantityInput from 'src/components/Form/QuantityInput';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { CartItem as CartItemProps } from 'src/graphql/cart/getCart';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';

import ConfirmDeleteModal from './ConfirmDeleteModal';

function CartItem(props: CartItemProps): JSX.Element {
  const { t } = useTranslation(['cart', 'errors']);

  const totalDiscountAmount = props.promotions
    .filter((promo) => promo.reward_type === 'discount')
    .reduce((total, promo) => {
      return total + promo.discount_percentage;
    }, 0);

  const discountedPrice = props.price * ((100 - totalDiscountAmount) / 100);

  const [open, setOpen] = useState<boolean>(false);

  // Refetch cart on update cart complete
  const { refetchCart, loading: loadingCart } = useCart({
    onCompleted: () => {
      toast.success(t('cart:update_success'));
    }
  });

  const [deleteCart, { loading: deletingCart }] = useMutationAuth<DeleteCartData, DeleteCartVars>(
    DELETE_CART,
    {
      onCompleted: () => {
        refetchCart();
      },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0].extensions?.code}`));
      }
    }
  );

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const handleConfirmDelete = () => {
    setOpen(false);
    deleteCart({
      variables: {
        _id: props._id
      }
    });
  };

  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div
          className="cart-item__image lozadloaded flex-shrink-0"
          style={{
            backgroundImage: `url(${props.product.image_512})`
          }}
        />
        <div className="flex-1 pl-2 pr-2">
          <div className="d-flex align-items-center">
            <div>
              <Link href={'products/' + props.product.slug}>
                <a className="cart-item__name" title={props.productName}>
                  {props.productName}
                </a>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1 flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {discountedPrice !== props.price && (
                    <>
                      -{totalDiscountAmount}%{' '}
                      <del className="text-muted">
                        <PriceText price={props.price} />
                      </del>{' '}
                    </>
                  )}
                  <PriceText price={discountedPrice} />
                </div>

                <div className="cart-item__qty">
                  <QuantityInput
                    productId={props.productId}
                    productName={props.productName}
                    productPrice={props.price}
                    productImg={props.product.image_512}
                  />
                </div>
              </div>
            </div>

            <div className="ml-3">
              <button onClick={handleDeleteClick} className="cart-item__remove">
                <i className="fas fa-trash" />
              </button>
            </div>

            <ConfirmDeleteModal
              open={open}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
              productName={props.productName}
              image={props.product.image_512}
              price={props.price}
            />
          </div>
        </div>
      </div>

      <LoadingBackdrop open={deletingCart || loadingCart} />
    </div>
  );
}

export default CartItem;
