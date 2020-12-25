import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import QuantityInput from 'src/components/Form/QuantityInput';
import { ProductDetails } from 'src/graphql/product/product.query';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

import LoginModal from '../LoginModal';
import ProductBadge from '../ProductCard/ProductBadge';

const ProductDetailInfor = (props: ProductDetails): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();

  const { t } = useTranslation(['common', 'productDetail']);

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="h3 text-capitalize">{props.name}</h1>

        <div className="product__status mb-3">
          {props.is_quick_invoice && <ProductBadge type="is_quick_invoice" />}

          {props.is_exclusive && <ProductBadge type="is_exclusive" />}

          {props.is_vn && <ProductBadge type="is_vn" />}
        </div>

        <div className="product__status mb-1" />
        {!isLoggedIn ? (
          <LoginModal />
        ) : (
          <div className="d-flex align-items-center">
            <div className="product__price-group">
              <span className="product__price">
                <PriceText price={props.sale_price} />
                <span className="unit">{t('common:vnd')}</span>
              </span>

              {props.discount_percentage > 0 && (
                <>
                  <br />

                  <span className="product__old-price">
                    <PriceText price={props.list_price} />
                    <span className="unit">{t('common:vnd')}</span>
                  </span>
                </>
              )}
            </div>

            {props.is_quick_invoice && (
              <small className="text-muted ml-3"> ({t('productDetail:vat_included')})</small>
            )}
          </div>
        )}

        <div className="mb-3">
          {props.manufacturer && (
            <>
              <div className="product__info-label">{t('productDetail:manufacturer')}</div>
              <div className="text-capitalize">
                <Link href={`/manufacturers/${props.manufacturer?.id}`}>
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
            props?.categories?.map((item, index) => {
              return (
                <>
                  <Link href={`/categories/${item.id}`}>
                    <a className="text-capitalize" key={index}>
                      {item.name}
                    </a>
                  </Link>
                </>
              );
            })}
        </div>
        <div className="product__status mb-4" />
        {!isLoggedIn ? null : (
          <QuantityInput
            productId={props.id}
            productPrice={props.list_price}
            productName={props.name}
            productImg={props.image_512}
          />
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
