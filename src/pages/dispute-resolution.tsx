import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import withApollo from 'src/utils/withApollo';

const DisputeResolution = () => {
  const { t } = useTranslation(['common', 'disputeResolution']);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('disputeResolution:title')}</h2>
        <p>
          Medofa và Công ty TNHH Dược phẩm Dayton có trách nhiệm tiếp nhận khiếu nại và hỗ trợ Khách
          hàng liên quan đến giao dịch tại website Medofa.
          <br />
          Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa các bên
          nhằm duy trì sự tin cậy của thành viên vào chất lượng dịch vụ của Medofa và thực hiện theo
          các bước sau:
        </p>
        <ul className="list-group ml-3">
          <li>
            <b>Bước 1:</b> Khách hàng khiếu nại qua email: hotro@Medofa, hotro@dayton.vn
          </li>
          <li>
            <b>Bước 2:</b> Bộ phận Chăm Sóc Khách Hàng sẽ tiếp nhận các khiếu nại của thành viên,
            tùy theo tính chất và mức độ của khiếu nại thì bên Medofa sẽ có những biện pháp cụ thể
            để hỗ trợ Khách hàng để giải quyết tranh chấp đó.
          </li>
          <li>
            <b>Bước 3:</b> Trong trường nằm ngoài khả năng và thẩm quyền của trang Medofa thì ban
            quản trị website sẽ phối hợp với Công ty TNHH Dược phẩm Dayton để hỗ trợ Khách hàng hoặc
            đưa vụ việc này ra cơ quan nhà nước có thẩm quyền giải quyết theo pháp luật.
          </li>
        </ul>
        <p>
          Medofa tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi
          của khách hàng. Thông tin về các sản phẩm chăm sóc sức khỏe được ủy quyền đăng tải trên
          website Medofa và được phân phối bởi Công ty TNHH Dược phẩm Dayton.
        </p>
        <p>
          Khách hàng có thể gửi thông tin khiếu nại trực tiếp theo thông tin tại mục{' '}
          <b>&quot;Liên hệ&quot;</b>, theo đó thông tin của khách hàng sẽ được gửi đến ban quản
          trị Medofa. Khách hàng cần có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin
          liên quan đến sự việc đang gây mâu thuẫn cho khách hàng. Trong thời gian sớm nhất có thể,
          ban quản trị Medofa sẽ có email phải hồi lại ý kiến phản ánh của khách hàng.
        </p>
      </div>

      <Footer />
    </>
  );
};

DisputeResolution.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: true })(DisputeResolution);
