import Link from 'next/link'
import React from 'react'
import { Button } from '../Shared/Button'

const Header: React.FC = () => {
  return (
    <header className="header bg-white">
      <nav className="promotion-nav">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-end">
              <ul className="nav">
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://news.thuocsi.vn/"
                    title="Tin tức"
                  >
                    <i className="promotion-nav__icon icomoon icon-news" />
                    <span>Tin tức</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://career.thuocsi.vn/"
                    title="Tuyển dụng | Recruitment"
                  >
                    <i className="promotion-nav__icon fas fa-briefcase" />
                    <span>Tuyển dụng | Recruitment</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://supplier.thuocsi.vn/"
                    title="Đăng ký bán hàng cùng thuocsi"
                  >
                    <i className="promotion-nav__icon fas fa-store-alt" />
                    <span>Đăng ký bán hàng cùng thuocsi</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-3">
            <div className="buymed-logo">
              <a href="/" title="thuocsi.vn">
                <img
                  alt="thuocsi.vn"
                  className="img-fluid lozad"
                  title="thuocsi.vn"
                  src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg"
                />
              </a>
            </div>
          </div>
          <div>
            <a
              className="btn btn-secondary btn-sm mr-2"
              href="https://thuocsi.vn/authentications/login"
            >
              Đăng nhập
            </a>
            <a
              className="btn btn-primary btn-sm mr-2"
              href="https://thuocsi.vn/authentications/signup"
            >
              Tạo tài khoản
            </a>
            <button className="btn btn-outline-primary btn-sm">Dùng Thử</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
