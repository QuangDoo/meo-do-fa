import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUser } from 'src/contexts/User';

import LoginModal from '../LoginModal';

function MobileNavbar() {
  const { t } = useTranslation(['navbar']);
  const [open, setOpen] = useState(false);
  const { data: user } = useUser();

  const logOut = () => {
    setOpen(false);
    cookies.remove('token');
    window.location.href = '/';
  };

  return (
    <div className="mobile-menu">
      <div>
        <button onClick={() => setOpen(true)}>
          <MenuIcon className="mobile-menu-icon" />
        </button>
      </div>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="mobile-menu-main">
          {user ? (
            <Link href="/my-account">
              <div className="mobile-menu-user mobile-menu-user-link">
                <i className="far fa-user-circle mr-3" />
                <a className="mobile-menu-user-link">{user.name}</a>
                <i className="fas fa-chevron-right mobile-menu-user-link ml-3"></i>
              </div>
            </Link>
          ) : (
            <div className="mobile-menu-user">
              <div>
                <div className="mobile-menu-user-link">{t('header:login_title')}</div>
                <div className="text-center mt-3">
                  <LoginModal />
                </div>
              </div>
            </div>
          )}
          <div className="mobile-menu-content">
            <div>
              <ul className="nav text-capitalize mobile-menu-list">
                {user && (
                  <>
                    <li className="mobile-menu-list-item">
                      <Link href="/my-orders">
                        <a className="mobile-menu-link">
                          <i className="icomoon icon-assignment mr-2" />
                          {t('navbar:my_order')}
                        </a>
                      </Link>
                    </li>
                    <li className="mobile-menu-list-item">
                      <Link href="/my-promo-codes">
                        <a className="mobile-menu-link">
                          <i className="fas fa-tags mr-2" />
                          {t('navbar:my_promo_code')}
                        </a>
                      </Link>
                    </li>
                    <li className="mobile-menu-list-item">
                      <Link href="/loyalty-points">
                        <a className="mobile-menu-link">
                          <i className="fas fa-hand-holding-usd mr-2" />
                          {t('navbar:loyalty_points')}
                        </a>
                      </Link>
                    </li>

                    <hr className="hr my-3" />
                  </>
                )}

                <li className="mobile-menu-list-item">
                  <Link href="/products">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon fas fa-list-ul" />
                      <span>{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/deals-of-the-day">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon icomoon icon-product" />
                      <span>{t('navbar:deals_of_the_day')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/quick-order">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon icomoon icon-quick-order" />
                      <span>{t('navbar:fast_order')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/pathological">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon fas fa-laptop-medical" />
                      <span>{t('navbar:pathological')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/ingredients">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon icomoon icon-ingredients" />
                      <span>{t('navbar:ingredient')}</span>
                    </a>
                  </Link>
                </li>

                <hr className="hr my-3" />

                <div className="mobile-menu-item-title">{t('navbar:promotion')}</div>
                <li className="mobile-menu-list-item">
                  <Link href="/promo-codes">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon fas fa-tag" />
                      <span>{t('navbar:promo_code')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/deals">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon fas fa-gifts" />
                      <span>{t('navbar:promo_products')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/promotions">
                    <a className="mobile-menu-link">
                      <i className="rockland-nav__icon fab fa-product-hunt" />
                      <span>{t('navbar:promotions')}</span>
                    </a>
                  </Link>
                </li>

                <hr className="hr my-3" />
              </ul>
            </div>

            {user && (
              <>
                <hr className="hr my-3" />
                <button type="button" className="mobile-menu-list-item pb-3" onClick={logOut}>
                  <i className="fas fa-sign-out-alt dropdown__item-icon" />
                  {t('navbar:logout')}
                </button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileNavbar;
