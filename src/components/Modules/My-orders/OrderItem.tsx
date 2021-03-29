import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { GetOrderList } from 'src/graphql/my-orders/getOrderList';

import ConfirmCancelOrder from './ConfirmCancelOrder';

const badges = {
  10: { color: 'info', text: 'wait_for_confirm' },
  15: { color: 'info', text: 'received' },
  20: { color: 'success', text: 'confirmed' },
  25: { color: 'danger', text: 'canceled' },
  30: { color: 'secondary', text: 'in_proceed' },
  40: { color: 'warning', text: 'delivering' },
  80: { color: 'primary', text: 'completed' }
};

type Props = GetOrderList & {
  onCancelCompleted: () => void;
};

export default function OrderItem(props: Props) {
  const { flag } = props;

  const { t } = useTranslation(['myOrders', 'errors']);

  const [open, setOpen] = useState(false);

  return (
    <div className="my-orders__item p-3 my-1">
      <div className="my-orders__info">
        <h2 className="h4 d-flex align-items-center">
          <Link href={`/my-orders/${props.orderNo}`}>
            <a className="mr-2">#{props.orderNo}</a>
          </Link>

          {flag && (
            <div className="my-orders__invoice">
              <span className={`badge badge-${badges[flag].color}`}>
                {t(`myOrders:${badges[flag].text}`)}
              </span>
            </div>
          )}
        </h2>

        <div className="my-orders__detail">
          <div>
            <span className="title">{t('myOrders:date_order')}</span>
            <span className="content">
              {new Date(props.date_order).toLocaleDateString('en-GB')}
            </span>
          </div>

          <div>
            <span className="title">{t('myOrders:expected_date')}</span>
            <span className="content">
              {new Date(props.expected_date).toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>
      </div>

      {[10, 15].includes(flag) && (
        <div className="my-orders__invoice">
          <button className="btn btn-outline-danger btn-sm" onClick={() => setOpen(true)}>
            {t('myOrders:cancel_order')}
          </button>
        </div>
      )}

      {[20, 30, 40, 80].includes(flag) && (
        <div className="my-orders__invoice">
          <a href="tel:1900232436" className="btn btn-outline-primary btn-sm">
            {t('myOrders:help')}
          </a>
        </div>
      )}

      <ConfirmCancelOrder
        open={open}
        onClose={() => setOpen(false)}
        orderNo={props.orderNo}
        onCancelCompleted={props.onCancelCompleted}
      />
    </div>
  );
}
