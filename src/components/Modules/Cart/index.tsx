import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { useCart } from 'src/contexts/Cart';
import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import CartItem from './CartItem';

const minPrice = 1000000;

export default function CartPage() {
  const { data: cart } = useCart();

  const { t } = useTranslation(['cart', 'common', 'errors']);

  const router = useRouter();

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

  const handleCheckoutClick = () => {
    if (cart?.carts.length === 0) return;

    createCounsel({
      variables: {
        cartIds: cart?.carts.map((i) => i._id)
      }
    });
  };

  console.log('cart', cart);

  const checkoutDisabled = cart?.totalNetPrice < minPrice;

  return (
    <>
      <div className="container py-5">
        <div className="cart">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('cart:cart')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9">
              {cart?.carts.map((item) => (
                <div key={item._id} className="elevated cart__items mb-3">
                  <CartItem {...item} />
                </div>
              ))}

              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-exclamation-circle mr-1" />
                {t('cart:back_to_products')} <a href="/products">{t('cart:products')}</a>
              </div>
            </div>
            <div className="col-12 col-md-3 col-lg-3">
              {cart && (
                <div className="cart__info">
                  <div className="elevated row no-gutters mb-3">
                    <div className="col-md-12 col-lg-4 cart__info-quantity">
                      <div className="cart__info-item text-center">
                        <div className="mb-2">
                          <div>{t('cart:quantity')}</div>
                        </div>
                        <div className="cart__quantity text-secondary">
                          <b>{cart?.totalQty}</b>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8 cart__info-total">
                      <div className="cart__info-item text-center text-lg-right">
                        <div className="mb-2">
                          <div>{t('cart:total')}</div>
                        </div>
                        <div className="cart__total">
                          <PriceText price={cart?.totalNetPrice} />
                        </div>
                      </div>
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
                          <PriceText price={minPrice} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="/products">&lt;&lt; {t('cart:continue_order')}</a>
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
