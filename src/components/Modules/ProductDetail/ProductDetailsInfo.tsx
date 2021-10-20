/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import QuantityInput from 'src/components/Form/QuantityInput';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';
import { GET_WISH_LIST, GetWishListData, GetWishListVar } from 'src/graphql/product/getWishList';
import {
  CreateWishProductData,
  CreateWishProductVars,
  LIKE_PRODUCT
} from 'src/graphql/product/likeProduct';
import { ProductDetail } from 'src/graphql/product/product.query';
import { useLazyQueryAuth, useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import useDebounce from 'src/hooks/useDebounce';

import ConfirmDeleteItemModal from '../Cart/ConfirmDeleteItemModal';
import LoginModal from '../LoginModal';
import ProductBadges from '../ProductCard/ProductBadges';

const ProductDetailInfor = (props: ProductDetail) => {
  const token = useToken();

  const router = useRouter();

  const { t } = useTranslation(['common', 'productDetail', 'success']);

  const { data: configData } = useQuery<GetWebsiteConfigData, undefined>(GET_WEBSITE_CONFIG);

  const MIN_QUANTITY = parseInt(
    configData?.getWebsiteConfig.find((config) => config.key === 'MIN_QUANTITY').value
  );

  const MAX_QUANTITY = parseInt(
    configData?.getWebsiteConfig.find((config) => config.key === 'MAX_QUANTITY').value
  );
  const SHOW_SOCIAL_SHARE = configData?.getWebsiteConfig.find(
    (config) => config.key === 'SHOW_SOCIAL_SHARE'
  )?.value;

  const [getWishList, { data: dataWishList, refetch: refechDataListWish }] = useLazyQueryAuth<
    GetWishListData,
    GetWishListVar
  >(GET_WISH_LIST, {
    variables: { page: 1, pageSize: 20 },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  useEffect(() => {
    if (!token) return;

    getWishList({
      variables: { page: 1, pageSize: 20 }
    });
  }, [token]);

  const isWishProduct = dataWishList?.getWishList.find((item) => item.id === props.id);

  const [likeProduct, { loading: loadingLike }] = useMutationAuth<
    CreateWishProductData,
    CreateWishProductVars
  >(LIKE_PRODUCT, {
    onCompleted: () => {
      {
        !isWishProduct
          ? toast.success(t('productDetail:like_product'))
          : toast.success(t('productDetail:unlike_product'));
      }
      refechDataListWish();
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);

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

  const { cart, buyNow, addToCart } = useCart();

  const thisProductInCart = cart?.carts.find((product) => product.productId === props.id);

  const quantityInCart = thisProductInCart?.quantity || 0;

  useEffect(() => {
    setQuantity(quantityInCart);
  }, [quantityInCart]);

  const handleBuyNow = () => {
    buyNow({
      price: props.list_price,
      productId: props.id,
      productName: props.name,
      quantity: quantity
    });
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      setOpen(true);
      return;
    }

    addToCart({
      price: props.list_price,
      productId: props.id,
      productName: props.name,
      quantity: quantity
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
      price: price,
      productId: id,
      productName: name,
      quantity: newQuantity || 0
    });
  };

  const debouncedHandleUpdate = useDebounce(handleUpdate, 450);

  const handleLikeProduct = () => {
    const { id, name } = props;
    likeProduct({
      variables: {
        productId: id,
        productName: name
      }
    });
  };

  // Update quantity on blur
  const handleBlur = () => {
    handleUpdate(quantityInCart, quantity);
  };

  const hasBadge =
    props?.is_quick_invoice || props?.is_exclusive || props?.is_vn || !props?.is_available;

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = 'https://sp.zalo.me/plugins/sdk.js';
  //   script.async = true;

  //   document.body.appendChild(script);
  // }, []);

  return (
    <div className="row">
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
        {props.max_qty_per_order > 0 && (
          <p className="text-danger d-block">
            {t('common:maximum_quantity')}: {props.max_qty_per_order} &nbsp;{t('common:product(s)')}
          </p>
        )}
        {!!token && (
          <React.Fragment>
            <div className="d-flex mt-3 w-100">
              <div className="d-flex">
                <QuantityInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  min={MIN_QUANTITY}
                  max={MAX_QUANTITY}
                  onPlusClick={handlePlusClick}
                  onMinusClick={handleMinusClick}
                  onBlur={handleBlur}
                  isAvailable={props.is_available}
                />

                {!isWishProduct ? (
                  <button className="heart-icon-wrap" onClick={handleLikeProduct}>
                    <img src="/assets/images/heart.png" alt="like-product" />
                  </button>
                ) : (
                  <button className="heart-icon-wrap" onClick={handleLikeProduct}>
                    <img src="/assets/images/redheart.png" alt="unlike-product" />
                  </button>
                )}
              </div>

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

              <button
                className="btn btn-secondary"
                disabled={quantity === 0 && quantityInCart === 0}
                onClick={handleAddToCart}>
                {t(`productDetail:${quantityInCart ? 'update_cart' : 'add_to_cart'}`)}
              </button>
            </div>
          </React.Fragment>
        )}

        {/* {props?.manufacturer?.id !== null && (
          <div className="mt-3">
            <div className="product__info-label">{t('productDetail:manufacturer')}</div>
            <div className="text-capitalize">
              <Link href={`/manufacturers/${props.manufacturer?.id}`}>
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
        )} */}
        {SHOW_SOCIAL_SHARE === 'Y' && (
          <>
            <FacebookShareButton url={`https://medofa.com/products/${props.slug}`}>
              <FacebookIcon size="2.5rem" />
            </FacebookShareButton>

            <button
              className="zalo-share-button ml-2"
              data-href={`https://medofa.com/products/${props.slug}`}
              data-oaid="3125746340374733717"
              data-layout="1"
              data-color="blue"
              data-customize={true}>
              <div className="social-share-button zalo-button">
                <img src="/assets/images/zalo-icon.png" alt="Zalo icon" />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductDetailInfor;
