import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { Fragment } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  titleChildren?: React.ReactNode;
  hasRequired?: boolean;
  description?: string;
};

const InputCard = (props: Props) => {
  const { t } = useTranslation('checkout');
  return (
    <Fragment>
      <div className="h4 mb-3">{props.title}</div>

      <div className="elevated p-3">
        {props.hasRequired ||
          (!!props.description && (
            <div
              className={clsx(
                'mb-4',
                props.hasRequired && 'd-flex justify-content-between flex-wrap'
              )}>
              {props.hasRequired && (
                <small className="text-muted font-italic">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {t('delivery_require_1')} <span className="required"></span>{' '}
                  {t('delivery_require_2')}
                </small>
              )}

              {props.description && (
                <small className="text-muted mb-2 d-inline-block">{props.description}</small>
              )}
            </div>
          ))}

        {props.children}
      </div>
    </Fragment>
  );
};

export default InputCard;
