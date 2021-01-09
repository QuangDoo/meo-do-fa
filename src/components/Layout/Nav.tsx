import { useQuery } from '@apollo/client';
import { Menu } from '@material-ui/core';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useToken } from 'src/contexts/Token';
import { GET_CATEGORIES_LEVEL, GetCategoriesLevelData } from 'src/graphql/category/category.query';
import useCart from 'src/hooks/useCart';

import CategoryMenu from '../Modules/CategoryMenu';

const Nav = () => {
  const token = useToken();

  const { cart } = useCart();

  const router = useRouter();

  const totalQty = cart?.getCart.totalQty;

  const { t } = useTranslation(['navbar', 'errors', 'common']);

  const logOut = () => {
    cookies.remove('token');
    router.push('/');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const { data: categoriesData } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const categories = categoriesData?.getCategoriesLevel || [];

  return (
    <nav className="rockland-nav shrink header-menu">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <ul className="nav text-capitalize">
              {categories.length !== 0 ? (
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
              )}

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

              <li className="rockland-nav__item dropdown dropdown-nav">
                <div data-toggle="dropdown" data-hover="dropdown">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon fab fa-hotjar" />
                    <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                  </a>
                </div>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link href="/promo-codes">
                      <a>
                        <i className="rockland-nav__icon fas fa-tag" />
                        <span>{t('navbar:promo_code')}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link href="/deals">
                      <a>
                        <i className="rockland-nav__icon fas fa-gifts" />
                        <span>{t('navbar:promo_products')}</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="rockland-nav__item">
                <Link href="/pathological">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon fas fa-laptop-medical" />
                    <span className="rockland-nav__title">{t('navbar:pathological')}</span>
                  </a>
                </Link>
              </li>

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
                        <i className="icomoon icon-local-mall rockland-nav__icon" />
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

                    <Link href="/my-account">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="far fa-user-circle dropdown__item-icon" />
                        {t('navbar:account_info')}
                      </a>
                    </Link>

                    <div className="d-block d-sm-none">
                      <Link href="/change-password">
                        <a className="dropdown__item dropdown__item-link">
                          <i className="fa fa-key dropdown__item-icon" />
                          {t('navbar:change_password')}
                        </a>
                      </Link>
                    </div>

                    <Link href="/my-orders">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="icomoon icon-assignment dropdown__item-icon" />
                        {t('navbar:my_order')}
                      </a>
                    </Link>

                    {/* <Link href="/users/referrals">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="icomoon icon-share dropdown__item-icon" />
                        {t('navbar:introduce_friends')}
                      </a>
                    </Link> */}

                    <Link href="/my-promo-codes">
                      <a className="dropdown__item dropdown__item-link">
                        <i className="fas fa-tags dropdown__item-icon" />
                        {t('navbar:my_promo_code')}
                      </a>
                    </Link>

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
