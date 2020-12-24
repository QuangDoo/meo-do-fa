import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';

type ProductPriceProps = {
  price: number;
  standard_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const { t } = useTranslation('common');
  const priceIsDifferent = props.price !== props.standard_price;

  return (
    <>
      <span className={clsx('product-card__price', priceIsDifferent && 'mr-1')}>
        <PriceText price={props.price} />
        <span className="unit">{t('common:vnd')}</span>
      </span>

      {priceIsDifferent && (
        <span className="product-card__old-price">
          <PriceText price={props.standard_price} />
          <span className="unit">đ</span>
        </span>
      )}
    </>
  );
};
