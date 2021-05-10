import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type ProductsContainerProps = {
  deals?: boolean;
  className?: string;
  seeMoreUrl?: string;
  title?: string;
  children: ReactNode;
  icon?: string;
};

export const ProductsContainer = (props: ProductsContainerProps) => {
  const { t } = useTranslation(['common']);

  return (
    <section className={clsx('pb-2', props.className, props.deals && 'deals', 'mt-4')}>
      <div className="container">
        <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center mr-3">
            {props.icon && <img className="nav__icon_nav" src={props.icon} alt="icon_home_page" />}
            <h2 className={props.deals && 'text-white'}>{props.title}</h2>
          </div>
          {props.seeMoreUrl && (
            <Link href={`${props.seeMoreUrl}`}>
              <a>
                <span className="d-none d-sm-inline">{t('common:see_more')} </span>
                <i className="fas fa-angle-double-right ml-2"> </i>
              </a>
            </Link>
          )}
        </div>

        <div className="test__container-home">{props.children}</div>

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
