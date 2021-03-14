import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { DELETE_CARTS, DeleteCartData, DeleteCartsVars } from 'src/graphql/cart/deleteCarts';
import {
  GET_CART_BY_PRODUCT,
  GetCartByProductData,
  getCartByproductVars
} from 'src/graphql/cart/getCartByProduct';
import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

import CartItem from './CartItem';
import ConfirmModal from './ConfirmModal';

const MIN_PRICE = 1000000;

export default function CartPage() {
  const { data: cart, refetch: refetchCart } = useCart();

  const { t } = useTranslation(['cart', 'common', 'errors']);

  const [deleteAllIsOpen, setDeleteAllIsOpen] = useState<boolean>(false);

  const [checkboxCarts, setCheckboxCarts] = useState<string[]>([]);

  const router = useRouter();

  const { data: dataGetCartByProduct, loading: gettingCartByProducts } = useQueryAuth<
    GetCartByProductData,
    getCartByproductVars
  >(GET_CART_BY_PRODUCT, {
    variables: { ids: checkboxCarts }
  });

  const cartsCheckBox = dataGetCartByProduct?.getCartByProduct;

  const [createCounsel, { loading: creatingCounsel }] = useMutationAuth(CREATE_COUNSEL, {
    onCompleted: () => {
      router.push('/checkout');
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
  });

  console.log('cartsCheckBox', cartsCheckBox);
  useEffect(() => {
    if (checkboxCarts) return;

    refetchCart();
  }, [checkboxCarts]);

  const [deleteCarts, { loading: deletingCarts }] = useMutationAuth<
    DeleteCartData,
    DeleteCartsVars
  >(DELETE_CARTS, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      setDeleteAllIsOpen(false);

      refetchCart().then(() => {
        toast.success(t(`cart:delete_all_success`));
      });
    }
  });

  const handleCheckoutClick = () => {
    if (cart?.carts.length === 0) return;

    const cartIds = checkboxCarts;

    createCounsel({
      variables: {
        cartIds
      }
    });
  };

  const total = cartsCheckBox?.totalNetPrice - cartsCheckBox?.totalShippingFee;

  const checkoutDisabled = total < MIN_PRICE;

  const handleOpenDeleteAllModal = () => setDeleteAllIsOpen(true);

  const handleCloseDeleteAllModal = () => setDeleteAllIsOpen(false);

  const handleConfirmDeleteAll = () => {
    const ids = checkboxCarts;

    deleteCarts({
      variables: {
        ids
      }
    });
  };
  const addToCheckCart = (id: string) => {
    setCheckboxCarts((checkboxCarts) => [...checkboxCarts, id]);
  };

  const deleteToCheckCart = (id: string) => {
    setCheckboxCarts((checkboxCarts) => checkboxCarts.slice().filter((cart) => cart !== id));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxCarts(cart?.carts.map((item) => item._id));
    } else {
      setCheckboxCarts([]);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="cart">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('cart:cart')}</h1>
              <div className="d-flex align-items-center" hidden={total < MIN_PRICE}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={checkboxCarts?.length === cart?.carts?.length}
                />
                <h1 className="h5 ml-2">
                  {t('cart:select_all')}
                  {checkboxCarts?.length === cart?.carts?.length && `(${cart.totalQty})`}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9">
              {cart?.carts.map((item) => (
                <div key={item._id} className="elevated cart__items mb-3">
                  <CartItem
                    {...item}
                    addToCheckCart={() => addToCheckCart(item._id)}
                    deleteToCheckCart={() => deleteToCheckCart(item._id)}
                    checked={checkboxCarts.includes(item._id)}
                  />
                </div>
              ))}

              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-exclamation-circle mr-1" />
                {t('cart:back_to_products')} <a href="/products">{t('cart:products')}</a>
              </div>
            </div>
            <div className="col-12 col-md-3">
              {cart && (
                <div className="cart__info">
                  <div className="elevated row no-gutters mb-2">
                    <div className="col-md-12 col-lg-4 cart__info-quantity">
                      <div className="cart__info-item text-center">
                        <div className="mb-2">
                          <div>{t('cart:quantity')}</div>
                        </div>
                        <div className="cart__quantity text-secondary">
                          <b>{cartsCheckBox?.totalQty}</b>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8 cart__info-total">
                      <div className="cart__info-item text-center text-lg-right">
                        <div className="mb-2">
                          <div>{t('cart:total')}</div>
                        </div>
                        <div className="cart__total">
                          <PriceText price={total} />
                        </div>
                      </div>
                    </div>

                    <div hidden={total < MIN_PRICE} className="col-12 p-3 cart__info-total">
                      {t('cart:shipping_fee') + ': '}
                      <PriceText price={cartsCheckBox?.totalShippingFee} />
                    </div>

                    <div className="col-12">
                      <div className="cart__info-item">
                        <button
                          disabled={checkoutDisabled}
                          onClick={handleCheckoutClick}
                          className="btn btn-secondary btn-block text-small">
                          {t('cart:continue_payment')}
                        </button>

                        <div hidden={!checkoutDisabled} className="text-center mt-1">
                          {t('cart:minimum_price') + ' '}
                          <PriceText price={MIN_PRICE} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    hidden={cartsCheckBox?.carts?.length === 0}
                    onClick={handleOpenDeleteAllModal}
                    className="w-100 p-2 btn-link text-danger text-left">
                    <i className="fas fa-fw fa-trash mr-1" />
                    {t('cart:delete_all_button_label')}
                  </button>

                  <ConfirmModal
                    open={deleteAllIsOpen}
                    title={t('cart:remove_title')}
                    question={t('cart:remove_all_confirm')}
                    onClose={handleCloseDeleteAllModal}
                    onConfirm={handleConfirmDeleteAll}>
                    <LoadingBackdrop open={deletingCarts} />
                  </ConfirmModal>

                  <Link href="/products">
                    <a className="d-block">
                      <button className="w-100 p-2 btn-link text-left">
                        <i className="fas fa-fw fa-chevron-left mr-1" />
                        {t('cart:continue_order')}
                      </button>
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoadingBackdrop open={creatingCounsel} />
    </>
  );
}
