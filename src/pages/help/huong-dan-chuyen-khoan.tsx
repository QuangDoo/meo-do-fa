import React from 'react';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import FAQ from '../../components/Modules/FAQ';
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail';

const HelpDetail = () => {
  const question = {
    id: 1,
    question: 'Hủy đơn hàng và khóa tài khoản Hủy đơn hàng và khóa tài khoản',
    author: 'Hung Raco',
    postDate: 'Jan 21',
    status: 'Đã cập nhật',
    answer: `
    <p>Thanh toán bằng hình thức chuyển khoản thực hiện theo các bước sau:</p>
    <p>Sau khi bấm thanh toán đơn hàng và nhận được cuộc gọi xác nhận lại đơn hàng</p>
    <p><b>Bước 1: </b>Khách hàng thực hiện chuyển khoản đúng số tiền cần thanh toán cho tài khoản:</p>
    <ul style="padding-left: 1.5rem">
      <li>
        <p>Chủ tài khoản: Công Ty TNHH ROCKLAND.</p>
        <p>Số tài khoản: 0371001188838</p>
        <p>Ngân Hàng:  TMCP Ngoại Thương Việt Nam Chi nhánh Tân Định </p>
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

export default withApollo({ ssr: false })(HelpDetail);
