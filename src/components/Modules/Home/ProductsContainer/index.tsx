import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import Button from 'src/components/Form/Button';

type ProductsContainerProps = {
  deals?: boolean;
  className?: string;
  seeMoreUrl?: string;
  title?: string;
  children: ReactNode;
  iconClass?: string;
};

export const ProductsContainer = (props: ProductsContainerProps) => {
  const { t } = useTranslation(['common']);

  return (
    <section className={clsx('py-5', props.className, props.deals && 'deals')}>
      <div className="container">
        <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center mr-3">
            {props.iconClass && <i className={clsx('mr-2 mb-0', props.iconClass)}></i>}
            <h2 className={props.deals && 'text-white'}>{props.title}</h2>
          </div>
          {props.seeMoreUrl && (
            <Link href={`${props.seeMoreUrl}`}>
              <a>
                <span className="hide-extra">{t('common:see_more')} </span>
                <i className="fas fa-angle-double-right ml-2"> </i>
              </a>
            </Link>
          )}
        </div>

        <div>{props.children}</div>

        {/* {props.seeMoreUrl && (
          <div className="text-center">
            <Link href={`${props.seeMoreUrl}`}>
              <Button
                variant={props.deals ? 'outline-light' : 'outline-primary'}
                className={props.deals ? 'btn-transparent' : 'btn-white'}>
                {t('common:see_all')}
              </Button>
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
};
