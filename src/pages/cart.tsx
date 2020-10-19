import React from 'react'
import Layout from '../components/Layout/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import { Nav } from '../components/Nav'
import CartItem from '../components/CartItem'

function Cart() {
  const cartItem = [
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      image:'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
    },
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      oldPrice: 123456,
      image:'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
    },
    {
      productName: 'phosphalugel boehringer ingelheim (h/26g)',
      price: 99600,
      id: 123,
      quantity: 3,
      description: 'Hộp 26 gói x 20gr',
      slug: 'phosphalugel-boehringer-ingelheim-h-26g',
      limit: true,
      image:'https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228',
    },
  ]
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
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
                data-url="/api/cart_data/cart_items?page=1"
              >
                {cartItem.map((item) => (
                  <CartItem {...item} />
                ))}
                <div
                  className="cart-item"
                  data-price={99600}
                  data-product-id={1768}
                  data-qty={12}
                  data-target="cart.item"
                >
                  <div className="row align-items-center">
                    <div className="col-7 d-flex align-items-center pl-4">
                      <div
                        className="cart-item__important-btn inactive"
                        data-action="click->cart#updateImportantButton"
                        data-item-id={3206540}
                      >
                        <i className="fas fa-star" />
                      </div>
                      <div
                        className="cart-item__image lozad mr-2 loaded"
                        data-background-image="https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228"
                        style={{
                          backgroundImage:
                            'url("https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228")',
                        }}
                        data-loaded="true"
                      />
                      <div>
                        <a
                          className="cart-item__name"
                          href="/products/phosphalugel-boehringer-ingelheim-h-26g"
                          title="phosphalugel boehringer ingelheim (h/26g)"
                        >
                          phosphalugel boehringer ingelheim (h/26g)
                        </a>
                        <div className="cart-item__package">
                          <small>Hộp 26 gói x 20gr</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-5 d-flex justify-content-between align-items-center">
                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {' '}
                            <span className="cart-item__price">
                              99.600<span className="unit">đ</span>
                            </span>{' '}
                            <span className="cart-item__old-price">
                              100.600<span className="unit">đ</span>
                            </span>
                          </div>
                          <div className="cart-item__qty">
                            <div
                              className="qty js-qty"
                              data-action="cart:reload@window->qty#renderHTML
qty:updating:1768@window->qty#showUpdating
qty:updated:1768@window->qty#showUpdated
qty:error:1768@window->qty#showError"
                              data-controller="qty"
                              data-qty-has-deal="true"
                              data-qty-price={99600}
                              data-qty-product-id={1768}
                              data-target="qty.qty"
                            >
                              <button
                                className="btn btn-sm qty__button qty__button--minus"
                                data-action="qty#updateQtyViaButton"
                                data-operation="-"
                                data-target="qty.qtyBtn"
                              >
                                <i className="fas fa-minus" />
                              </button>
                              <input
                                type="tel"
                                name="item_quantity"
                                defaultValue={12}
                                className="form-control px-1 no-spinner text-center qty__input"
                                inputMode="numeric"
                                min={1}
                                max={100000}
                                step={1}
                                autoComplete="off"
                                placeholder={'0'}
                                data-target="qty.qtyInput"
                                data-action="qty#updateQtyViaInput"
                              />
                              <button
                                className="btn btn-sm qty__button qty__button--plus"
                                data-action="qty#updateQtyViaButton"
                                data-operation="+"
                                data-target="qty.qtyBtn"
                              >
                                <i className="fas fa-plus" />
                              </button>
                              <div
                                className="qty__status text-center"
                                data-product-id={1768}
                                data-target="qty.status"
                              >
                                <small className="text-danger qty__status-updating">
                                  <i className="fas fa-spinner fa-spin mr-1" />
                                  Đang cập nhật
                                </small>
                                <small className="text-primary qty__status-updated">
                                  <i className="fas fa-check-circle mr-1" />
                                  Đã cập nhật
                                </small>
                                <small className="text-danger qty__status-error">
                                  <i className="fas fa-exclamation-circle mr-1" />
                                  Lỗi cập nhật
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div
                          className="cart-item__remove"
                          data-action="click->cart#removeCartItem"
                          data-remove-dialog="#cart-item-remove-dialog-3206540"
                        >
                          <i className="fas fa-trash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <small className="text-danger">
                        Số lượng có hạn! Hãy mau thanh toán để được hưởng giá ưu đãi.
                      </small>
                    </div>
                  </div>
                  <div className="d-none">
                    <div className="cart-item-remove-dialog" id="cart-item-remove-dialog-3206540">
                      <div className="container-fluid">
                        <div className="mb-3">Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?</div>
                        <div className="elevated p-3 d-flex">
                          <div className="mr-3">
                            <img
                              alt="phosphalugel boehringer ingelheim (h/26g)"
                              className="lozad img-fluid"
                              data-src="https://images.thuocsi.vn/FrWZN5xT53QQ8Cs66rKHT228"
                              src="https://assets.thuocsi.vn/assets/loader/spinner-loop-0323eb4af313e2798aa1311ac1a415c5739b445120b4d6f68a9dd22e085f40d5.gif"
                              width={100}
                            />
                          </div>
                          <div className="text-left">
                            <div className="cart-item__name mb-2">
                              phosphalugel boehringer ingelheim (h/26g)
                            </div>
                            <div className="cart-item__price">
                              99.600<span className="unit">đ</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <b data-target="cart.cartQty">57</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-8 cart__info-total">
                    <div className="cart__info-item text-center text-lg-right">
                      <div className="mb-2">
                        <small>Tổng tiền</small>
                      </div>
                      <div className="cart__total" data-target="cart.cartTotal">
                        13.565.360<span className="unit">đ</span>
                      </div>
                      <div className="cart__old-total" data-target="cart.cartOldTotal">
                        13.665.360<span className="unit">đ</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 cart__info-promo">
                    <div className="cart__info-item d-flex justify-content-between align-items-center">
                      <i className="fas fa-tags mr-3" />
                      <a
                        className="cart__info-promo-code flex-grow-1 ins-init-condition-tracking"
                        data-modal="true"
                        href="/cart/promo-codes"
                      >
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
                        href="/checkout"
                      >
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
      </Layout>
      <Footer />
    </>
  )
}

export default Cart
