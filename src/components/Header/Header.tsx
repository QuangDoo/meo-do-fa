import { Dropdown, Menu } from 'antd'
import { TFunction } from 'next-i18next'
import React, { FC } from 'react'
import { i18n, withTranslation } from '../../../i18n'

type HeaderProps = {
  readonly t: TFunction
}

const languageNames = {
  vi: 'Tiếng Việt',
  en: 'English',
}

const LanguageDropdown = (
  <Menu>
    {Object.keys(languageNames).map((code) => (
      <Menu.Item key={code} onClick={() => i18n.changeLanguage(code)}>
        {languageNames[code]}
      </Menu.Item>
    ))}
  </Menu>
)

const Header: FC<HeaderProps> = ({ t }) => {
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
                    title={t('header:news')}
                  >
                    <i className="promotion-nav__icon icomoon icon-news" />
                    <span>{t('header:news')}</span>
                  </a>
                </li>

                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://career.thuocsi.vn/"
                    title={t('common:recruitment')}
                  >
                    <i className="promotion-nav__icon fas fa-briefcase" />
                    <span>{t('common:recruitment')}</span>
                  </a>
                </li>

                <li className="promotion-nav__item">
                  <a
                    className="promotion-nav__link"
                    href="https://supplier.thuocsi.vn/"
                    title={t('common:supply')}
                  >
                    <i className="promotion-nav__icon fas fa-store-alt" />
                    <span>{t('common:supply')}</span>
                  </a>
                </li>

                <li className="promotion-nav__item">
                  <Dropdown overlay={LanguageDropdown}>
                    <a className="promotion-nav__link" title={t('header:language')}>
                      <i className="promotion-nav__icon fas fa-language" />
                      <span>{t('header:language')}</span>
                    </a>
                  </Dropdown>
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
            <a
              className="btn btn-secondary btn-sm mr-2"
              href="https://thuocsi.vn/authentications/login"
            >
              {t('header:login')}
            </a>

            <a
              className="btn btn-primary btn-sm mr-2"
              href="https://thuocsi.vn/authentications/signup"
            >
              {t('header:register')}
            </a>
            <button className="btn btn-outline-primary btn-sm">{t('header:try')}</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default withTranslation(['header', 'common'])(Header)
