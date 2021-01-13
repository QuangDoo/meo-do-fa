import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import Button from 'src/components/Form/Button';

type ProductsContainerProps = {
  deals?: boolean;
  className?: string;
  seeMoreUrl?: string;
  title: string;
  children: ReactNode;
};

export const ProductsContainer = (props: ProductsContainerProps) => {
  const { t } = useTranslation(['common']);

  return (
    <section className={clsx('py-5', props.className, props.deals && 'deals')}>
      <div className="container">
        <div className="mb-4">
          <h2 className={props.deals && 'text-white'}>{props.title}</h2>
        </div>

        <div className="mb-4">{props.children}</div>

        {props.seeMoreUrl && (
          <div className="text-center">
            <Link href="/deals">
              <Button
                variant={props.deals ? 'outline-light' : 'outline-primary'}
                className={props.deals ? 'btn-transparent' : 'btn-white'}>
                {t('common:see_all')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
