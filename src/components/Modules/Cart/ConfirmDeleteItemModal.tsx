import React from 'react';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';

import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

type Props = Omit<ConfirmModalProps, 'children' | 'onConfirm'> & {
  img: string;
  name: string;
  price: number;
  cartId: string;
};

export default function ConfirmDeleteItemModal(props: Props) {
  const { cartId, img, name, price, ...rest } = props;

  const { deleteCart, loading } = useCart();

  const handleConfirmDelete = () => {
    props.onClose();

    deleteCart({
      _id: cartId
    });
  };

  return (
    <React.Fragment>
      <ConfirmModal onConfirm={handleConfirmDelete} {...rest}>
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

      <LoadingBackdrop open={loading} />
    </React.Fragment>
  );
}
