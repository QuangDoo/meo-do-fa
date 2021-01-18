import slugify from '@sindresorhus/slugify';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import Button from 'src/components/Form/Button';
import PriceText from 'src/components/Form/PriceText';
import { OutputCounsel } from 'src/graphql/order/getCounsel';

type SidebarItemProps = {
  label?: string;
  children?: React.ReactNode;
  containerClass?: string;
};

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div className={clsx('col-12', props.containerClass)}>
      {(props.label || props.children) && (
        <div className="checkout__info-item d-flex justify-content-between align-items-center">
          <small className="checkout__info-item-label">{props.label}</small>

          {props.children}
        </div>
      )}
    </div>
  );
};

type Props = {
  counselData?: OutputCounsel;
};

const StickySidebar = (props: Props): JSX.Element => {
  const { counselData } = props;

  const { t } = useTranslation(['checkout', 'common', 'errors']);

  if (!counselData) return null;

  return (
    <div className="checkout__sticky">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="d-flex flex-wrap align-items-baseline">
          {t('checkout:confirm_checkout_title')}

          <small className="ml-2">
            (
            {t('checkout:confirm_checkout_quantity', {
              count: counselData.totalQty
            })}
            )
          </small>
        </h4>

        <Link href="/cart">
          <Button size="sm" variant="primary">
            {t('checkout:confirm_checkout_edit')}
          </Button>
        </Link>
      </div>

      <div className="elevated p-3 checkout__info row no-gutters mb-3">
        {counselData?.counsel?.counsels?.map((product) => (
          <div
            className="w-100 d-flex flex-grow-1 justify-content-between border-bottom pb-2 mb-2 text-small"
            key={product.productId}>
            <div className="d-flex">
              <div className="font-weight-bold mr-2 flex-shrink-0">{product.quantity} x</div>
              <a
                href={`products/${slugify(product.productName)}-pid${product.productId}`}
                rel="noreferrer"
                target="_blank">
                {product.productName}
              </a>
            </div>

            <div>
              <PriceText price={product.price} />
            </div>
          </div>
        ))}

        <SidebarItem label={t('checkout:price_provisional_sums')}>
          <span>
            <PriceText price={counselData.totalPrice} />
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_shipping_fee')}>
          <span>
            <PriceText price={counselData.totalShippingFee} />
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_total_discount')}>
          <span>
            {!!counselData?.totalDcAmt && '-'}

            <PriceText price={counselData.totalDcAmt} />
          </span>
        </SidebarItem>

        {counselData?.totalDcPayment > 0 && (
          <SidebarItem label={t('checkout:price_total_dc_payment')}>
            -<PriceText price={counselData.totalDcPayment} />
          </SidebarItem>
        )}

        <SidebarItem label={t('checkout:price_tax')}>
          <span>
            <PriceText price={counselData.totalPriceVat} />
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_total')} containerClass="border-top pt-2 mt-2">
          <span className="checkout__total font-weight-bold">
            <PriceText price={counselData.totalNetPrice} />
          </span>
        </SidebarItem>
      </div>

      <div className="text-right">
        <div className="mb-2">
          <small>{t('checkout:confirm_checkout_doubleCheck')}</small>
        </div>

        <Button variant="secondary" size="lg" type="submit">
          {t('checkout:confirm_checkout_button')}
        </Button>
      </div>
    </div>
  );
};

export default StickySidebar;
