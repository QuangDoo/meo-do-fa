import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import QuantityInput from 'src/components/Form/QuantityInput';
import { useToken } from 'src/contexts/Token';
import { ProductDetails } from 'src/graphql/product/product.query';

import LoginModal from '../LoginModal';
import ProductBadges from '../ProductCard/ProductBadges';

const ProductDetailInfor = (props: ProductDetails) => {
  const token = useToken();

  const { t } = useTranslation(['common', 'productDetail']);

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="h3 text-capitalize">{props.name}</h1>

        <div className="product__status mb-3">
          <ProductBadges product={props} />
        </div>

        {!token ? (
          <LoginModal />
        ) : (
          <div className="d-flex flex-column">
            <div className="product__price-group mb-1">
              <span className="product__price">
                <PriceText price={props.sale_price} />
              </span>

              {props.discount_percentage > 0 && (
                <span className="product__old-price ml-3">
                  <PriceText price={props.old_price} />
                </span>
              )}
            </div>

            {props.is_quick_invoice && (
              <small className="text-muted"> ({t('productDetail:vat_included')})</small>
            )}
          </div>
        )}

        <div className="my-3">
          {props?.manufacturer && (
            <>
              <div className="product__info-label">{t('productDetail:manufacturer')}</div>
              <div className="text-capitalize">
                <Link href={`/products?manufacturer=${props.manufacturer?.id}`}>
                  <a>{props.manufacturer?.name}</a>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="mb-3">
          {props?.categories?.length > 0 && (
            <div className="product__info-label">{t('productDetail:category')}</div>
          )}
          {props?.categories &&
            props?.categories?.map((item, index, arr) => {
              return (
                <>
                  <Link href={`/products?category=${item.id}`}>
                    <a className="text-capitalize" key={index}>
                      {item.name}
                    </a>
                  </Link>
                  {index < arr.length - 1 && '; '}
                </>
              );
            })}
        </div>
        <div className="product__status mb-4" />
        {!token ? null : (
          <div className="col-6 px-0">
            <QuantityInput
              productId={props.id}
              productPrice={props.list_price}
              productName={props.name}
              productImg={props.image_512}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
