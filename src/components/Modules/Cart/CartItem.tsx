import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import PriceText from 'src/components/Form/PriceText';
import ProductCardQuantityInput from 'src/components/Modules/ProductCard/ProductCardQuantityInput';
import { useCart } from 'src/contexts/Cart';
import { CartItem as CartItemProps } from 'src/graphql/cart/getCart';

import ProductBadge from '../ProductCard/ProductBadge';
import ConfirmDeleteItemModal from './ConfirmDeleteItemModal';

type Props = CartItemProps;

function CartItem(props: Props) {
  const { t } = useTranslation(['cart', 'errors']);

  const { checkCart, uncheckCart, checkboxCarts } = useCart();

  const totalDiscountAmount = props.promotions
    .filter((promo) => promo.reward_type === 'discount')
    .reduce((total, promo) => {
      return total + promo.discount_percentage;
    }, 0);

  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);

  const productLink = 'products/' + props.product.slug;

  const handleChange = (e) => {
    if (e.target.checked) {
      checkCart(props._id);
    } else {
      uncheckCart(props._id);
    }
  };

  return (
    <div className={clsx(!props.is_available && 'cart-product-available', 'd-flex p-3')}>
      {/* <Checkbox/> */}
      <div className="mr-3">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={checkboxCarts.includes(props._id)}
        />
      </div>
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
            {!props.is_available && <ProductBadge type="out_of_stocks" />}
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
              available={true}
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
              cartId={props._id}
              img={props.product.image_512}
              name={props.productName}
              price={props.product.sale_price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
