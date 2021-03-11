import { Menu } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';

import PathologyMenu from '../Modules/PathologyMenu';

const Nav = () => {
  const token = useToken();

  const { data: cart } = useCart();

  const totalQty = cart?.totalQty;

  const { t } = useTranslation(['navbar', 'errors', 'common']);

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

  return (
    <nav className="rockland-nav shrink header-menu">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <ul className="nav text-capitalize">
              {/* {categories.length !== 0 ? (
                <CategoryMenu />
              ) : (
                <li className="rockland-nav__item">
                  <Link href="/products">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fas fa-list-ul" />
                      <span className="rockland-nav__title">{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>
              )} */}
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
                        <i className="rockland-nav__icon fa fa-product-hunt" />
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
                      <a className="rockland-nav__link notification">
                        <ShoppingCartOutlinedIcon />
                        {totalQty > 0 && <span className="notification__counter">{totalQty}</span>}
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

                    {/* <Link href="/users/referrals">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="icomoon icon-share dropdown__item-icon" />
                        {t('navbar:introduce_friends')}
                      </a>
                    </Link> */}

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

                    <button
                      type="button"
                      className="dropdown__item dropdown__item-link w-100"
                      onClick={logOut}>
                      <i className="fas fa-sign-out-alt dropdown__item-icon" />
                      {t('navbar:logout')}
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
};

export default Nav;
