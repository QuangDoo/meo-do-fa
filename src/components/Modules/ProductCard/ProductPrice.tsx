import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';
import PriceText from 'src/components/Form/PriceText';

type ProductPriceProps = {
  list_price: number;
  sale_price?: number;
};

export const ProductPrice = (props: ProductPriceProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      {props.sale_price ? (
        <>
          <span className="product-card__price">
            <PriceText price={props.sale_price} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
          <span className="product-card__old-price ml-2">
            <PriceText price={props.list_price} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </>
      ) : (
        <span className="product-card__price">
          <PriceText price={props.list_price} />
          <span className="unit">{t('common:vnd')}</span>
        </span>
      )}
      {/* <span className={clsx('product-card__price', priceIsDifferent && 'mr-1')}>
        <PriceText price={props.price} />
        <span className="unit">{t('common:vnd')}</span>
      </span>

      {priceIsDifferent && (
        <span className="product-card__old-price">
          <PriceText price={props.standard_price} />
          <span className="unit">{t('common:vnd')}</span>
        </span>
      )} */}
    </>
  );
};
