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

  // const discountedPrice = props.price * ((100 - totalDiscountAmount) / 100);

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

  const productLink = 'products/' + props.product.slug;

  return (
    <div className="d-flex p-3">
      <Link href={productLink}>
        <a>
          <img className="cart-item-img" src={props.product.image_512} alt="" />
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
            <span className="badge badge-light display-status mr-1 mb-1 invoice_exportable">
              <i className="fas mr-1"></i>
              {props.tax === -1
                ? t(`cart:quick_invoice_with_no_tax`)
                : t(`cart:quick_invoice_with_tax`, { tax: props.tax })}
            </span>
          </div>
        </div>

        <div className="mt-3 d-flex flex-shrink-0 flex-column align-items-start align-items-md-end mt-md-0">
          <div>
            <PriceText price={props.product.sale_price} />
            {' ' + t('common:vnd')}
          </div>

          {totalDiscountAmount > 0 && (
            <small className="d-flex align-items-center">
              <del className="text-muted">
                <PriceText price={props.product.old_price} />
                {' ' + t('common:vnd')}
              </del>
              <div className="mx-2">I</div>-{totalDiscountAmount}%
            </small>
          )}

          <div className="mt-3 d-flex cart-item__qty align-items-center">
            <QuantityInput
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
