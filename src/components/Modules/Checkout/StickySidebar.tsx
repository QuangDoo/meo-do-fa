import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import Button from 'src/components/Form/Button';
import PriceText from 'src/components/Form/PriceText';
import { GetCounselData } from 'src/graphql/order/getCounsel';

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
  counselData?: GetCounselData;
  totalPrice?: number;
};

const StickySidebar = (props: Props): JSX.Element => {
  const { t } = useTranslation(['checkout', 'common']);

  const data = props.counselData?.getCounsel;

  if (!data) return null;

  return (
    <div className="checkout__sticky">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="d-flex flex-wrap align-items-center">
          {t('checkout:confirm_checkout_title')}

          <small className="ml-1">
            {t('checkout:confirm_checkout_quantity', {
              quantity: data.totalQty
            })}
          </small>
        </h4>

        <div>
          <Link href="/cart" passHref>
            <Button size="sm" variant="primary">
              {t('checkout:confirm_checkout_edit')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="elevated checkout__info row no-gutters mb-3">
        <SidebarItem label={t('checkout:price_provisional_sums')}>
          <div className="d-flex">
            <PriceText price={props.totalPrice} />
            <span className="unit">{t('common:vnd')}</span>
          </div>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_shipping_fee')}>
          <span>
            {data.totalShippingFee.toLocaleString('de-DE')}
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_total_discount')}>
          <span>
            {data.totalDcAmt ? (
              <>
                -<PriceText price={data.totalDcAmt} />
              </>
            ) : (
              0
            )}
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem containerClass="checkout__info-promo"></SidebarItem>

        <SidebarItem label={t('checkout:price_total')} containerClass="checkout__info-total">
          <span className="checkout__total">
            <PriceText price={data.totalNetPrice} />
            <span className="unit">{t('common:vnd')}</span>
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
