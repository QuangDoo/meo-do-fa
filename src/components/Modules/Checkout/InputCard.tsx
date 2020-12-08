import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  titleChildren?: React.ReactNode;
  hasRequired?: boolean;
  description?: string;
};

const InputCard = (props: Props): JSX.Element => {
  const { t } = useTranslation('checkout');
  return (
    <div className="elevated p-3 p-md-4">
      <div
        className={clsx('mb-4', props.hasRequired && 'd-flex justify-content-between flex-wrap')}>
        <h2 className="h6">{props.title}</h2>

        {props.hasRequired && (
          <small className="text-muted font-italic">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {t('delivery_require_1')} <span className="required"></span> {t('delivery_require_2')}
          </small>
        )}

        {props.description && (
          <small className="text-muted mb-2 d-inline-block">{t('can_not_find')}</small>
        )}
      </div>

      {props.children}
    </div>
  );
};

export default InputCard;
