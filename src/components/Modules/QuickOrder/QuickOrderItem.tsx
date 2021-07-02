import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { useToken } from 'src/contexts/Token';
import { Product } from 'src/graphql/product/getProducts';

import { DiscountRibbon } from '../ProductCard/DiscountRibbon';
import LoginToSeePrice from '../ProductCard/LoginToSeePrice';
import ProductBadges from '../ProductCard/ProductBadges';
import ProductCardQuantityInput from '../ProductCard/ProductCardQuantityInput';
import { ProductPrice } from '../ProductCard/ProductPrice';

type Props = {
  image: string;
  productName: string;
  productId: number;
  price: number;
  sale_price: number;
  list_price: number;
  _id: number;
  slug: string;
  discount_percentage: number;
  product: Product;
  isAvailable: boolean;
  max_qty_per_order: number;
};

function QuickOrderItem(props: Props) {
  const { i18n, t } = useTranslation(['common']);
  const token = useToken();
  const image = props?.image || '/assets/images/no-image.jpg';
  const isDiscount = props.discount_percentage > 0;
  return (
    <div className="cart-item ">
      <div className="row align-items-center px-2 ">
        <div
          className="cart-item__image lozadloaded flex-shrink-0 discount__quick-order"
          style={{
            backgroundImage: `url(${image})`
          }}>
          <div className="discount__quick-order-percent">
            {isDiscount && <DiscountRibbon discountPercent={props.discount_percentage} />}
          </div>
        </div>

        <div className="flex-1 pl-2 pr-2 ">
          <div className="d-flex align-items-center ">
            <div>
              <Link href={`${i18n?.language === 'vi' ? '/san-pham' : '/products'}/` + props.slug}>
                <a className="cart-item__name" title={props.productName}>
                  {props.productName}
                </a>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="flex-1 flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {token ? (
                    <>
                      <ProductPrice price={props.price} sale_price={props.sale_price} />
                      <div className="product__status ml-2 mb-2 d-inline">
                        <ProductBadges product={props.product} />
                      </div>
                    </>
                  ) : (
                    <LoginToSeePrice />
                  )}
                </div>

                {token && (
                  <div className="cart-item__qty">
                    <ProductCardQuantityInput
                      productId={props.productId}
                      productPrice={props.list_price}
                      productName={props.productName}
                      productImg={image}
                      available={props.isAvailable}
                    />
                    {props.max_qty_per_order > 0 && (
                      <small className="text-danger text-right">
                        Đặt tối đa {props.max_qty_per_order} sản phẩm
                        {t('common:maximum_quantity')}: {props.max_qty_per_order}{' '}
                        {t('common:maximum_quantity')}
                      </small>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickOrderItem;
