import { TFunction } from 'next-i18next';
import React from 'react';

import { withTranslation } from '../../../i18n';
import Login from '../Login';
import Register from '../Register';
import LanguagePicker from './LanguagePicker';

type HeaderProps = {
  readonly t: TFunction;
};

const Header = ({ t }: HeaderProps): JSX.Element => {
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
                    title={t('header:news')}>
                    <i className="promotion-nav__icon icomoon icon-news" />
                    <span>{t('header:news')}</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://career.thuocsi.vn/"
                    title={t('common:recruitment')}>
                    <i className="promotion-nav__icon fas fa-briefcase" />
                    <span>{t('common:recruitment')}</span>
                  </a>
                </li>
                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://supplier.thuocsi.vn/"
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
            <Login />

            <Register />

            <button className="btn btn-outline-primary btn-sm">{t('header:try')}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default withTranslation(['header', 'common'])(Header);
