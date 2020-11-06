import Link from 'next/link';
import React from 'react';

import QuantityInput from '../QuantityInput';

type PropsType = {
  name: string;
  price: number;
};
const ProductDetailInfor = (props: PropsType): JSX.Element => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  return (
    <div className="col-md-8">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 text-capitalize">{props.name}</h1>
          <div className="product__status mb-1" />
        </div>
        <div className="col-md-7">
          <div className="mb-3">
            <small className="text-muted">Hộp 5 vỉ x 10 viên </small>
          </div>
          <div className="mb-3">
            <small className="text-muted">
              <span className="mr-3">
                <i className="far fa-eye mr-1" />
                <strong>7</strong>lượt xem
              </span>
              <span>
                <i className="icomoon icon-shopping mr-1" />
                <strong>0</strong> lượt mua trong 24 giờ qua
              </span>
            </small>
          </div>
          <hr />
          <div className="mb-3">
            {!token ? (
              <Link href="/login">
                <a className="btn btn-sm btn-secondary" data-modal="true">
                  Đăng nhập để xem giá
                </a>
              </Link>
            ) : (
              <div className="d-flex align-items-center flex-wrap justify-content-between mb-4">
                <div>
                  <div className="product__price-group">
                    <span className="product__price">
                      {props.price}
                      <span className="unit">đ</span>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="price-feedback" data-controller="price-feedback">
                    <small>Bạn thấy giá này:</small>
                    <br />
                    <button
                      className="btn btn-sm btn-outline-primary mr-1 js-price-feedback"
                      data-action="price-feedback#feedbackPrice"
                      data-feedback-type="high"
                      data-product-id={12799}
                      data-target="price-feedback.feedbackBtn">
                      <i className="fas fa-thumbs-down mr-1" />
                      Cao
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary js-price-feedback"
                      data-action="price-feedback#feedbackPrice"
                      data-feedback-type="normal"
                      data-product-id={12799}
                      data-target="price-feedback.feedbackBtn">
                      <i className="fas fa-thumbs-up mr-1" />
                      Hợp lý
                    </button>
                  </div>
                </div>
                <QuantityInput quantity={0} size="large" />
              </div>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div className="product__suppliers">
            <p>
              Hệ thống sẽ chọn nhà cung cấp tốt nhất cho bạn.
              <a data-modal="true" href="/terms-and-condition">
                Điều Khoản Sử Dụng
              </a>
            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              Đăng ký bán hàng cùng thuocsi.vn
              <Link href="/register">
                <a>Đăng ký</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailInfor;
