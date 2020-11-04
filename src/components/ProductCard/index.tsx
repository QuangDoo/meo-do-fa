import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

import { withTranslation } from '../../../i18n';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { Product } from '../../types/Product';
import { DiscountRibbon } from './DiscountRibbon';
import LoginToSeePrice from './LoginToSeePrice';
import ProductBadge from './ProductBadge';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import QuantityInput from './QuantityInput';

type Props = Product & WithTranslation;

const ProductCard = ({ badges = [], t, ...props }: Props): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className="product-card-container">
      <article className={`product-card card ${props.deal ? 'deal-card' : ''}`}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.new && <div className="product-card__new-arrival">{t('productCard:new')}</div>}

            {props.discountPercent && <DiscountRibbon discountPercent={props.discountPercent} />}

            <ProductImage imageId={props.image} productId={props.id} />

            <div>
              <Link href={`/products/${props.id}`}>
                <a className="text-decoration-none">
                  <h6 className="product-card__name">{props.name}</h6>
                </a>
              </Link>

              <div className="product__status mb-2">
                {isLoggedIn &&
                  badges.map((badgeType) => (
                    <ProductBadge
                      key={badgeType}
                      type={badgeType}
                      expirationDate={props.expirationDate}
                    />
                  ))}
              </div>

              <small className="text-muted">{props.unit}</small>

              <br />

              <small className="text-muted product-card__category">
                {t('productCard:category')}:{' '}
                {props.categories.map((category, index) => (
                  <>
                    <Link key={category.id} href={`/products?category=${category.id}`}>
                      <a>{category.name}</a>
                    </Link>
                    {index < props.categories.length - 1 && '; '}
                  </>
                ))}
              </small>
            </div>
          </div>

          <div className="product-card__buy">
            {isLoggedIn ? (
              <>
                <div className="mb-2">
                  <ProductPrice price={props.price} />
                </div>
                <QuantityInput />
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
