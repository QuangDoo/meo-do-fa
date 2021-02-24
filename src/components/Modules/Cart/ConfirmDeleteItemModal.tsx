import React from 'react';
import PriceText from 'src/components/Form/PriceText';

import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

type Props = Omit<ConfirmModalProps, 'children'> & {
  img: string;
  name: string;
  price: number;
};

export default function ConfirmDeleteItemModal(props: Props) {
  const { img, name, price, ...rest } = props;

  return (
    <ConfirmModal {...rest}>
      <div className="elevated p-3 d-flex">
        <div className="mr-3">
          <img
            alt=""
            className="lozad img-fluid loaded"
            src={img || '/assets/images/no_images.jpg'}
            width={100}
          />
        </div>

        <div className="text-left">
          <div className="cart-item__name mb-2">{name}</div>

          <div className="cart-item__price">
            <PriceText price={price} />
          </div>
        </div>
      </div>
    </ConfirmModal>
  );
}
