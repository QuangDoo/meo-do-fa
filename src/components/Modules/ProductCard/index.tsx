import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useToken } from 'src/contexts/Token';
import { Product } from 'src/graphql/product/getProducts';

import { DiscountRibbon } from './DiscountRibbon';
import LoginToSeePrice from './LoginToSeePrice';
import ProductBadges from './ProductBadges';
import ProductCardQuantityInput from './ProductCardQuantityInput';
import { ProductPrice } from './ProductPrice';

type Props = Product;

const isNotNull = (category: Product['categories'][0]) => {
  return category.id !== null && category.name !== null;
};

const ProductCard = (props: Props) => {
  const token = useToken();

  const { t } = useTranslation('productCard');

  const isDiscount = props.discount_percentage > 0;

  const isAvailable = !props.is_available;

  return (
    <div className="product-card-container">
      <article
        className={clsx(
          'product-card card mx-auto',
          isDiscount && 'deal-card',
          isAvailable && 'availabel-card'
        )}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.is_new && (
              <div className="product-card__new-arrival">{t('productCard:new')}</div>
            )}

            {isDiscount && <DiscountRibbon discountPercent={props.discount_percentage} />}

            <Link href={`/products/${props.slug}`}>
              <a>
                <div className="product-card__image mb-3 lozad">
                  <div className="banner-wrapper">
                    <img
                      src={props.image_256 || '/assets/images/no_images.jpg'}
                      className="banner--image"
                      alt="Medofa product"
                    />
                  </div>
                  {/* <Image
                    src={props.image_256 || '/assets/images/no_images.jpg'}
                    layout="fill"
                    objectFit={props.image_256 ? 'contain' : 'cover'}
                  /> */}
                </div>
              </a>
            </Link>

            <div>
              <Link href={`/products/${props.slug}`}>
                <a className="text-decoration-none">
                  <Tooltip title={props.name} placement="bottom">
                    <h6 className="product-card__name">{props.name}</h6>
                  </Tooltip>
                </a>
              </Link>

              <div className="product__status mb-2">
                {token && <ProductBadges product={props} />}
              </div>

              <small className="text-muted">{props.packing_unit}</small>

              <br />

              {props.categories?.some(isNotNull) && (
                <small className="text-muted product-card__category text-max-3">
                  {t('productCard:category')}:{' '}
                  {props.categories
                    ?.slice()
                    .filter(isNotNull)
                    .map(({ id, name }, index, arr) => (
                      <React.Fragment key={id}>
                        <Link href={`/products?category=${id}`}>
                          <a>{name}</a>
                        </Link>
                        {index < arr.length - 1 && '; '}
                      </React.Fragment>
                    ))}
                </small>
              )}
              {props.manufacturer.id !== null && (
                <small
                  title={props.manufacturer.name}
                  className="text-muted product-card__manufacturer">
                  {t('productCard:manufacturer')}:{' '}
                  <Link href={`/manufacturers/${props.manufacturer.id}`}>
                    {props.manufacturer.short_name || props.manufacturer.name}
                  </Link>
                </small>
              )}
              {props.default_vendor !== null && (
                <small title={props.default_vendor} className="product-card__name-supplier">
                  <div className="text-muted supplier-name">{t('productCard:supplier')}:</div>{' '}
                  {props.default_vendor}
                </small>
              )}
              <br />
            </div>
          </div>

          <div className="product-card__buy">
            {token ? (
              <>
                <div className="mb-2">
                  <ProductPrice price={props.old_price} sale_price={props.sale_price} />
                </div>

                <div className="product_qty">
                  <ProductCardQuantityInput
                    productId={props.id}
                    productPrice={props.list_price}
                    productName={props.name}
                    productImg={props.image_512}
                  />
                </div>
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

export default ProductCard;
