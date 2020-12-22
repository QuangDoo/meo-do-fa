import { useTranslation } from 'i18n';
import React from 'react';
import withApollo from 'src/utils/withApollo';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';

const AboutUs = (): JSX.Element => {
  const { t } = useTranslation(['common', 'aboutUs']);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('aboutUs:title')}</h2>
        <p>
          Medofa được thành lập vào 2020, là một giải pháp công nghệ ngành dược kết nối nhà máy, nhà
          phân phối, nhà thuốc, dược sĩ nhằm hợp tạo mối liên kết trực tiếp và gia tăng doanh thu.
          <br />
          Phương châm của Medofa: <b>Medicines</b> , <b>Online</b>, <b>Fast</b>
        </p>
        <p>4 tính năng cốt lõi hướng đến nhà thuốc:</p>
        <ul className="list-unstyled list-group ml-3 mb-3">
          <li>1. Công cụ hỗ trợ dành cho dược sĩ</li>
          <li>2. Công cụ kết nối giữa nhà cung cấp và dược sĩ</li>
          <li>3. Công cụ hỗ trợ xuất, nhập, tồn cho dược sĩ</li>
          <li>4. Công cụ quản lý bán hàng cho nhà thuốc</li>
        </ul>
        <p>
          Với tầm nhìn năm 2025, là đơn vị số 1 về tại Việt Nam về kết nối giữa nhà cung cấp và nhà
          thuốc thông qua thương mại điện tử.
        </p>
        <p>
          Quý khách hàng có nhu cầu liên lạc, trao đổi và đóng góp ý kiến vui lòng tham khảo thông
          tin sau:
        </p>
        <ul className="list-unstyled">
          <li>
            1. Liên lạc qua điện thoại: <a href="tel:1900232436">1900232436</a> và{' '}
            <a href="tel:0914956936">0914956936</a>
          </li>
          <li>
            2. Liên lạc qua email: <a href="mailto:Info@medofa.com">Info@medofa.com</a>
          </li>
          <li>
            3. Đối tác có nhu cầu liên hệ về Sales {`&`} Marketing:{' '}
            <a href="mailto: Sales@medofa.com"> Sales@medofa.com</a>
          </li>
          <li>4. Địa chỉ Văn phòng chính: 231 Lý Tự Trọng, Bến Thành, Quận 1, Tp.HCM</li>
        </ul>
        <p>
          Medofa là website thuộc sở hữu của Công ty TNHH RockLand
          <br />
          Công ty TNHH RockLand
          <br />
          Mã số thuế: 0316560590
          <br />
          Địa chỉ: Lầu 5 – 231 Lý Tự Trọng, Bến Thành, Quận 1, Tp.HCM
        </p>
      </div>
      <Footer />
    </>
  );
};

AboutUs.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: false })(AboutUs);
