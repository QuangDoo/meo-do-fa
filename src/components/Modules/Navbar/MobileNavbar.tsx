import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { i18n, useTranslation } from 'i18n';
import cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';
import { useUser } from 'src/contexts/User';

import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

export type LanguageCode = 'vi' | 'en';

export const languageNames: Record<LanguageCode, string> = {
  vi: 'Tiếng Việt',
  en: 'English'
};

function MobileNavbar() {
  const { t } = useTranslation(['navbar']);
  const [open, setOpen] = useState(false);
  const { data: user } = useUser();

  const onLanguageClick = (code) => {
    i18n.changeLanguage(code);
  };

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
                  <RegisterModal />
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
                          <img
                            className="nav__icon"
                            src="/assets/images/donhangcuatoi.png"
                            alt="icon_donhangcuatoi"
                          />
                          {t('navbar:my_order')}
                        </a>
                      </Link>
                    </li>
                    <li className="mobile-menu-list-item">
                      <Link href="/my-promo-codes">
                        <a className="mobile-menu-link">
                          <img
                            className="nav__icon"
                            src="/assets/images/magiamgia.png"
                            alt="icon_magiamgiacuatoi"
                          />
                          {t('navbar:my_promo_code')}
                        </a>
                      </Link>
                    </li>
                    <li className="mobile-menu-list-item">
                      <Link href="/loyalty-points">
                        <a className="mobile-menu-link">
                          <img
                            className="nav__icon"
                            src="/assets/images/diemtichluy.png"
                            alt="icon_magiamgiacuatoi"
                          />
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
                      <img
                        className="nav__icon"
                        src="/assets/images/sanpham.png"
                        alt="icon_product"
                      />
                      <span>{t('navbar:category')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/deals-of-the-day">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/giasochomnay.png"
                        alt="icon_giasochomnay"
                      />
                      <span>{t('navbar:deals_of_the_day')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/quick-order">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/dathangnhanh.png"
                        alt="icon_dathangnhanh"
                      />
                      <span>{t('navbar:fast_order')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/pathological">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/tracuubenhly.png"
                        alt="icon_tracuubenhly"
                      />
                      <span>{t('navbar:pathological')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/ingredients">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/hoatchat.png"
                        alt="icon_hoatchat"
                      />
                      <span>{t('navbar:ingredient')}</span>
                    </a>
                  </Link>
                </li>

                <hr className="hr my-3" />

                <div className="mobile-menu-item-title">{t('navbar:promotion')}</div>
                <li className="mobile-menu-list-item">
                  <Link href="/promo-codes">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/magiamgia.png"
                        alt="icon_makhuyenmai"
                      />
                      <span>{t('navbar:promo_code')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/deals">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/sanphamkhuyenmai.png"
                        alt="icon_sanphamkhuyenmai"
                      />
                      <span>{t('navbar:promo_products')}</span>
                    </a>
                  </Link>
                </li>
                <li className="mobile-menu-list-item">
                  <Link href="/promotions">
                    <a className="mobile-menu-link">
                      <img
                        className="nav__icon"
                        src="/assets/images/chuongtrinhkhuyenmai.png"
                        alt="icon_chuongtrinhkhuyenmai"
                      />
                      <span>{t('navbar:promotions')}</span>
                    </a>
                  </Link>
                </li>
                <hr className="hr my-3" />
                <div className="mobile-menu-item-title">{t('navbar:language')}</div>
                <div className="change__language">
                  <div className="language">
                    <img src="/assets/images/vn.png" alt="vn" />
                    <a
                      onClick={() => onLanguageClick('vi')}
                      aria-hidden="true"
                      className="language-title">
                      {t('navbar:vn')}
                    </a>
                  </div>
                  <div className="language language-en">
                    <img src="/assets/images/en.png" alt="vn" />
                    <a
                      onClick={() => onLanguageClick('en')}
                      aria-hidden="true"
                      className="language-title">
                      {t('navbar:en')}
                    </a>
                  </div>
                </div>
              </ul>
            </div>
            {user && (
              <>
                <hr className="hr my-3" />
                <button type="button" className="mobile-menu-list-item pb-3" onClick={logOut}>
                  <i className="fas fa-sign-out-alt dropdown__item-icon logout__mobile" />
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
