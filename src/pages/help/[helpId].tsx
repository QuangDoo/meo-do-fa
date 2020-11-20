import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Sidebar from '../../components/Modules/FAQ/Sidebar'
import InputSearch from '../../components/Modules/News/InputSearch'
import Contact from '../../components/Modules/FAQ/Contact'
import QuestionDetail from '../../components/Modules/FAQ/QuestionDetail'

const HelpDetail = (): JSX.Element => {

  const question = {
    id: 1,
    question: "Hủy đơn hàng và khóa tài khoản Hủy đơn hàng và khóa tài khoản",
    author: "Tam N Nguyen",
    postDate: "Jan 21",
    status: "Đã cập nhật",
    answer: `
    <p>Hiện nay, thời gian giao hàng dự kiến của thuocsi.vn sẽ tuỳ thuộc vào từng khu vực như sau:</p>
    <p><b>TP Hồ Chí Minh:</b> Trong vòng 36h</p>
    <p><b>Miền Tây:</b> 1 - 2 ngày làm việc*</p>
    <p><b>Miền Trung:</b> 3 - 4 ngày làm việc*</p>
    <p><b>Miền Bắc:</b> 5 - 6 ngày làm việc*</p>
    <i>*Đây là thời gian giao hàng dự kiến ở các tỉnh thành ngoài TP.HCM. Sau khi xác nhận và nhận được thanh toán, thuocsi sẽ giao hàng cho đơn vị vận chuyển trong 48h.</i>
    <img src="https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg" alt="medofa"/>
    `
  }

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container help">
        <div className="p-3">
          <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)}/>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-9 col-lg-9 col-left__divider order-md-2">
            <div className="wapper">
              <div className="news__title">{question.question}</div>
              <QuestionDetail
                question={question.question}
                answer={question.answer}
                author={question.author}
                postDate={question.postDate}
                status={question.status}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3 order-md-1">
            <div className="wrapper">
              <div className="row">
                <Sidebar/>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Contact/>

      <Footer />
    </>
  );
};

HelpDetail.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default HelpDetail;
