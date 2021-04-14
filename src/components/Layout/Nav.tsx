/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Menu } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import LanguagePicker from 'src/components/Layout/Header/LanguagePicker';
import { useCart } from 'src/contexts/Cart';
import { useModalControlDispatch } from 'src/contexts/ModalControl';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';

import PathologyMenu from '../Modules/PathologyMenu';
import HotTags from './HotTags';
const Nav = () => {
  const { openModal } = useModalControlDispatch();

  const { data: user } = useUser();

  const token = useToken();

  const { data: cart } = useCart();

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

  // const { data: categoriesData } = useQuery<GetCategoriesLevelData, undefined>(
  //   GET_CATEGORIES_LEVEL,
  //   {
  //     onError: (error) => {
  //       toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
  //     }
  //   }
  // );

  // const categories = categoriesData?.getCategoriesLevel || [];
  function handleClick() {
    const a = document.getElementById('1');
    a.classList.toggle('displayMenu');
  }
  function handlePromotion() {
    const a = document.getElementById('2');
    a.classList.toggle('showSubPromotion');
  }
  function handlePromotion2() {
    const a = document.getElementById('3');
    a.classList.toggle('showSubPromotion');
  }
  function handleAcount() {
    const a = document.getElementById('4');
    a.classList.toggle('showSubPromotion');
  }
  function OffMenuMobile() {
    const a = document.getElementById('1');
    a.classList.remove('displayMenu');
  }
  return (
    <div>
      <div>
        <div className="nav-mb mobile-responsive menu-mobile" onClick={handleClick}>
          <i className="fas fa-list-ul" />
        </div>

        <div className="nav-mb mr-2 flex-shrink-0 mb-3 mb-lg-0 mr-0 logo-mobile">
          <div className="rockland-logo">
            <Link href="/">
              <a title="Medofa.com">
                <img
                  alt="Medofa.com"
                  className="img-fluid logo-header d-block mx-auto logo-img"
                  title="Medofa.com"
                  src="/assets/images/logo2.png"
                />
              </a>
            </Link>
          </div>
        </div>

        {token && (
          <div className="nav-mb Cart mobile-responsive">
            <Link href="/cart">
              <a className="rockland-nav__link notification" title={t('cart:cart')}>
                <ShoppingCartOutlinedIcon />
                {totalQty > 0 && <span className="notification__counter">{totalQty}</span>}
              </a>
            </Link>
          </div>
        )}
      </div>
      <nav className="rockland-nav shrink header-menu offMenu" id="1">
        <div className="container back_ground">
          <div className="row">
            {!token && (
              <div className="LoginInMenu">
                <button className="LoginInMenu-button" onClick={() => openModal('LOGIN')}>
                  <div className="LoginMenu-icon">
                    <i className="fas fa-sign-in-alt mr-1" />
                  </div>

                  <div className="LoginInMenu-title">
                    <div className="LoginInMenu-title1">{t('header:login')}</div>
                    <div className="LoginInMenu-title2">{t('header:title')}</div>
                  </div>
                </button>
              </div>
            )}
            {token && (
              <div className="LoginInMenu">
                <li className="rockland-nav__item">
                  <Link href="/my-account">
                    <a className="rockland-nav__link1">
                      <i className="rockland-nav__icon far fa-user" />
                      <span className="rockland-nav__title">{user?.name}</span>
                    </a>
                  </Link>
                </li>
              </div>
            )}

            <div className="col-12 d-flex align-items-center justify-content-between">
              <ul className="nav text-capitalize">
                <li className="rockland-nav__item">
                  <Link href="/products">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fas fa-list-ul" />
                      <span className="rockland-nav__title">{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>

                <li className="rockland-nav__item">
                  <Link href="/products">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fas fa-list-ul" />
                      <span className="rockland-nav__title">{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>

                <li className="rockland-nav__item">
                  <Link href="/deals-of-the-day">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon icomoon icon-product" />
                      <span className="rockland-nav__title">{t('navbar:deals_of_the_day')}</span>
                    </a>
                  </Link>
                </li>

                <li className="rockland-nav__item">
                  <Link href="/quick-order">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon icomoon icon-quick-order" />
                      <span className="rockland-nav__title">{t('navbar:fast_order')}</span>
                    </a>
                  </Link>
                </li>

                <li className="d-none d-sm-block rockland-nav__item dropdown dropdown-nav">
                  <div data-toggle="dropdown" data-hover="dropdown">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fab fa-hotjar" />
                      <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                    </a>
                  </div>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link href="/promo-codes">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fas fa-tag" />
                          <span>{t('navbar:promo_code')}</span>
                        </a>
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/deals">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fas fa-gifts" />
                          <span>{t('navbar:promo_products')}</span>
                        </a>
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/promotions">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fab fa-product-hunt" />
                          <span>{t('navbar:promotions')}</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="d-block d-sm-none rockland-nav__item dropdown dropdown-nav">
                  <div data-toggle="dropdown" data-hover="dropdown">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fab fa-hotjar" />
                      <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                    </a>
                  </div>
                  <ul className="dropdown-menu dropdown-menu-mobile">
                    <li className="dropdown-item">
                      <Link href="/promo-codes">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fas fa-tag" />
                          <span>{t('navbar:promo_code')}</span>
                        </a>
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/deals">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fas fa-gifts" />
                          <span>{t('navbar:promo_products')}</span>
                        </a>
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href="/promotions">
                        <a className="dropdown-item-text p-0">
                          <i className="rockland-nav__icon fab fa-product-hunt" />
                          <span>{t('navbar:promotions')}</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <PathologyMenu />

                <li className="rockland-nav__item">
                  <Link href="/ingredients">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon icomoon icon-ingredients" />
                      <span className="rockland-nav__title">{t('navbar:ingredient')}</span>
                    </a>
                  </Link>
                </li>
              </ul>

              {token && (
                <div className="header-right flex-shrink-0">
                  <ul className="nav align-items-center">
                    <li className="nav-item mr-4">
                      <Link href="/cart">
                        <a className="rockland-nav__link notification" title={t('cart:cart')}>
                          <ShoppingCartOutlinedIcon />
                          <span className="extraCart d-none d-sm-block "> {t('cart:cart')} </span>
                          {totalQty > 0 && (
                            <span className="notification__counter">{totalQty}</span>
                          )}
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
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
                            <i className="far fa-user-circle dropdown__item-icon" />
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
                            <i className="icomoon icon-assignment dropdown__item-icon" />
                            {t('navbar:my_order')}
                          </a>
                        </Link>
                      </div>
                    </Menu>

                    <div id="3" className="subPromotion offsubPromotion">
                      <ul className="subPromotion1">
                        <li className="menu-item">
                          <Link href="/promo-codes">
                            <a className="rockland-nav__link">
                              <i className=" fas fa-tag rockland-nav__icon" />
                              <span className="titleSubPromotion">{t('navbar:promo_code')}</span>
                            </a>
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/promo-codes">
                            <a className="rockland-nav__link">
                              <i className=" fas fa-gifts rockland-nav__icon" />
                              <span className="titleSubPromotion">
                                {t('navbar:promo_products')}
                              </span>
                            </a>
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/promo-codes">
                            <a className="rockland-nav__link">
                              <i className="fab fa-product-hunt rockland-nav__icon" />
                              <span className="titleSubPromotion">{t('navbar:promotions')}</span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              )}

              <PathologyMenu />
              <li className="rockland-nav__item">
                <Link href="/ingredients">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon icomoon icon-ingredients" />
                    <span className="rockland-nav__title">{t('navbar:ingredient')}</span>
                  </a>
                </Link>
              </li>
              <li className="rockland-nav__item language-mobile">
                <LanguagePicker></LanguagePicker>
              </li>
              {token && (
                <div className="mobile-responsive">
                  <li className="rockland-nav__item">
                    <div data-toggle="dropdown" data-hover="dropdown" onClick={handleAcount}>
                      <a className="rockland-nav__link">
                        <i className="fa fa-cogs rockland-nav__icon" aria-hidden="true"></i>
                        <span className="rockland-nav__title">
                          {t('navbar:account_management')}
                        </span>
                      </a>
                    </div>
                    <div id="4" className="subPromotion offsubPromotion">
                      <ul className="subPromotion1">
                        <li className="menu-item">
                          <Link href="/my-account">
                            <a className="rockland-nav__link ">
                              <i className="far fa-user-circle  rockland-nav__icon" />
                              <span className="rockland-nav__title">
                                {t('navbar:account_info')}
                              </span>
                            </a>
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/change-password">
                            <a className="rockland-nav__link ">
                              <i className="fa fa-key rockland-nav__icon" />
                              <span className="rockland-nav__title">
                                {t('navbar:change_password')}
                              </span>
                            </a>
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/my-orders">
                            <a className="rockland-nav__link ">
                              <i className="icomoon icon-assignment rockland-nav__icon" />
                              <span className="rockland-nav__title">{t('navbar:my_order')}</span>
                            </a>
                          </Link>
                        </li>
                        <li className="menu-item">
                          <Link href="/my-promo-codes">
                            <a className="rockland-nav__link">
                              <i className="fas fa-tags rockland-nav__icon" />
                              <span className="rockland-nav__title">
                                {t('navbar:my_promo_code')}
                              </span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
              )}
              {token && (
                <li className="mobile-responsive rockland-nav__item">
                  <button type="button" onClick={logOut}>
                    <a className="rockland-nav__link">
                      <i className="fas fa-sign-out-alt rockland-nav__icon" />
                      <span className="rockland-nav__title">{t('navbar:logout')}</span>
                    </a>
                  </button>
                </li>
              )}

              <div>
                <Link href="/my-promo-codes">
                  <a className="dropdown__item dropdown__item-link">
                    <i className="fas fa-tags dropdown__item-icon" />
                    {t('navbar:my_promo_code')}
                  </a>
                </Link>
              </div>

              {/* <Link href="/users/loyalty_points">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="fas fa-hand-holding-usd dropdown__item-icon" />
                        {t('navbar:cumulative_points')}
                      </a>
                    </Link> */}

              {/* hot tags */}
              <HotTags />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
