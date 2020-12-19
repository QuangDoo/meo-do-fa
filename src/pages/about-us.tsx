import { useTranslation } from 'i18n';
import React from 'react';
import withApollo from 'src/utils/withApollo';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';

const AboutUs = (): JSX.Element => {
  const imgUrl1 = '/assets/images/about-us-2.jpg';
  const imgUrl2 = '/assets/images/about-us-3.jpg';
  const imgUrl3 = '/assets/images/about-us-1.jpg';

  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <div className="container mt-t about-us">
          <div className="row">
            <div className="col-md-6 animated fadeIn">
              <img className="about-us__img" alt="medofa" src={imgUrl1}></img>
            </div>
            <div className="col-md-6 animated zoomIn fast">
              <h2 className="about-us__title text-center">Giới thiệu về Medofa</h2>
              <p>
                <b className="text-primary">Medofa </b>
                được thành lập vào 2020, là một giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối , nhà thuốc, dược sĩ nhằm hợp tạo mối liên kết trực tiếp và gia tăng doanh thu .

              </p>
              <p>
                Phương châm của Medofa: Medicines , Online, Fast
              </p>
         
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 animated fadeIn  order-md-2">
              <img className="about-us__img" alt="medofa" src={imgUrl2}></img>
            </div>
            <div className="col-md-6 animated zoomIn fast">
              <h2 className="about-us__title text-center">Mục tiêu của chúng tôi</h2>
              <p>
                Trong tương lai,
                <b className="text-primary"> Medofa </b>
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
              <img className="about-us__img" alt="medofa" src={imgUrl3}></img>
            </div>
            <div className="col-md-6 animated zoomIn fast">
              <h2 className="about-us__title text-center">Sứ mệnh</h2>
              <p>
                Ứng dụng công nghệ tối đa để cho ra mô hình giải quyết các vấn đề Y Tế một cách
                nhanh chóng hiệu quả và chất lượng cao.
              </p>
            </div>
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

export default withApollo({ ssr: false })(AboutUs);
