import { useTranslation } from 'i18n';
import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import FAQ from '../../components/Modules/FAQ/index';
import Questions from '../../components/Modules/FAQ/Questions';
import withApollo from '../../utils/withApollo';

const Help = (): JSX.Element => {
  // const questions = [
  //   { id: 1, href: '/1', title: 'Hủy đơn hàng và khóa tài khoản' },
  //   { id: 2, href: '/1', title: 'Tại sao tôi đăng nhập bị lỗi?' },
  //   { id: 3, href: '/1', title: 'Tại sao tôi không đăng nhập được tài khoản?' },
  //   { id: 4, href: '/1', title: 'Quên mật khẩu đăng nhập' },
  //   { id: 5, href: '/1', title: 'Medofa bán những sản phẩm gì' },
  //   { id: 6, href: '/huong-dan-chuyen-khoan', title: 'Hướng dẫn chuyển khoản' },
  //   { id: 5, href: '/1', title: 'Medofa bán những sản phẩm gì' },
  //   { id: 5, href: '/1', title: 'Medofa bán những sản phẩm gì' }
  // ];

  const { t } = useTranslation(['common', 'help']);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <FAQ title={t('help:frequently_asked_questions')}>
        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
        {/* <>
          <div className="news__divider"></div>
          <Questions questions={questions} />
        </> */}
      </FAQ>

      <Footer />
    </>
  );
};

Help.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: false })(Help);
