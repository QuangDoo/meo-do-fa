import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import ProductCardQuantityInput from 'src/components/Modules/ProductCard/ProductCardQuantityInput';
import { useCart } from 'src/contexts/Cart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { CartItem as CartItemProps } from 'src/graphql/cart/getCart';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ConfirmDeleteItemModal from './ConfirmDeleteItemModal';

function CartItem(props: CartItemProps) {
  const { t } = useTranslation(['cart', 'errors']);

  const totalDiscountAmount = props.promotions
    .filter((promo) => promo.reward_type === 'discount')
    .reduce((total, promo) => {
      return total + promo.discount_percentage;
    }, 0);

  const [open, setOpen] = useState<boolean>(false);

  // Refetch cart on update cart complete
  const { refetch: refetchCart } = useCart();

  const [deleteCart, { loading: deletingCart }] = useMutationAuth<DeleteCartData, DeleteCartVars>(
    DELETE_CART,
    {
      onCompleted: () => {
        refetchCart().then(() => {
          toast.success(t('cart:delete_success'));
        });
      },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
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

  const productLink = 'products/' + props.product.slug;

  return (
    <div className="d-flex p-3">
      <Link href={productLink}>
        <a>
          <img
            className="cart-item-img"
            src={props.product.image_512 || '/assets/images/no_images.jpg'}
            alt={props.product.image_512}
          />
        </a>
      </Link>

      <div className="ml-3 d-flex flex-column flex-grow-1 flex-md-row justify-content-md-between">
        <div>
          <Link href={productLink}>
            <a className="cart-item__name" title={props.productName}>
              {props.productName}
            </a>
          </Link>

          <div className="product__status">
            {props.product.is_quick_invoice && (
              <span className="badge badge-light display-status mr-1 mb-1 invoice_exportable">
                {props.tax !== -1 && (
                  <>
                    <i className="fas mr-1"></i>
                    {t(`cart:quick_invoice`)}{' '}
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 d-flex flex-shrink-0 flex-column align-items-start align-items-md-end mt-md-0">
          <div>
            <PriceText price={props.product.sale_price} />
          </div>

          {totalDiscountAmount > 0 && (
            <small className="d-flex align-items-center">
              <del className="text-muted">
                <PriceText price={props.product.old_price} />
              </del>
              <div className="mx-2">I</div>-{totalDiscountAmount}%
            </small>
          )}

          <div className="mt-3 d-flex cart-item__qty align-items-center">
            <ProductCardQuantityInput
              productId={props.productId}
              productName={props.productName}
              productPrice={props.price}
              productImg={props.product.image_512}
            />

            <div className="ml-3">
              <button onClick={handleDeleteClick} className="cart-item__remove">
                <i className="fas fa-trash" />
              </button>
            </div>

            <ConfirmDeleteItemModal
              title={t('cart:remove_title')}
              question={t('cart:remove_confirm')}
              open={open}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
              img={props.product.image_512}
              name={props.productName}
              price={props.product.sale_price}
            />
          </div>
        </div>
      </div>

      <LoadingBackdrop open={deletingCart} />
    </div>
  );
}

export default CartItem;
