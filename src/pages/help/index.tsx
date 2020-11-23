import React, { useState } from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Contact from '../../components/Modules/FAQ/Contact';
import Questions from '../../components/Modules/FAQ/Questions';
import Sidebar from '../../components/Modules/FAQ/Sidebar';
import InputSearch from '../../components/Modules/News/InputSearch';
const Help = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container help">
        <div className="p-3">
          <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)} />
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-9 col-left__divider order-lg-2">
            <div className="wapper">
              <h3 className="news__title">{'Câu hỏi thường gặp : '}</h3>
              <div className="news__divider"></div>
              <Questions />
            </div>
          </div>

          <div className="col-sm-12 col-lg-3 order-lg-1">
            <div className="wrapper">
              <div className="row">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contact />

      <Footer />
    </>
  );
};

Help.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default Help;
