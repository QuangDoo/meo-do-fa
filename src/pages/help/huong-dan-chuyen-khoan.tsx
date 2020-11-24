import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail';
import FAQ from '../../components/Modules/FAQ'

const HelpDetail = (): JSX.Element => {
  const question = {
    id: 1,
    question: 'Hủy đơn hàng và khóa tài khoản Hủy đơn hàng và khóa tài khoản',
    author: 'Tam N Nguyen',
    postDate: 'Jan 21',
    status: 'Đã cập nhật',
    answer: `
    <p>Thanh toán bằng hình thức chuyển khoản thực hiện theo các bước sau:</p>
    <p>Sau khi bấm thanh toán đơn hàng và nhận được cuộc gọi xác nhận lại đơn hàng</p>
    <p><b>Bước 1: </b>Khách hàng thực hiện chuyển khoản đúng số tiền cần thanh toán cho tài khoản:</p>
    <ul style="padding-left: 1.5rem">
      <li>
        <p>Chủ tài khoản: Công Ty TNHH BuyMed.</p>
        <p>Số tài khoản: 19134543030020</p>
        <p>Ngân Hàng:  Techcombank chi nhánh Bắc Hải </p>
        <p>Nội dung chuyển khoản: Tên Nhà Thuốc - Mã đơn hàng</p>
      </li>
    </ul>
    <p><b>Bước 2: </b>Chụp hình lại biên lai chuyển khoản và gửi vào khung chatbox trên website</p>
    <p>Nhân viên xác nhận lại số tiền và lên đơn hàng cho khách</p>
    `
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <FAQ title={question.question}>
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
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default HelpDetail;
