import { useQuery } from '@apollo/client';
import configs from 'configs';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { useCheckboxCarts } from 'src/contexts/CheckboxCarts';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useDebounce from 'src/hooks/useDebounce';

import QuantityInput from '../../Form/QuantityInput';
import ConfirmDeleteItemModal from '../Cart/ConfirmDeleteItemModal';
type Props = {
  productId: number;
  productPrice: number;
  productName: string;
  productImg: string;
};

// const MIN_QUANTITY = configs.MIN_QUANTITY;
// const MAX_QUANTITY = configs.MAX_QUANTITY;

function ProductCardQuantityInput(props: Props) {
  const { productId, productPrice, productName, productImg } = props;

  const { t } = useTranslation(['errors', 'success', 'cart']);

  const { data: cart, refetch: refetchCart } = useCart();

  const thisProductInCart = cart?.carts.find((product) => product.productId === productId);

  const quantityInCart = thisProductInCart?.quantity || 0;

  const [quantity, setQuantity] = useState<number>(quantityInCart);

  const [open, setOpen] = useState<boolean>(false);

  const { data: configData } = useQuery<GetWebsiteConfigData, undefined>(GET_WEBSITE_CONFIG);

  const MIN_QUANTITY = parseInt(
    configData?.getWebsiteConfig.find((config) => config.key === 'MIN_QUANTITY').value
  );

  const MAX_QUANTITY = parseInt(
    configData?.getWebsiteConfig.find((config) => config.key === 'MAX_QUANTITY').value
  );

  const { checkboxCarts, setCheckboxCarts } = useCheckboxCarts();

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

  const [addToCart, { loading: addingToCart }] = useMutationAuth<AddToCartData, AddToCartVars>(
    ADD_TO_CART,
    {
      onCompleted: () => {
        refetchCart().then((data) => {
          // console.log(
          //   data.data.getCart?.carts.find((product) => product.productId === props.productId)?._id
          // );
          // console.log(cart?.carts.find((product) => product.productId === props.productId)?._id);
          setCheckboxCarts([
            ...checkboxCarts,
            data.data.getCart?.carts.find((product) => product.productId === props.productId)?._id
          ]);
          toast.success(t(`success:update_cart`));
        });
        // console.log(cart);
      },
      onError: (err) => {
        const errorCode = err.graphQLErrors?.[0]?.extensions?.code;

        setQuantity(quantityInCart);

        if (errorCode === 121) {
          toast.error(
            t(`errors:code_${errorCode}`, {
              name: err.graphQLErrors[0].message.replace(
                'Sales price changed. Please remove product on cart. Product: ',
                ''
              )
            })
          );
        } else {
          toast.error(t(`errors:code_${errorCode}`));
        }
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

    if (!newQuantity || newQuantity === 0) {
      setOpen(true);
      return;
    }

    addToCart({
      variables: {
        price: price,
        productId: id,
        productName: name,
        quantity: newQuantity || 0
      }
    });
  };

  const debouncedHandleUpdate = useDebounce(handleUpdate, 450);

  // Update quantity on blur
  const handleBlur = () => {
    handleUpdate(quantityInCart, quantity);
  };

  const handlePlusClick = () => {
    const newQuantity = Math.min(quantity + 1, MAX_QUANTITY);
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, productPrice, productId, productName);
  };

  const handleMinusClick = () => {
    const newQuantity = Math.max(quantity - 1, MIN_QUANTITY);
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, productPrice, productId, productName);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setQuantity(quantityInCart);
  };

  return (
    <>
      <QuantityInput
        quantity={quantity}
        setQuantity={setQuantity}
        onMinusClick={handleMinusClick}
        onPlusClick={handlePlusClick}
        onBlur={handleBlur}
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
      />

      <ConfirmDeleteItemModal
        title={t('cart:remove_title')}
        question={t('cart:remove_confirm')}
        open={open}
        onClose={handleCloseModal}
        cartId={thisProductInCart?._id}
        img={productImg}
        name={productName}
        price={productPrice}
      />

      <LoadingBackdrop open={addingToCart} />
    </>
  );
}

export default ProductCardQuantityInput;
