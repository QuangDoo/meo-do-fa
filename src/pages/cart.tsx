// import { useMutation } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import PriceText from 'src/components/Form/PriceText';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Nav from 'src/components/Layout/Nav';
import CartItem from 'src/components/Modules/Cart/CartItem';
import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useCart from 'src/hooks/useCart';
import withApollo from 'src/utils/withApollo';

function Cart(): JSX.Element {
  const { cart, loading: loadingCart } = useCart();

  const { t } = useTranslation(['cart', 'common', 'errors']);

  const router = useRouter();

  const [createCounsel, { loading: creatingCounsel }] = useMutationAuth(CREATE_COUNSEL, {
    onCompleted: () => {
      router.push('/checkout');
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const handleCheckoutClick = () => {
    if (cart.getCart.carts.length === 0) return;

    createCounsel({
      variables: {
        cartIds: cart.getCart.carts.map((i) => i._id)
      }
    });
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <div className="container py-5">
        <div className="cart">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">{t('cart:cart')}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9">
              <div className="elevated cart__items mb-3">
                {cart?.getCart.carts.map((item) => (
                  <CartItem item={item} key={item._id} />
                ))}
              </div>
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
                          <b>{cart?.getCart.totalQty}</b>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8 cart__info-total">
                      <div className="cart__info-item text-center text-lg-right">
                        <div className="mb-2">
                          <div>{t('cart:total')}</div>
                        </div>
                        <div className="cart__total">
                          <PriceText price={cart?.getCart.totalPrice} />
                          <span className="unit">{t('common:vnd')}</span>
                        </div>
                      </div>
                    </div>

                    {cart?.getCart.totalPrice > 0 && (
                      <div className="col-12">
                        <div className="cart__info-item">
                          <button
                            onClick={handleCheckoutClick}
                            className="btn btn-secondary btn-block text-small">
                            {t('continue_payment')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <a href="/products">&lt;&lt; {t('cart:continue_order')}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <LoadingBackdrop open={creatingCounsel || loadingCart} />
    </>
  );
}

export default withApollo({ ssr: true })(Cart);
