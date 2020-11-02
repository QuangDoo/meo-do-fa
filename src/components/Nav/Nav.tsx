import Link from 'next/link';
import React from 'react';

export default function Nav(): JSX.Element {
  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <nav className="buymed-nav shrink">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <ul className="nav text-capitalize">
              <li className="buymed-nav__item">
                <Link href="/products">
                  <a className="buymed-nav__link">
                    <i className="buymed-nav__icon icomoon icon-product" />
                    <span className="buymed-nav__title">Sản Phẩm</span>
                  </a>
                </Link>
              </li>
              <li className="buymed-nav__item">
                <Link href="/ingredients">
                  <a className="buymed-nav__link">
                    <i className="buymed-nav__icon icomoon icon-ingredients" />
                    <span className="buymed-nav__title">Hoạt chất</span>
                  </a>
                </Link>
              </li>
              <li className="buymed-nav__item">
                <Link href="/quick-order">
                  <a className="buymed-nav__link">
                    <i className="buymed-nav__icon icomoon icon-quick-order" />
                    <span className="buymed-nav__title">Đặt hàng nhanh</span>
                  </a>
                </Link>
              </li>
              <li className="buymed-nav__item">
                <Link href="/deals">
                  <a
                    className="buymed-nav__link"
                    href="https://thuocsi.vn/deals"
                    title="Khuyến mãi">
                    <i className="buymed-nav__icon fab fa-hotjar" />
                    <span className="buymed-nav__title">Khuyến mãi</span>
                  </a>
                </Link>
              </li>
              <li className="buymed-nav__item">
                <Link href="/promo-codes">
                  <a className="buymed-nav__link">
                    <i className="buymed-nav__icon fas fa-tag" />
                    <span className="buymed-nav__title">Mã giảm giá</span>
                    <span className="buymed-nav__tag badge badge-pill">Mới</span>
                  </a>
                </Link>
              </li>
            </ul>
            <div className="buymed-search-container" />
            <div className="header-right header-right--guest">
              <ul className="nav align-items-center">
                <li className="nav-item mr-3">
                  <button className="buymed-nav__link" onClick={logOut}>
                    <i className="fas fa-sign-in-alt buymed-nav__icon" />
                  </button>
                </li>
                <li className="nav-item mr-3">
                  <a className="buymed-nav__link">
                    <i className="fas fa-user-md buymed-nav__icon" />
                  </a>
                </li>
                <li className="nav-item mr-3">
                  <a className="buymed-nav__link">
                    <i className="fas fa-eye buymed-nav__icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
