import { useQuery } from '@apollo/client';
import { Menu } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GET_ALL_CATEGORIES, GetAllCategoriesData } from 'src/graphql/category/category.query';
import useCountCart from 'src/hooks/useCountCart';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

const Nav = () => {
  const isLoggedIn = useIsLoggedIn();

  const router = useRouter();
  const { data: dataCount } = useCountCart();

  const totalQty = dataCount?.countCarts?.data;

  const { t } = useTranslation(['navbar']);

  const logOut = () => {
    localStorage.removeItem('token');
    router.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const { data: categoriesData } = useQuery<GetAllCategoriesData, undefined>(GET_ALL_CATEGORIES, {
    onError: (error) => {
      console.log('Get all categories error:', error);
    }
  });

  const categories = categoriesData?.getCategoriesAll || [];

  return (
    <nav className="rockland-nav shrink">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <ul className="nav text-capitalize">
              <li className="rockland-nav__item dropdown">
                <div data-toggle="dropdown" data-hover="dropdown">
                  <Link href="/products">
                    <a className="rockland-nav__link">
                      <i className="rockland-nav__icon fas fa-list-ul" />
                      <span className="rockland-nav__title">{t('navbar:category')}</span>
                    </a>
                  </Link>
                </div>
                <ul className="dropdown-menu dropdown-list">
                  {categories
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(({ name, id }) => (
                      <li key={id} className="mb-2 dropdown-item">
                        <div className="dropdown">
                          <div data-toggle="dropdown" data-hover="dropdown">
                            <Link href={`/products?category=${id}`}>
                              <a className={clsx('products__filter-category')}>{name}</a>
                            </Link>
                          </div>
                          <div className="dropdown-menu dropdown-sub-menu">
                            <li className="mb-2 dropdown-item">
                              <div className="dropdown">
                                <div data-toggle="dropdown" data-hover="dropdown">
                                  <a href="/#">amet consectetur</a>
                                </div>
                                <div className="dropdown-menu dropdown-sub-menu">
                                  <a className="dropdown-item" href="/#">
                                    adipisicing elit
                                  </a>
                                </div>
                              </div>
                            </li>
                            <li className="mb-2 dropdown-item">
                              <a href="/#">Exercitationem autem</a>
                            </li>
                            <li className="mb-2 dropdown-item">
                              <a href="/#">Exercitationem autem</a>
                            </li>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="rockland-nav__item dropdown">
                <Link href="/products">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon icomoon icon-product" />
                    <span className="rockland-nav__title">{t('navbar:product')}</span>
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

              <li className="rockland-nav__item">
                <Link href="/quick-order">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon icomoon icon-quick-order" />
                    <span className="rockland-nav__title">{t('navbar:fast_order')}</span>
                  </a>
                </Link>
              </li>

              <li className="rockland-nav__item">
                <Link href="/deals">
                  <a
                    className="rockland-nav__link"
                    href="https://medofa.vn/deals"
                    title="Khuyến mãi">
                    <i className="rockland-nav__icon fab fa-hotjar" />
                    <span className="rockland-nav__title">{t('navbar:promotion')}</span>
                  </a>
                </Link>
              </li>

              <li className="rockland-nav__item">
                <Link href="/promo-codes">
                  <a className="rockland-nav__link">
                    <i className="rockland-nav__icon fas fa-tag" />
                    <span className="rockland-nav__title">{t('navbar:promo_code')}</span>
                    <span className="rockland-nav__tag badge badge-pill">{t('navbar:new')}</span>
                  </a>
                </Link>
              </li>
            </ul>

            {isLoggedIn && (
              <div className="header-right">
                <ul className="nav align-items-center">
                  <li className="nav-item mr-4">
                    <Link href="/cart">
                      <a className="rockland-nav__link notification">
                        <i className="icomoon icon-local-mall rockland-nav__icon" />

                        <span className="notification__counter">{totalQty}</span>
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="rockland-nav__link" onClick={openMenu}>
                      <i className="fas fa-bars rockland-nav__icon" />
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
                          <small className="text-muted">{t('navbar:e_wallet')}</small>
                          <div className="text-primary">
                            0<span className="unit">đ</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <a href="/users/loyalty_points">
                            <small className="text-muted">{t('navbar:reward_points')}</small>
                            <div className="text-secondary">0</div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="my-2" />

                    <a className="dropdown__item dropdown__item-link" href="/my-account">
                      <i className="far fa-user-circle dropdown__item-icon" />
                      {t('navbar:account_info')}
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/my-orders">
                      <i className="icomoon icon-assignment dropdown__item-icon" />
                      {t('navbar:my_order')}
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/users/referrals">
                      <i className="icomoon icon-share dropdown__item-icon" />
                      {t('navbar:introduce_friends')}
                    </a>

                    <a
                      className="dropdown__item dropdown__item-link"
                      href="/users/user-promo-codes">
                      <i className="fas fa-tags dropdown__item-icon" />
                      {t('navbar:my_promo_code')}
                    </a>

                    <a className="dropdown__item dropdown__item-link" href="/users/loyalty_points">
                      <i className="fas fa-hand-holding-usd dropdown__item-icon" />
                      {t('navbar:cumulative_points')}
                    </a>

                    <button className="dropdown__item dropdown__item-link w-100" onClick={logOut}>
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
