import { useTranslation } from 'i18n';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

import Head from '../components/Layout/Head';

function AboutUs() {
  const { t } = useTranslation(['common', 'aboutUs']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">{t('aboutUs:title')}</h2>
        <p>
          Medofa được thành lập vào 2020, là một giải pháp công nghệ ngành dược kết nối nhà máy, nhà
          phân phối, nhà thuốc, dược sĩ nhằm hợp tạo mối liên kết trực tiếp và gia tăng doanh thu.
        </p>
        <p>
          Tại Medofa chúng tôi cung cấp đầy đủ những loại thuốc từ Tây y đến Đông y, bên cạnh đó,
          Medofa còn có những sản phẩm để chăm sóc sức khỏe và sắc đẹp. Những nhóm sản phẩm chính
          chúng tôi cung cấp, bao gồm:
        </p>
        <ol className="list-group">
          <li>Dược phẩm</li>
          <li>Đông y</li>
          <li>Thực phẩm chức năng</li>
          <li>Sản phẩm chăm sóc sức khỏe và làm đẹp</li>
          <li>Thực phẩm bổ sung Vitamin và khoáng chất</li>
        </ol>
        <p className="mb-0">
          Phương châm của Medofa: <b>Medicines</b> , <b>Online</b>, <b>Fast</b>
        </p>
        <p className="mb-0">4 tính năng cốt lõi hướng đến nhà thuốc:</p>
        <ol className="list-group">
          <li>Công cụ hỗ trợ dành cho dược sĩ</li>
          <li>Công cụ kết nối giữa nhà cung cấp và dược sĩ</li>
          <li>Công cụ hỗ trợ xuất, nhập, tồn cho dược sĩ</li>
          <li>Công cụ quản lý bán hàng cho nhà thuốc</li>
        </ol>
        <p className="mb-0">
          Với tầm nhìn năm 2025, là đơn vị đứng đầu về cung cấp sản phẩm uy tín, chất lượng với giá
          cả và dịch vụ tốt nhất số 1 tại Việt Nam đồng thời kết nối hiệu quả giữa nhà cung cấp và
          nhà thuốc.
        </p>
        <ol className="list-group">
          <li>Xây dựng hệ thống phân phối toàn quốc. </li>
          <li>
            Mở rộng mạng lưới phân phối không chỉ kênh nhà thuốc mà còn tại các bệnh viện lớn trên
            toàn quốc.
          </li>
        </ol>
        <p className="mb-0">
          Quý khách hàng có nhu cầu liên lạc, trao đổi và đóng góp ý kiến vui lòng tham khảo thông
          tin sau:
        </p>
        <ol className="list-group decimal-list">
          <li>
            Liên lạc qua điện thoại: <a href="tel:1900232436">1900232436</a> và{' '}
            <a href="tel:0914956936">0914956936</a>
          </li>
          <li>
            Liên lạc qua email: <a href="mailto:info@medofa.com">info@medofa.com</a>
          </li>
          <li>
            Đối tác có nhu cầu liên hệ về Sales {`&`} Marketing:{' '}
            <a href="mailto: sales@medofa.com"> sales@medofa.com</a>
          </li>
          <li>Địa chỉ Văn phòng chính: 231 Lý Tự Trọng, Bến Thành, Quận 1, Tp.HCM</li>
        </ol>
        <p className="mb-0">
          Medofa là website thuộc sở hữu của Công ty TNHH DAYTON
          <br />
          Công ty TNHH DAYTON
          <br />
          Mã số thuế: 0316558390
          <br />
          Địa chỉ: Lầu 5 – 231 Lý Tự Trọng, Bến Thành, Quận 1, Tp.HCM
        </p>
      </div>
    </MainLayout>
  );
}

AboutUs.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

export default withToken({ ssr: true })(AboutUs);
