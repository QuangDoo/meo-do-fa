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

  const { t } = useTranslation(['cart', 'common']);

  const router = useRouter();

  const [createCounsel, { loading: creatingCounsel }] = useMutationAuth(CREATE_COUNSEL, {
    onCompleted: () => {
      router.push('/checkout');
    },
    onError: (error) => {
      toast.error('Create counsel error: ' + error);
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
              {/* <small className="text-danger">
                <i className="fas fa-exclamation-circle mr-1" />
                Lưu ý: Giỏ hàng có sản phẩm khuyến mãi. Sau khi thanh toán, đơn hàng sẽ không thể
                chỉnh sửa được.
              </small> */}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9">
              {/* <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-star text-warning mr-1" />
                Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt
                nhiều cái cũng tính là 1)
              </div> */}
              <div className="elevated cart__items mb-3">
                {cart?.getCart.carts.map((item, index) => (
                  <CartItem
                    key={index}
                    _id={item._id}
                    image={item.product.image_512}
                    price={item.price}
                    standard_price={item.oldPrice}
                    productId={item.productId}
                    productName={item.productName}
                    quantity={item.quantity}
                    uom_name="Unit"
                  />
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
                        {/* <div className="cart__old-total">
                          90‰
                          <span className="unit">đ</span>
                        </div> */}
                      </div>
                    </div>
                    {/* <div className="col-12 cart__info-promo">
                      <div className="cart__info-item d-flex justify-content-between align-items-center">
                        <i className="fas fa-tags mr-3" />

                        <a
                          className="cart__info-promo-code flex-grow-1 ins-init-condition-tracking"
                          href="/cart/promo-codes">
                          Dùng mã khuyến mãi
                        </a>

                        {/* <i className="fas fa-trash cart-item__remove" /> */}
                    {/* </div> */}
                    {/* </div> */}

                    {cart?.getCart.totalPrice > 0 && (
                      <div className="col-12">
                        <div className="cart__info-item">
                          <a className="btn btn-secondary btn-block text-small">
                            <button onClick={handleCheckoutClick}>{t('continue_payment')}</button>
                          </a>
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
