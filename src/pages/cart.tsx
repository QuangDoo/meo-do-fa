import { useMutation } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import CartItem from 'src/components/Modules/Cart/CartItem';
import { useCart } from 'src/contexts/Cart';
import { CREATE_COUNSEL } from 'src/graphql/order/order.mutation';
import withApollo from 'src/utils/withApollo';

function Cart(): JSX.Element {
  const { carts, totalQty, totalPrice, refetchCart } = useCart();

  useEffect(() => {
    refetchCart();
  }, []);

  const [createCounsel] = useMutation(CREATE_COUNSEL, {
    onError: (error) => {
      console.log('Create counsel error:', { error });
      toast.error('Create counsel error: ' + error);
    }
  });

  const handleCheckoutClick = () => {
    if (carts.length === 0) return;

    createCounsel({
      variables: {
        cardIds: carts.map((i) => i._id)
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
              <h1 className="h3">Giỏ hàng</h1>
              {/* <small className="text-danger">
                <i className="fas fa-exclamation-circle mr-1" />
                Lưu ý: Giỏ hàng có sản phẩm khuyến mãi. Sau khi thanh toán, đơn hàng sẽ không thể
                chỉnh sửa được.
              </small> */}
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              {/* <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-star text-warning mr-1" />
                Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt
                nhiều cái cũng tính là 1)
              </div> */}
              <div className="elevated cart__items mb-3">
                {carts.map((item, index) => (
                  <CartItem
                    key={index}
                    _id={item._id}
                    image=""
                    price={item.price}
                    standard_price={item.oldPrice}
                    productId={item.productId}
                    productName={item.productName}
                    quantity={item.quantity}
                    uom_name="Unit"
                    refetchCart={refetchCart}
                  />
                ))}
              </div>
              <div className="elevated text-muted p-3 mb-4">
                <i className="fas fa-exclamation-circle mr-1" />
                Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang{' '}
                <a href="/products">Sản phẩm</a>
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
                    defaultValue={''}
                  />
                </div>
                <div className="w-100 text-right">
                  <button className="btn btn-secondary">Cập nhật ghi chú</button>
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
                        <b>{totalQty}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-8 cart__info-total">
                    <div className="cart__info-item text-center text-lg-right">
                      <div className="mb-2">
                        <small>Tổng tiền</small>
                      </div>
                      <div className="cart__total">
                        {totalPrice} <span className="unit">đ</span>
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
                  <div className="col-12">
                    <div className="cart__info-item">
                      <a className="btn btn-secondary btn-block" href="/checkout">
                        <button onClick={handleCheckoutClick}> Tiếp tục thanh toán</button>
                      </a>
                    </div>
                  </div>
                </div>
                <a href="/products">&lt;&lt; Tiếp tục đặt hàng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(Cart);
