import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';

type Props = {
  type: 'invoice_exportable' | 'use_vietnamese' | 'only_medofa' | 'out_of_stocks';
};

const ProductBadge = (props: Props) => {
  const { t } = useTranslation(['productBadge']);

  return (
    <span className={clsx('badge badge-light display-status mr-1 mb-1', props.type)}>
      <i className="fas mr-1"></i>
      {t(`productBadge:${props.type}`)}
    </span>
  );
};

export default ProductBadge;
