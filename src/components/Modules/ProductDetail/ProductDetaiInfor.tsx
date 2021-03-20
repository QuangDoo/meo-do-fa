import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import QuantityInput from 'src/components/Form/QuantityInput';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { ADD_TO_CART, AddToCartData, AddToCartVars } from 'src/graphql/cart/addToCart';
import { ProductDetails } from 'src/graphql/product/product.query';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useDebounce from 'src/hooks/useDebounce';

import ConfirmDeleteItemModal from '../Cart/ConfirmDeleteItemModal';
import LoginModal from '../LoginModal';
import ProductBadges from '../ProductCard/ProductBadges';

const MAX_QUANTITY = 100000;
const MIN_QUANTITY = 0;

const ProductDetailInfor = (props: ProductDetails) => {
  const token = useToken();

  const { t } = useTranslation(['common', 'productDetail', 'success']);

  const [quantity, setQuantity] = useState<number>(1);

  const [open, setOpen] = useState<boolean>(false);

  const handleMinusClick = () => {
    const newQuantity = Math.min(quantity - 1, MIN_QUANTITY);
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, props.list_price, props.id, props.name);
  };

  const handlePlusClick = () => {
    const newQuantity = Math.min(quantity + 1, MAX_QUANTITY);
    setQuantity(newQuantity);
    debouncedHandleUpdate(quantityInCart, newQuantity, props.list_price, props.id, props.name);
  };

  const handleCloseModal = () => setOpen(false);

  const categories = props?.categories?.slice().filter((c) => c.id !== null) || [];

  const { data: cart, refetch: refetchCart } = useCart();

  const thisProductInCart = cart?.carts.find((product) => product.productId === props.id);

  const quantityInCart = thisProductInCart?.quantity || 0;

  useEffect(() => {
    if (!quantityInCart) return;

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
        const errorCode = err.graphQLErrors?.[0]?.extensions?.code;

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

  const router = useRouter();

  const handleBuyNow = () => {
    addToCart({
      variables: {
        price: props.list_price,
        productId: props.id,
        productName: props.name,
        quantity: quantity
      }
    }).then(() => {
      router.push('/cart/?id_buy_now='+props.id);
    });
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      setOpen(true);
      return;
    }

    addToCart({
      variables: {
        price: props.list_price,
        productId: props.id,
        productName: props.name,
        quantity: quantity
      }
    });
  };

  const handleUpdate = (
    prevQuantity: number,
    newQuantity: number,
    price: number = props.list_price,
    id: number = props.id,
    name: string = props.name
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

  const hasBadge =
    props?.is_quick_invoice || props?.is_exclusive || props?.is_vn || !props?.is_available;

  return (
    <div className="row">
      <LoadingBackdrop open={addingToCart} />

      <div className="col-12">
        <h1 className="h3 text-capitalize">{props.name}</h1>

        {hasBadge && (
          <div className="product__status mt-3">
            <ProductBadges product={props} />
          </div>
        )}

        {props?.packing_unit && <div className="text-muted">{props.packing_unit}</div>}

        {!token ? (
          <LoginModal />
        ) : (
          <div className="d-flex flex-column mt-3">
            <div className="product__price-group mb-1">
              <span className="product__price">
                <PriceText price={props.sale_price} />
              </span>

              {props.discount_percentage > 0 && (
                <span className="product__old-price ml-3">
                  <PriceText price={props.old_price} />
                </span>
              )}
            </div>

            {props.is_quick_invoice && (
              <small className="text-muted"> ({t('productDetail:vat_included')})</small>
            )}
          </div>
        )}

        {props?.manufacturer?.id !== null && (
          <div className="mt-3">
            <div className="product__info-label">{t('productDetail:manufacturer')}</div>
            <div className="text-capitalize">
              <Link href={`/products?manufacturer=${props.manufacturer?.id}`}>
                <a>{props.manufacturer?.name}</a>
              </Link>
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <div className="mt-3">
            <div className="product__info-label">{t('productDetail:category')}</div>

            {categories.map((item, index, arr) => (
              <>
                <Link href={`/products?category=${item.id}`}>
                  <a className="text-capitalize" key={index}>
                    {item.name}
                  </a>
                </Link>
                {index < arr.length - 1 && '; '}
              </>
            ))}
          </div>
        )}

        {!!token && (
          <React.Fragment>
            <div className="col-6 px-0 mt-3">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                min={quantityInCart ? 0 : 1}
                max={MAX_QUANTITY}
                onPlusClick={handlePlusClick}
                onMinusClick={handleMinusClick}
                onBlur={handleBlur}
              />

              <ConfirmDeleteItemModal
                title={t('cart:remove_title')}
                question={t('cart:remove_confirm')}
                open={open}
                onClose={handleCloseModal}
                cartId={thisProductInCart?._id}
                img={props.image_256}
                name={props.name}
                price={props.sale_price}
              />
            </div>

            <div className="d-flex mt-3 w-100">
              <button className="btn btn-primary mr-2" onClick={handleBuyNow}>
                {t('productDetail:buy_now')}
              </button>

              <button className="btn btn-secondary" onClick={handleAddToCart}>
                {t(`productDetail:${quantityInCart ? 'update_cart' : 'add_to_cart'}`)}
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
