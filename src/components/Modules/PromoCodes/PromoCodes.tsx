import React from 'react';

export default function PromoCodes(props) {
  return (
    <div className="promo-codes py-5">
      <div className="container mb-3">
        <div className="row">
          <div className="col-12 mb-3">
            <h1>Mã giảm giá</h1>
            <p>Hướng dẫn sử dụng:</p>
            <ol className="pl-5">
              <li>
                <span>
                  <b>Đặt hàng: </b>
                  {`Vào trang `}
                  <a href="/quick-order">Đặt hàng nhanh</a>
                  {` hoặc `}
                  <a href="/products">Sản phẩm</a>
                  {` để đặt hàng`}
                </span>
              </li>
              <li>
                <span>
                  <b>Vào giỏ hàng: </b>
                  {`Vào trang `}
                  <a href="/cart">Giỏ hàng</a>
                  {`. Nhấn vào chữ "Dùng mã khuyến mãi"`}
                </span>
              </li>
              <li>
                <span>
                  <b>Dùng mã: </b>
                  {`Nhập mã muốn dùng vào ô tìm kiếm, hoặc, chọn trong danh sách mã. Rồi nhấn vào nút "Dùng ngay"`}
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-center">Dành riêng cho bạn</h2>
            <p>
              {`Tham gia chương trình `}
              <a href="/users/referrals">Giới thiệu bạn bè</a>
              {`, `}
              <a href="/users/loyalty_points">Đổi điểm tích luỹ</a>
              {` để nhận được code riêng`}
            </p>
          </div>
        </div>
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
}
