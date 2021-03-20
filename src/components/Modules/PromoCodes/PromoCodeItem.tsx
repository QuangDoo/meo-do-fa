/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';

import PromocodeDetailDialog from './PromocodeDetailDialog';

// import PromocodeDetailDialog from './PromocodedetailDialog';

type Props = {
  id?: number;
  rewardType: string;
  couponName?: string;
  couponCode: string;
  couponDescription?: string;
  discount?: string;
  couponDateFrom?: string;
  discountType: string;
  discountFixedAmount: number;
};

export default function PromoCodeItem(props: Props) {
  const { t } = useTranslation(['promoCodes', 'common']);
  const [click, setClick] = useState('Click to copy');
  const [open, setOpen] = useState<boolean>(false);
  const imgUrl = '/assets/images/gift.jpg';
  const { rewardType } = props;
  const discountFixedAmount = props.discountFixedAmount.toLocaleString('de-DE');
  const handleCopy = () => {
    navigator.clipboard.writeText(props.couponCode || '');
    setClick('Copied');
  };
  const leftPromoCode = (rewardType) => {
    switch (rewardType) {
      case 'product':
        return (
          <div className="mb-1 benefit">
            <div className="discount">
              <img src={imgUrl} alt="coupon gift" className="img-fluid" width={60} height={60} />
            </div>
            <div className="suffix">{t('promoCodes:present')}</div>
          </div>
        );
      case 'discount':
        return (
          <div className="mb-1 benefit">
            <div className="discount">
              {props.discountType === 'percentage' && `- ${props.discount}%`}
              {props.discountType === 'fixed_amount' &&
                `- ${discountFixedAmount} ${t('common:vnd')}`}
              {/* <span className="unit">đ</span> */}
            </div>
            <div className="suffix">{t('promoCodes:discount')}</div>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <>
      <div className={`row no-gutters coupon coupon--${props.rewardType}`}>
        <div className="col-4 deal-info pr-3 d-flex flex-column justify-content-between align-items-center">
          {leftPromoCode(rewardType)}
          {props.couponDateFrom !== 'false' && (
            <div className="text-muted">{`HSD: ${props.couponDateFrom}`}</div>
          )}
        </div>
        <div className="col-7 justify-content-between text-center">
          <Tooltip title={props.couponName} placement="top">
            <div className="mb-2">
              <div className="coupon__amount text-max-2">{props.couponName}</div>
              <span>{props.couponDescription}</span>
            </div>
          </Tooltip>
          {props.couponCode !== 'false' && (
            <Tooltip title={click} placement="top-end">
              <span className="coupon__code mb-2" onClick={handleCopy}>
                {props.couponCode}
              </span>
            </Tooltip>
          )}

          <div className="coupon__button">
            <a href="/products" className="btn btn-primary btn-sm btn-block">
              {t('promoCodes:order_now')}
            </a>
          </div>
        </div>
        <div className="col-1 deal-info pr-3 d-flex flex-column justify-content-between align-items-center">
          <button onClick={() => setOpen(true)}>
            <i className="fa fa-info-circle info" aria-hidden="true" />
          </button>
          <PromocodeDetailDialog
            open={open}
            onClose={() => setOpen(false)}
            title={t('promoCodes:promocde_title')}
            id={props.id}
          />
        </div>
      </div>
    </>
  );
}
