import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';
import useDebounce from 'src/hooks/useDebounce';

import QuantityInput from '../../Form/QuantityInput';
import ConfirmDeleteItemModal from '../Cart/ConfirmDeleteItemModal';

type Props = {
  productId: number;
  productPrice: number;
  productName: string;
  productImg: string;
  available: boolean;
};

function ProductCardQuantityInput(props: Props) {
  const { productId, productPrice, productName, productImg, available } = props;

  const { t } = useTranslation(['errors', 'success', 'cart']);

  const { data: cart, addToCart, loading } = useCart();

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

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

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
      price: price,
      productId: id,
      productName: name,
      quantity: newQuantity || 0
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
    // Close delete modal
    setOpen(false);

    // Set quantity back to previous value in cart (because cart isn't updated)
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
        available={available}
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

      <LoadingBackdrop open={loading} />
    </>
  );
}

export default ProductCardQuantityInput;
