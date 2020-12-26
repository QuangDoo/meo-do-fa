import { useTranslation } from 'i18n';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';

type ProductPriceProps = {
  price: number;
  sale_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const { t } = useTranslation('common');

  const isOnSale = !!props.sale_price && props.sale_price !== props.price;

  return isOnSale ? (
    <>
      <span className="product-card__price mr-2">
        <PriceText price={props.sale_price} />
        <span className="unit">{t('common:vnd')}</span>
      </span>

      <span className="product-card__old-price">
        <PriceText price={props.price} />
        <span className="unit">{t('common:vnd')}</span>
      </span>
    </>
  ) : (
    <span className="product-card__price">
      <PriceText price={props.sale_price} />
      <span className="unit">{t('common:vnd')}</span>
    </span>
  );
};
