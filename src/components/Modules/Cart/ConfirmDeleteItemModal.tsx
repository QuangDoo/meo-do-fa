import { useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import ConfirmModal, { ConfirmModalProps } from './ConfirmModal';

type Props = Omit<ConfirmModalProps, 'children' | 'onConfirm'> & {
  img: string;
  name: string;
  price: number;
  cartId: string;
};

export default function ConfirmDeleteItemModal(props: Props) {
  const { cartId, img, name, price, ...rest } = props;

  const { refetch: refetchCart } = useCart();

  const { t } = useTranslation(['errors', 'success', 'cart']);

  const [deleteCart, { loading: deletingCart }] = useMutationAuth<DeleteCartData, DeleteCartVars>(
    DELETE_CART,
    {
      onCompleted: () => {
        refetchCart().then(() => {
          toast.success(t(`success:delete_cart`));
        });
      },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const handleConfirmDelete = () => {
    props.onClose();

    deleteCart({
      variables: {
        _id: cartId
      }
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

      <LoadingBackdrop open={deletingCart} />
    </React.Fragment>
  );
}
