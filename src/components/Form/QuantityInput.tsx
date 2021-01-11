import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { DELETE_CART, DeleteCartData, DeleteCartVars } from 'src/graphql/cart/deleteCart.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useDebounce from 'src/hooks/useDebounce';

import ConfirmDeleteModal from '../Modules/Cart/ConfirmDeleteModal';

type Props = {
  productId: number;
  productPrice: number;
  productName: string;
  productImg: string;
};

function QuantityInput(props: Props) {
  const { productId, productPrice, productName, productImg } = props;

  const { t } = useTranslation(['errors', 'success']);

  const { data: cart, refetch: refetchCart } = useCart();

  const thisProductInCart = cart?.carts.find((product) => product.productId === productId);

  const quantityInCart = thisProductInCart?.quantity || 0;

  const [quantity, setQuantity] = useState<number>(quantityInCart);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

  const [addToCart, { loading: addingToCart }] = useMutationAuth<AddToCartData, AddToCartVars>(
    ADD_TO_CART,
    {
      onCompleted: () => {
        refetchCart().then(() => {
          toast.success(t(`success:update_cart`));
        });
      },
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

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

  const handleUpdate = (
    prevQuantity: number,
    newQuantity: number,
    price: number = productPrice,
    id: number = productId,
    name: string = productName
  ) => {
    if (newQuantity === prevQuantity) {
      return;
    }

    if (newQuantity === 0) {
      setOpen(true);
      return;
    }

    addToCart({
      variables: {
        price: price,
        productId: id,
        productName: name,
        quantity: newQuantity
      }
    });
  };

  const debouncedHandleUpdate = useDebounce(handleUpdate, 450);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.target.value.replace(/\D/g, '');
    const newQuantity = +string || 0;
    setQuantity(newQuantity);
  };

  // Blur on enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  // Update quantity on blur
  const handleInputBlur = () => {
    handleUpdate(quantityInCart, quantity);
  };

  const handlePlusClick = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, productPrice, productId, productName);
  };

  const handleMinusClick = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, productPrice, productId, productName);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setQuantity(quantityInCart);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    deleteCart({
      variables: {
        _id: thisProductInCart._id
      }
    });
  };

  return (
    <>
      <div className="qty js-qty">
        <button className="btn btn-sm qty__button qty__button--minus" onClick={handleMinusClick}>
          <i className="fas fa-minus" />
        </button>

        <input
          type="tel"
          className="form-control px-1 no-spinner text-center qty__input"
          min={0}
          max={100000}
          value={quantity}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
        />

        <button className="btn btn-sm qty__button qty__button--plus" onClick={handlePlusClick}>
          <i className="fas fa-plus" />
        </button>
      </div>

      <ConfirmDeleteModal
        open={open}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        productName={productName}
        image={productImg}
        price={productPrice}
      />

      <LoadingBackdrop open={addingToCart || deletingCart} />
    </>
  );
}

export default QuantityInput;
