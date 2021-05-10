import { useTranslation } from 'i18n';
import React from 'react';
import { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import TermPopup from 'src/components/Modules/TermPopup';
import withToken from 'src/utils/withToken';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import FAQ from '../../components/Modules/FAQ';
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail';

const HelpDetail = () => {
  const question = {
    id: 1,
    question: 'Hướng dẫn thanh toán qua ngân hàng',
    author: 'Hung Raco',
    postDate: 'Jan 21',
    status: 'Đã cập nhật',
    answer: `
    <p>Thanh toán bằng hình thức chuyển khoản thực hiện theo các bước sau:</p>
    <p>Sau khi bấm thanh toán đơn hàng và nhận được cuộc gọi xác nhận lại đơn hàng</p>
    <p><b>Bước 1: </b>Khách hàng thực hiện chuyển khoản đúng số tiền cần thanh toán cho tài khoản:</p>
    <ul style="padding-left: 1.5rem">
      <li>
        <p>Chủ tài khoản: Công Ty TNHH Dược Phẩm Dayton.</p>
        <p>Số tài khoản: 19036694554011</p>
        <p>Ngân Hàng:  Ngân hàng Techcombank - CN Thắng Lợi </p>
        <p>Nội dung chuyển khoản: Mã đơn hàng - Tên nhà thuốc</p>
      </li>
    </ul>
    <p><b>Bước 2: </b>Chụp hình lại biên lai chuyển khoản và gửi vào khung chatbox trên website</p>
    <p>Nhân viên xác nhận lại số tiền và lên đơn hàng cho khách</p>
    `
  };
  const { t } = useTranslation(['checkout']);
  return (
    <>
      <Head>
        <title>Medofa - {t('checkout:instruction')}</title>
      </Head>

      <TermPopup />

      <Header />

      <Nav />

      <FAQ>
        <QuestionDetail
          question={question.question}
          answer={question.answer}
          author={question.author}
          postDate={question.postDate}
          status={question.status}
        />
      </FAQ>

      <Footer />
    </>
  );
};

HelpDetail.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(HelpDetail);
