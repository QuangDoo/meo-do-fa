/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  let token = ''
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
    // console.log('Product card data:', props)
  }
  const [showDropDown, setShowDropDown] = useState(false)
  const wrapperRef = React.createRef()
  console.log('wrapperRef :>> ', wrapperRef.current)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropDown(false)
      } else setShowDropDown(!showDropDown)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])
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
                    title="Khuyến mãi"
                  >
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
              {!token ? (
                <ul className="nav align-items-center">
                  <li className="nav-item mr-4">
                    <a className="buymed-nav__link notification" href="/cart">
                      <i className="icomoon icon-local-mall buymed-nav__icon" />
                      <span className="notification__counter" id="cart_items_count">
                        21
                      </span>
                    </a>
                  </li>
                  <li className="nav-item" ref={wrapperRef}>
                    <div className="dropdown">
                      <i className="fa fa-bars buymed-nav__link" />
                      {showDropDown ? (
                        <div
                          className="dropdown-menu dropdown-menu-right show"
                          x-placement="bottom-end"
                          style={{
                            position: 'absolute',
                            willChange: 'transform',
                            top: '0px',
                            left: '0px',
                            transform: 'translate3d(-226px, 16px, 0px)',
                          }}
                        >
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
                                  <div
                                    className="text-secondary"
                                    data-target="user-data.loyaltyPoint"
                                  >
                                    0
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <hr className="my-2" />
                          <a
                            className="dropdown__item dropdown__item-link"
                            data-path="/my-account"
                            data-target="navigation.navLink"
                            href="/my-account"
                          >
                            <i className="far fa-user-circle dropdown__item-icon" />
                            Thông tin tài khoản
                          </a>
                          <a
                            className="dropdown__item dropdown__item-link active"
                            data-path="/my-orders"
                            data-target="navigation.navLink"
                            href="/my-orders"
                          >
                            <i className="icomoon icon-assignment dropdown__item-icon" />
                            Đơn hàng của tôi
                          </a>
                          <a
                            className="dropdown__item dropdown__item-link"
                            data-path="/users/referrals"
                            data-target="navigation.navLink"
                            href="/users/referrals"
                          >
                            <i className="icomoon icon-share dropdown__item-icon" />
                            Giới thiệu bạn bè
                          </a>
                          <a
                            className="dropdown__item dropdown__item-link"
                            data-path="/users/user-promo-codes"
                            data-target="navigation.navLink"
                            href="/users/user-promo-codes"
                          >
                            <i className="fas fa-tags dropdown__item-icon" />
                            Mã giảm giá của tôi
                          </a>
                          <a
                            className="dropdown__item dropdown__item-link"
                            data-path="/users/loyalty_points"
                            data-target="navigation.navLink"
                            href="/users/loyalty_points"
                          >
                            <i className="fas fa-hand-holding-usd dropdown__item-icon" />
                            Điểm tích lũy
                          </a>
                          <a
                            data-confirm="Bạn có chắc muốn đăng xuất?"
                            className="dropdown__item dropdown__item-link"
                            rel="nofollow"
                            data-method="delete"
                            href="/accounts/sign_out"
                          >
                            <i className="fas fa-sign-out-alt dropdown__item-icon" />
                            Đăng xuất
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="nav align-items-center">
                  <li className="nav-item mr-3">
                    <a className="buymed-nav__link">
                      <i className="fas fa-sign-in-alt buymed-nav__icon" />
                    </a>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
