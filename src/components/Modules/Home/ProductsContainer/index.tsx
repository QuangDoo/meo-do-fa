import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { FC } from 'react';
import Button from 'src/components/Form/Button';

type ProductsContainerProps = {
  deals?: boolean;
  className?: string;
  seeMoreUrl?: string;
  title: string;
};

export const ProductsContainer: FC<ProductsContainerProps> = (props) => {
  const dealsClass = props.deals ? 'deals' : '';
  const { t } = useTranslation(['common']);
  return (
    <section className={`py-5 ${dealsClass} ${props.className}`}>
      <div className="container">
        <div className="text-center mb-4">
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
