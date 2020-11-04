import React from 'react';

import CartItem from '../components/Cart/CartItem';
import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import PageLayout from '../components/layout/PageLayout';
import { Nav } from '../components/Nav';

function Cart(): JSX.Element {
  const cartItem = [
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      oldPrice: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      image: 'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
      important: false
    },
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      oldPrice: 123456,
      image: 'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
      important: false
    },
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      oldPrice: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      limit: true,
      image: 'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
      important: false
    }
  ];
  const totalQuantity = cartItem.reduce((current, total) => {
    return current + total.quantity;
  }, 0);
  const totalAfterDiscount = cartItem.reduce((current, total) => {
    return current + total.quantity * total.price;
  }, 0);
  const totalBeforeDiscount = cartItem.reduce((current, total) => {
    return current + total.quantity * total.oldPrice;
  }, 0);
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <div className="cart" data-target="cart.cart">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="h3">Giỏ hàng</h1>
              <small className="text-danger">
                <i className="fas fa-exclamation-circle mr-1" />
                Lưu ý: Giỏ hàng có sản phẩm khuyến mãi. Sau khi thanh toán, đơn hàng sẽ không thể
                chỉnh sửa được.
              </small>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-star text-warning mr-1" />
                Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt
                nhiều cái cũng tính là 1)
              </div>
              <div
                className="elevated cart__items mb-3"
                data-action
                data-target="cart.items"
                data-url="/api/cart_data/cart_items?page=1">
                {cartItem.map((item, index) => (
                  <CartItem key={index} {...item} />
                ))}
              </div>
              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-exclamation-circle mr-1" />
                Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang{' '}
                <a href="/quick-order">Đặt hàng nhanh</a>
              </div>
              <div className="elevated p-3">
                <div className="mb-3">
                  <h2 className="h6">Ghi chú khác</h2>
                  <div className="text-muted">
                    <label htmlFor="note">
                      Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên
                      dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
                    </label>
                  </div>
                  <textarea
                    name="note"
                    id="note"
                    rows={4}
                    placeholder="Ghi chú của khách hàng"
                    className="form-control"
                    data-target="cart.note"
                    defaultValue={''}
                  />
                </div>
                <div className="w-100 text-right">
                  <button className="btn btn-secondary" data-action="cart#updateNote">
                    Cập nhật ghi chú
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="cart__info">
                <div className="elevated row no-gutters mb-3">
                  <div className="col-md-12 col-lg-4 cart__info-quantity">
                    <div className="cart__info-item text-center">
                      <div className="mb-2">
                        <small>Số lượng</small>
                      </div>
                      <div className="cart__quantity text-secondary">
                        {totalQuantity}
                        {/* <b data-target="cart.cartQty">57</b> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-8 cart__info-total">
                    <div className="cart__info-item text-center text-lg-right">
                      <div className="mb-2">
                        <small>Tổng tiền</small>
                      </div>
                      <div className="cart__total" data-target="cart.cartTotal">
                        {totalAfterDiscount.toLocaleString('de-DE')} <span className="unit">đ</span>
                      </div>
                      <div className="cart__old-total" data-target="cart.cartOldTotal">
                        {totalBeforeDiscount.toLocaleString('de-DE')}{' '}
                        <span className="unit">đ</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 cart__info-promo">
                    <div className="cart__info-item d-flex justify-content-between align-items-center">
                      <i className="fas fa-tags mr-3" />
                      <a
                        className="cart__info-promo-code flex-grow-1 ins-init-condition-tracking"
                        data-modal="true"
                        href="/cart/promo-codes">
                        NEWBEE100K
                      </a>
                      <i
                        className="fas fa-trash cart-item__remove"
                        data-action="click->cart#removePromoCode"
                        data-id={150759}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="cart__info-item">
                      <a
                        className="btn btn-secondary btn-block"
                        data-action="cart#proceedToCheckout"
                        data-target="cart.submit"
                        href="/checkout">
                        Tiếp tục thanh toán
                      </a>
                    </div>
                  </div>
                </div>
                <a href="/quick-order">&lt;&lt; Tiếp tục đặt hàng</a>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      <Footer />
    </>
  );
}

export default Cart;
