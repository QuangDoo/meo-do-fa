import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';
import { Product } from 'src/types/Product';

import QuantityInput from '../QuantityInput';
import { DiscountRibbon } from './DiscountRibbon';
import LoginToSeePrice from './LoginToSeePrice';
import ProductBadge from './ProductBadge';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

type Props = Product & WithTranslation;

const ProductCard = ({ t, ...props }: Props): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();

  const discountPercent = Math.round(100 - (props.price * 100) / props.standard_price);

  // const isDiscount = discountPercent > 0;
  const isDiscount = false;

  return (
    <div className="product-card-container">
      <article className={clsx('product-card card mx-auto', isDiscount && 'deal-card')}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.is_new && (
              <div className="product-card__new-arrival">{t('productCard:new')}</div>
            )}

            {isDiscount && <DiscountRibbon discountPercent={discountPercent} />}

            <ProductImage imageId={props.image_256} productId={props.id} />

            <div>
              <Link href={`/products/${props.id}`}>
                <a className="text-decoration-none">
                  <h6 className="product-card__name">{props.name}</h6>
                </a>
              </Link>

              <div className="product__status mb-2">
                {isLoggedIn && (
                  <>
                    {props.is_quick_invoice && <ProductBadge type="is_quick_invoice" />}

                    {props.is_exclusive && <ProductBadge type="is_exclusive" />}

                    {props.is_vn && <ProductBadge type="is_vn" />}
                  </>
                )}
              </div>

              <small className="text-muted">{props.uom_name}</small>

              <br />

              <small className="text-muted product-card__category">
                {t('productCard:category')}:{' '}
                {props.categories?.map(({ id, name }, index, arr) => (
                  <React.Fragment key={id}>
                    <Link href={`/products?category=${id}`}>
                      <a>{name}</a>
                    </Link>
                    {index < arr.length - 1 && '; '}
                  </React.Fragment>
                ))}
              </small>
            </div>
          </div>

          <div className="product-card__buy">
            {isLoggedIn ? (
              <>
                <div className="mb-2">
                  <ProductPrice price={props.list_price} standard_price={props.standard_price} />
                </div>

                <QuantityInput productId={props.id} price={props.list_price} name={props.name} />
              </>
            ) : (
              <LoginToSeePrice />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

 export default withTranslation(['productCard'])(ProductCard);
