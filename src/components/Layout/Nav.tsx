import { useQuery } from '@apollo/client';
import { Menu } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';
import { GET_WEBSITE_CONFIG, GetWebsiteConfigData } from 'src/graphql/configs/getWebsiteConfig';

import CategoryMenu from '../Modules/Navbar/CategoryMenu';
import CategorySpecialMenu from '../Modules/Navbar/CategorySpecialMenu';
import PathologyMenu from '../Modules/Navbar/PathologyMenu';
import HotTags from './HotTags';

const Nav = () => {
  const token = useToken();

  const { data: cart } = useCart();

  const { data: user } = useUser();

  const totalQty = cart?.totalQty;

  const { t } = useTranslation(['navbar', 'errors', 'common', 'cart']);

  const logOut = () => {
    cookies.remove('token');
    window.location.href = '/';
    // window.location.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  //const isSmallScreen = useMediaQuery('(max-width: 575px)');
  const { data: configData } = useQuery<GetWebsiteConfigData, undefined>(GET_WEBSITE_CONFIG);
  const SHOW_CATEGORY = configData?.getWebsiteConfig?.find(
    (config) => config.key === 'SHOW_CATEGORY'
  )?.value;

  const SHOW_CATEGORY_SPECIAL = configData?.getWebsiteConfig?.find(
    (config) => config.key === 'SHOW_CATEGORY_SPECIAL'
  )?.value;

  return (
    <nav className="rockland-nav shrink header-menu d-none d-sm-block">
      <div className="container custom-header-container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <ul className="nav text-capitalize custom-list-menu">
              {SHOW_CATEGORY === 'Y' ? (
                <CategoryMenu />
              ) : (
                <li className="rockland-nav__item">
                  <Link href="/products">
                    <a className="rockland-nav__link">
                      <img
                        className="nav__icon"
                        src="/assets/images/sanpham.png"
                        alt="icon_product"
                      />
                      <span className="rockland-nav__title">{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>
              )}
              {/* <li className="rockland-nav__item">
                <Link href="/products">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon fas fa-list-ul" />
                    <span className="rockland-nav__title">{t('navbar:category')}</span>
                  </a>
                </Link>
              </li> */}

              <li className="rockland-nav__item">
                <Link href="/deals-of-the-day">
                  <a className="rockland-nav__link-sale">
                    <img
                      className="nav__icon"
                      src="/assets/images/fLash-sale.gif"
                      alt="icon_giasochomnay"
                    />
                    <span className="rockland-nav__title_d">{t('navbar:deals_of_the_day')}</span>
                    <span className="rockland-nav__title_deal">{t('navbar:deals_price')}</span>
                    <span className="rockland-nav__title_deal">{t('navbar:deals_today')}</span>
                  </a>
                </Link>
              </li>

              <li className="rockland-nav__item">
                <Link href="/quick-order">
                  <a className="rockland-nav__link">
                    <img
                      className="nav__icon"
                      src="/assets/images/dathangnhanh.png"
                      alt="icon_dathangnhanh"
                    />
                    <span className="rockland-nav__title">{t('navbar:fast_order')}</span>
                  </a>
                </Link>
              </li>

              <li className="d-none d-sm-block rockland-nav__item dropdown dropdown-nav">
                <div data-toggle="dropdown" data-hover="dropdown">
                  <a className="rockland-nav__link">
                    <img
                      className="nav__icon"
                      src="/assets/images/khuyenmai.png"
                      alt="icon_khuyenmai"
                    />
                    <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                  </a>
                </div>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link href="/promo-codes">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/magiamgia.png"
                          alt="icon_makhuyenmai"
                        />
                        <span>{t('navbar:promo_code')}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/deals">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/sanphamkhuyenmai.png"
                          alt="icon_sanphamkhuyenmai"
                        />
                        <span>{t('navbar:promo_products')}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/promotions">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/chuongtrinhkhuyenmai.png"
                          alt="icon_chuongtrinhkhuyenmai"
                        />
                        <span>{t('navbar:promotions')}</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="d-block d-sm-none rockland-nav__item dropdown dropdown-nav">
                <div data-toggle="dropdown" data-hover="dropdown">
                  <a className="rockland-nav__link">
                    <img
                      className="nav__icon"
                      src="/assets/images/khuyenmai.png"
                      alt="icon_khuyenmai"
                    />
                    <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                  </a>
                </div>
                <ul className="dropdown-menu dropdown-menu-mobile">
                  <li className="dropdown-item">
                    <Link href="/promo-codes">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/magiamgia.png"
                          alt="icon_makhuyenmai"
                        />
                        <span>{t('navbar:promo_code')}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/deals">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/sanphamkhuyenmai.png"
                          alt="icon_sanphamkhuyenmai"
                        />
                        <span>{t('navbar:promo_products')}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/promotions">
                      <a className="dropdown-item-text p-0">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/chuongtrinhkhuyenmai.png"
                          alt="icon_chuongtrinhkhuyenmai"
                        />
                        <span>{t('navbar:promotions')}</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              {user?.account_type === 'DISTRIBUTER' && SHOW_CATEGORY_SPECIAL === 'Y' ? (
                <CategorySpecialMenu />
              ) : (
                <PathologyMenu />
              )}

              <li className="rockland-nav__item">
                <Link href="/ingredients">
                  <a className="rockland-nav__link">
                    <img
                      className="nav__icon"
                      src="/assets/images/hoatchat.png"
                      alt="icon_hoatchat"
                    />
                    <span className="rockland-nav__title">{t('navbar:ingredient')}</span>
                  </a>
                </Link>
              </li>
            </ul>

            {token && (
              <div className="header-right flex-shrink-0">
                <ul className="nav align-items-start">
                  <li className="nav-item custom-nav-item-cart">
                    <Link href="/cart">
                      <a className="rockland-nav__link notification" title={t('cart:cart')}>
                        <ShoppingCartOutlinedIcon />
                        <span className="extraCart"> {t('cart:cart')} </span>
                        {totalQty > 0 && <span className="notification__counter">{totalQty}</span>}
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item ml-4">
                    <button className="rockland-nav__link" onClick={openMenu}>
                      <i className="fas fa-bars rockland-nav__icon m-0" />
                    </button>
                  </li>

                  <Menu
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    keepMounted
                    onClose={closeMenu}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}>
                    {/* <div className="dropdown__item py-0">
                      <div className="d-flex justify-content-between">
                        <div className="text-left mr-3">
                          <small className="text-muted">{t('navbar:e_wallet')}</small>
                          <div className="text-primary">
                            0<span className="unit">{t('common:vnd')}</span>
                          </div>
                        </div> 

                        <div>
                          <a href="/users/loyalty_points">
                            <small className="text-muted">{t('navbar:reward_points')}</small>
                            <div className="text-secondary">0</div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="my-2" /> */}

                    <div>
                      <Link href="/my-account">
                        <a className="dropdown__item dropdown__item-link">
                          <img
                            className="nav__icon_nav"
                            src="/assets/images/thongtintaikhoan.png"
                            alt="icon_acc_info"
                          />
                          {t('navbar:account_info')}
                        </a>
                      </Link>
                    </div>

                    <div className="d-block d-sm-none">
                      <Link href="/change-password">
                        <a className="dropdown__item dropdown__item-link">
                          <i className="fa fa-key dropdown__item-icon" />
                          {t('navbar:change_password')}
                        </a>
                      </Link>
                    </div>

                    <div>
                      <Link href="/my-orders">
                        <a className="dropdown__item dropdown__item-link">
                          <img
                            className="nav__icon_nav"
                            src="/assets/images/donhangcuatoi.png"
                            alt="icon_my_order"
                          />
                          {t('navbar:my_order')}
                        </a>
                      </Link>
                    </div>

                    {/* <Link href="/users/referrals">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="icomoon icon-share dropdown__item-icon" />
                        {t('navbar:introduce_friends')}
                      </a>
                    </Link> */}

                    <div>
                      <Link href="/my-promo-codes">
                        <a className="dropdown__item dropdown__item-link">
                          <img
                            className="nav__icon_nav"
                            src="/assets/images/magiamgia.png"
                            alt="my_promo_code"
                          />
                          {t('navbar:my_promo_code')}
                        </a>
                      </Link>
                    </div>

                    <Link href="/loyalty-points">
                      <a className="dropdown__item dropdown__item-link">
                        <img
                          className="nav__icon_nav"
                          src="/assets/images/diemtichluy.png"
                          alt="loyalty_points"
                        />
                        {t('navbar:loyalty_points')}
                      </a>
                    </Link>

                    <button
                      type="button"
                      className="dropdown__item dropdown__item-link w-100"
                      onClick={logOut}>
                      <img
                        className="nav__icon_nav"
                        src="/assets/images/dangxuat.png"
                        alt="logout"
                      />
                      {t('navbar:logout')}
                    </button>
                  </Menu>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* hot tags */}
        <HotTags />
      </div>
    </nav>
  );
};

export default Nav;
