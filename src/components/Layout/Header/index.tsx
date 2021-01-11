import Link from 'next/link';
import React from 'react';
import LanguagePicker from 'src/components/Layout/Header/LanguagePicker';
import ForgotPasswordModal from 'src/components/Modules/ForgotPasswordModal';
import LoginModal from 'src/components/Modules/LoginModal';
import RegisterModal from 'src/components/Modules/RegisterModal';
import { useToken } from 'src/contexts/Token';

import RightSideUser from './RightSideUser';
import SearchBar from './SearchBar';

const Header = () => {
  const token = useToken();

  return (
    <header className="header bg-white">
      <nav className="promotion-nav">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-end">
              <ul className="nav">
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
              <Link href="/">
                <a title="Medofa.com">
                  <img
                    alt="Medofa.com"
                    className="img-fluid logo-header"
                    title="Medofa.com"
                    src="/assets/images/logo2.png"
                  />
                </a>
              </Link>
            </div>
          </div>

          {token ? (
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

export default Header;
