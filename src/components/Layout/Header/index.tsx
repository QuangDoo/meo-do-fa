import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';
import LanguagePicker from 'src/components/Layout/Header/LanguagePicker';
import ForgotPasswordModal from 'src/components/Modules/ForgotPasswordModal';
import LoginModal from 'src/components/Modules/LoginModal';
import RegisterModal from 'src/components/Modules/RegisterModal';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

import RightSideUser from './RightSideUser';
import SearchBar from './SearchBar';

const Header = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <header className="header bg-white">
      <nav className="promotion-nav">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-end">
              <ul className="nav">
                {/* <li className="promotion-nav__item">
                  <a className="promotion-nav__link" href="/news" title={t('header:news')}>
                    <i className="promotion-nav__icon icomoon icon-news" />
                    <span>{t('header:news')}</span>
                  </a>
                </li> */}
                {/* <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://career.medofa.com/"
                    title={t('common:recruitment')}>
                    <i className="promotion-nav__icon fas fa-briefcase" />
                    <span>{t('common:recruitment')}</span>
                  </a>
                </li> */}
                {/* <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://supplier.medofa.com/"
                    title={t('common:supply')}>
                    <i className="promotion-nav__icon fas fa-store-alt" />
                    <span>{t('common:supply')}</span>
                  </a>
                </li> */}

                <li className="promotion-nav__item">
                  <LanguagePicker />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center justify-content-between">
          <div className="mr-sm-3 flex-shrink-0 mb-3 mb-sm-0 mr-0">
            <div className="rockland-logo">
              <a href="/" title="Medofa.com">
                <img
                  alt="Medofa.com"
                  className="img-fluid logo-header"
                  title="Medofa.com"
                  src="/assets/images/logo2.png"
                />
              </a>
            </div>
          </div>

          {isLoggedIn ? (
            <>
              <SearchBar />

              <RightSideUser />
            </>
          ) : (
            <div>
              <LoginModal />

              <RegisterModal />

              <ForgotPasswordModal />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withTranslation(['header', 'common'])(Header);
