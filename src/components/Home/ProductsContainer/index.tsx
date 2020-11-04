import React, { FC } from 'react';

import Button from '../../Form/Button';

type ProductsContainerProps = {
  deals?: boolean;
  className?: string;
  seeMoreUrl: string;
  title: string;
};

export const ProductsContainer: FC<ProductsContainerProps> = (props) => {
  const dealsClass = props.deals ? 'deals' : '';

  return (
    <section className={`py-5 container-fluid ${dealsClass} ${props.className}`}>
      <div className="home__container">
        <div className="text-center mb-4">
          <h2 className={props.deals && 'text-white'}>{props.title}</h2>
        </div>

        <div className="mb-4">{props.children}</div>

        <div className="text-center">
          <Button
            variant={props.deals ? 'outline-light' : 'outline-primary'}
            className={props.deals ? 'btn-transparent' : 'btn-white'}>
            Xem tất cả
          </Button>
        </div>
      </div>
    </section>
  );
};
