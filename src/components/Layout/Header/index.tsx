import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';
import LanguagePicker from 'src/components/Layout/Header/LanguagePicker';
import LoginModal from 'src/components/Modules/LoginModal';
import RegisterModal from 'src/components/Modules/RegisterModal';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

import RightSideUser from './RightSideUser';
import SearchBar from './SearchBar';

type HeaderProps = {
  readonly t: TFunction;
};

const Header = ({ t }: HeaderProps): JSX.Element => {
  const isLoggedIn = useIsLoggedIn();

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
                    href="https://news.medofa.vn/"
                    title={t('header:news')}>
                    <i className="promotion-nav__icon icomoon icon-news" />
                    <span>{t('header:news')}</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://career.medofa.vn/"
                    title={t('common:recruitment')}>
                    <i className="promotion-nav__icon fas fa-briefcase" />
                    <span>{t('common:recruitment')}</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://supplier.medofa.vn/"
                    title={t('common:supply')}>
                    <i className="promotion-nav__icon fas fa-store-alt" />
                    <span>{t('common:supply')}</span>
                  </a>
                </li>

                <li className="promotion-nav__item">
                  <LanguagePicker />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <img
        alt="medofa.vn"
        className="img-fluid logo-header"
        title="medofa.vn"
        src="/assets/images/logo2.png"
      />
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="mr-3">
            <div className="rockland-logo">
              <a href="/" title="medofa.vn">
                <img
                  alt="medofa.vn"
                  className="img-fluid logo-header"
                  title="medofa.vn"
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default withTranslation(['header', 'common'])(Header);
