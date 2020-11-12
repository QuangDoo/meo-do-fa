import { Menu, MenuItem } from '@material-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

export default function Nav(): JSX.Element {
  const isLoggedIn = useIsLoggedIn();

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
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

            {isLoggedIn && (
              <div className="header-right">
                <ul className="nav align-items-center">
                  <li className="nav-item mr-3">
                    <button className="buymed-nav__link" onClick={logOut}>
                      <i className="fas fa-sign-in-alt buymed-nav__icon" />
                    </button>
                  </li>

                  <li className="nav-item mr-3">
                    <button className="buymed-nav__link" onClick={openMenu}>
                      <i className="fas fa-bars buymed-nav__icon" />
                    </button>
                  </li>

                  <Menu
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    keepMounted
                    onClose={closeMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}>
                    <div className="dropdown__item py-0">
                      <div className="d-flex justify-content-between">
                        <div className="text-left mr-3">
                          <small className="text-muted">Ví điện tử</small>
                          <div className="text-primary" data-target="user-data.wallet">
                            0<span className="unit">đ</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <a href="/users/loyalty_points">
                            <small className="text-muted">Điểm thưởng</small>
                            <div className="text-secondary" data-target="user-data.loyaltyPoint">
                              0
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="my-2" />

                    <a className="dropdown__item dropdown__item-link" href="/my-account">
                      <i className="far fa-user-circle dropdown__item-icon" />
                      Thông tin tài khoản
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/my-orders">
                      <i className="icomoon icon-assignment dropdown__item-icon" />
                      Đơn hàng của tôi
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/users/referrals">
                      <i className="icomoon icon-share dropdown__item-icon" />
                      Giới thiệu bạn bè
                    </a>

                    <a
                      className="dropdown__item dropdown__item-link"
                      href="/users/user-promo-codes">
                      <i className="fas fa-tags dropdown__item-icon" />
                      Mã giảm giá của tôi
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/users/loyalty_points">
                      <i className="fas fa-hand-holding-usd dropdown__item-icon" />
                      Điểm tích lũy
                    </a>

                    <button className="dropdown__item dropdown__item-link w-100" onClick={logOut}>
                      <i className="fas fa-sign-out-alt dropdown__item-icon" />
                      Đăng xuất
                    </button>
                  </Menu>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
