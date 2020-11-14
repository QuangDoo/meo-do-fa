import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { DateTime } from 'luxon';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { useCategories } from 'src/contexts/Categories';
import { OrderProvider } from 'src/contexts/Order';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';
import { Product } from 'src/types/Product';

import QuantityInput from '../QuantityInput';
import { DiscountRibbon } from './DiscountRibbon';
import LoginToSeePrice from './LoginToSeePrice';
import ProductBadge from './ProductBadge';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

type Props = Product &
  WithTranslation & {
    showBadges?: boolean;
    showCategories?: boolean;
  };

const ProductCard = ({
  showBadges = true,
  showCategories = false,
  t,
  ...props
}: Props): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();

  const { nameLookup: categoryNameLookup } = useCategories();

  const createDate = new Date(props.create_date);

  // Month difference from create date and now
  const monthDiff = DateTime.fromJSDate(createDate).diffNow('months').months;

  // New => Created in 3 recent months
  const isNew = monthDiff >= -3;

  const discountPercent = Math.round(100 - (props.list_price * 100) / props.standard_price);

  const isDiscount = discountPercent > 0;

  return (
    <div className="product-card-container">
      <article className={clsx('product-card card mx-auto', isDiscount && 'deal-card')}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {isNew && <div className="product-card__new-arrival">{t('productCard:new')}</div>}

            {isDiscount && <DiscountRibbon discountPercent={discountPercent} />}

            <ProductImage imageId={props.image_128} productId={props.id} />

            <div>
              <Link href={`/products/${props.id}`}>
                <a className="text-decoration-none">
                  <h6 className="product-card__name">{props.name}</h6>
                </a>
              </Link>

              {showBadges && (
                <div className="product__status mb-2">
                  {isLoggedIn &&
                    props.badges?.map((badgeType) => (
                      <ProductBadge
                        key={badgeType}
                        type={badgeType}
                        expirationDate={props.expirationDate}
                      />
                    ))}
                </div>
              )}

              <small className="text-muted">{props.uom_name}</small>

              <br />

              {showCategories && (
                <small className="text-muted product-card__category">
                  {t('productCard:category')}:{' '}
                  {props.category_ids.map((id, index) => (
                    <>
                      <Link key={id} href={`/products?category=${id}`}>
                        <a>{categoryNameLookup[id]}</a>
                      </Link>
                      {index < props.category_ids.length - 1 && '; '}
                    </>
                  ))}
                </small>
              )}
            </div>
          </div>

          <div className="product-card__buy">
            {isLoggedIn ? (
              <>
                <div className="mb-2">
                  <ProductPrice
                    list_price={props.list_price}
                    standard_price={isDiscount && props.standard_price}
                  />
                </div>
                <OrderProvider>
                  <QuantityInput
                    quantity={0}
                    productId={props.id}
                    price={props.price}
                    name={props.name}
                  />
                </OrderProvider>
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
