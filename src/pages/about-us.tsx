import React from 'react';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';

const AboutUs = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container mt-t about-us">
        <div className="row">
          <div className="col-md-6 animated fadeIn">
            <img
              className="about-us__img"
              alt="medofa"
              src="https://assets.thuocsi.vn/assets/about_us/ab-1-ef5703f1b686fb6f140a1de14550867329c468ed398b5869b939532b00f0544d.jpg"></img>
          </div>
          <div className="col-md-6 animated zoomIn fast">
            <h2 className="about-us__title text-center">Giới thiệu về Medofa</h2>
            <p>
              <b className="text-success">Medofa </b>
              được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công
              nghệ về y tế
            </p>
            <p>
              Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
              khắp Việt Nam.
            </p>
            <p>
              Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công nghệ
              4.0 vào nền Y Tế.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 animated fadeIn  order-md-2">
            <img
              className="about-us__img"
              alt="medofa"
              src="https://assets.thuocsi.vn/assets/about_us/ab-2-fb14875e7ffaecce2098736ee26dbc3c0628faad322b5207f01974adf4e4dd29.jpg"></img>
          </div>
          <div className="col-md-6 animated zoomIn fast">
            <h2 className="about-us__title text-center">Mục tiêu của chúng tôi</h2>
            <p>
              Trong tương lai,
              <b className="text-success"> Medofa </b>
              hướng đến không những giúp phát triển hệ thống Y tế tại Việt Nam mà còn là nền tảng
              hiện đại hóa các kênh phân phối truyền thống.
            </p>
            <p>
              Trong chuỗi phân phối hiện tại, có khá nhiều doanh nghiệp, cá nhân và tổ chức khác
              nhau tham gia.
            </p>
            <p>
              Với tầm nhìn này, chúng tôi dần thay đổi các kênh phân phối lâu đời, giúp nâng cao
              chất lượng y tế đến mọi vùng miền nhằm duy trì chất lượng cuộc sống.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 animated fadeIn">
            <img
              className="about-us__img"
              alt="medofa"
              src="https://assets.thuocsi.vn/assets/about_us/ab-3-2f401cae77c2221ab4bf904bada14d521ea25bf51a9442a63a6ae44f64956809.jpg"></img>
          </div>
          <div className="col-md-6 animated zoomIn fast">
            <h2 className="about-us__title text-center">Sứ mệnh</h2>
            <p>
              Ứng dụng công nghệ tối đa để cho ra mô hình giải quyết các vấn đề Y Tế một cách nhanh
              chóng hiệu quả và chất lượng cao.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
AboutUs.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default AboutUs;
