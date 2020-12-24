import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';

type ProductPriceProps = {
  price: number;
  standard_price?: number;
  sale_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const { t } = useTranslation('common');
  const priceIsDifferent = props.standard_price && props.price !== props.standard_price;

  let promotionPrice = props.sale_price && props.price !== props.sale_price;
  promotionPrice = Number(promotionPrice) === 0 ? null : promotionPrice;

  return (
    <>
      {promotionPrice ? (
        <>
          <span className={clsx('product-card__price', promotionPrice && 'mr-2')}>
            <PriceText price={props.sale_price} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
          <span className="product-card__old-price">
            <PriceText price={props.price} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </>
      ) : (
        <>
          <span className={clsx('product-card__price', priceIsDifferent && 'mr-2')}>
            <PriceText price={props.price} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
          {/* {priceIsDifferent && (
            <span className="product-card__old-price">
              <PriceText price={props.standard_price} />
              <span className="unit">đ</span>
            </span>
          )} */}
        </>
      )}
    </>
  );
};
