import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import React from 'react';

// BadgeType must be the same as badge types in productBadge.json translation file
export type BadgeType = 'is_quick_invoice' | 'is_vn' | 'is_exclusive';

interface ProductBadgeProps extends WithTranslation {
  type: BadgeType;
}

const classMapping: Record<BadgeType, string> = {
  is_quick_invoice: 'invoice_exportable',
  is_vn: 'use_vietnamese',
  is_exclusive: 'only_medofa'
};

const ProductBadge = (props: ProductBadgeProps) => {
  const { t } = props;

  return (
    <span className={clsx('badge badge-light display-status mr-1 mb-1', classMapping[props.type])}>
      <i className="fas mr-1"></i>
      {t(`productBadge:${props.type}`)}
    </span>
  );
};

export default withTranslation('productBadge')(ProductBadge);
