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

const ProductCard = (props: Props) => {
  const token = useToken();

  const { t } = useTranslation('productCard');

  const isDiscount = props.discount_percentage > 0;

  return (
    <div className="product-card-container">
      <article className={clsx('product-card card mx-auto', isDiscount && 'deal-card')}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.is_new && (
              <div className="product-card__new-arrival">{t('productCard:new')}</div>
            )}

            {isDiscount && <DiscountRibbon discountPercent={props.discount_percentage} />}

            <Link href={`/products/${props.slug}`}>
              <a>
                <div className="product-card__image mb-3 lozad">
                  <Image
                    src={props.image_256 || '/assets/images/no_images.jpg'}
                    layout="fill"
                    objectFit={props.image_256 ? 'contain' : 'cover'}
                  />
                </div>
              </a>
            </Link>

            <div>
              <Link href={`/products/${props.slug}`}>
                <a className="text-decoration-none">
                  <h6 title={props.name} className="product-card__name">
                    {props.name}
                  </h6>
                </a>
              </Link>

              <div className="product__status mb-2">
                {token && <ProductBadges product={props} />}
              </div>

              <small className="text-muted">{props.packing_unit}</small>

              <br />

              <small className="text-muted product-card__category text-max-3">
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

              {props.manufacturer.id && (
                <small className="text-muted">
                  {t('productCard:manufacturer')}: {props.manufacturer.short_name}
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
