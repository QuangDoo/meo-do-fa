import { useMediaQuery } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Link from 'next/link';
import React from 'react';
import LanguagePicker from 'src/components/Layout/Header/LanguagePicker';
import ForgotPasswordModal from 'src/components/Modules/ForgotPasswordModal';
import LoginModal from 'src/components/Modules/LoginModal';
import MobileNavbar from 'src/components/Modules/Navbar/MobileNavbar';
import RegisterModal from 'src/components/Modules/RegisterModal';
import { useToken } from 'src/contexts/Token';

import RightSideUser from './RightSideUser';
import SearchBar from './SearchBar';

const Header = () => {
  const token = useToken();
  const isSmallScreen = useMediaQuery('(max-width: 575px)');

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
        <div className="d-lg-flex align-items-center justify-content-between">
          <div className="mr-2 flex-shrink-0 mb-3 mb-lg-0 mr-0">
            {isSmallScreen ? (
              <div className="d-flex justify-content-between align-items-center">
                <MobileNavbar />
                <div className="rockland-logo">
                  <Link href="/">
                    <a title="Medofa.com">
                      <img
                        alt="Medofa.com"
                        className="img-fluid logo-header d-block mx-auto"
                        title="Medofa.com"
                        src="/assets/images/logo-md.png"
                      />
                    </a>
                  </Link>
                </div>
                {token ? (
                  <Link href="/cart">
                    <a className="mobile-menu-link">
                      <ShoppingCartOutlinedIcon />
                    </a>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div className="rockland-logo">
                <Link href="/">
                  <a title="Medofa.com">
                    <img
                      alt="Medofa.com"
                      className="img-fluid logo-header d-block mx-auto"
                      title="Medofa.com"
                      src="/assets/images/logo-md.png"
                    />
                  </a>
                </Link>
              </div>
            )}
          </div>

          {token ? (
            <>
              <SearchBar />

              <RightSideUser />
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center ">
              <div className="mobile-nav">
                <LoginModal />

                <RegisterModal />

                <ForgotPasswordModal />
              </div>
              
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
