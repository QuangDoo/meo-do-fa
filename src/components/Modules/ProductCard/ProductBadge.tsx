import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import React from 'react';

// BadgeType must be the same as badge types in productBadge.json translation file
export type BadgeType =
  | 'invoice_exportable'
  | 'out_of_stocks'
  | 'only_thuocsi'
  | 'promotion'
  | 'flash_sale'
  | 'common'
  | 'change_style'
  | 'use_vietnamese'
  | 'close_date';

interface ProductBadgeProps extends WithTranslation {
  type: BadgeType;
  expirationDate?: string;
}

const ProductBadge = (props: ProductBadgeProps): JSX.Element => {
  const { t } = props;

  if (props.type === 'promotion')
    return <span className="badge badge-danger mr-2">{t('productBadge:promotion')}</span>;

  return (
    <span className={`badge badge-light display-status mr-1 mb-1 ${props.type}`}>
      <i className="fas mr-1"></i>
      {props.type === 'flash_sale' ? (
        <>
          <i className="fas fa-bolt text-secondary mr-1"></i>
          {t('productBadge:flash_sale')}
          <i className="fas fa-bolt text-secondary ml-1"></i>
        </>
      ) : props.type === 'close_date' ? (
        `${t('productBadge:close_date')}: ${props.expirationDate}`
      ) : (
        t(`productBadge:${props.type}`)
      )}
    </span>
  );
};

export default withTranslation('productBadge')(ProductBadge);
