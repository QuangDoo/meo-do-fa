import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import TermPopup from 'src/components/Modules/TermPopup';
import withToken from 'src/utils/withToken';

DisputeResolution.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function DisputeResolution() {
  const { t } = useTranslation(['common', 'disputeResolution']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <TermPopup />

      <div className="container text-justify my-5">
        <h2 className="text-center my-5">{t('disputeResolution:title')}</h2>
        <p>
          Khi phát sinh tranh chấp, Medofa và Công ty TNHH Dược phẩm Dayton có trách nhiệm tiếp nhận
          khiếu nại và hỗ trợ khách hàng liên quan đến giao dịch tại website Medofa Công ty đề cao
          giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của khách hàng vào
          chất lượng dịch vụ của Medofa . Khi có nhu cầu khiếu nại khách hàng thực hiện theo các
          bước sau:
        </p>
        <p>
          Khách hàng gửi email đến <a href="mailto:info@medofa.com">info@medofa.com</a>hoặc gọi đến
          số Hotline <a href="tel:1900232436">1900232436</a> và{' '}
          <a href="tel:0914956936">0914956936</a> của công ty. Bộ phận Chăm Sóc Khách Hàng của chúng
          tôi sẽ tiếp nhận các khiếu nại của thành viên, tùy theo tính chất và mức độ của khiếu nại
          thì bên Medofa sẽ có những biện pháp cụ thể để hỗ trợ Khách
        </p>
        <p>
          Medofa tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi
          của khách hàng.Khách hàng được yêu cầu phải cung cấp đầy đủ, chính xác, trung thực và chi
          tiết các thông tin liên quan đến sản phẩm, dịch vụ, giao dịch khi khiếu nại.
        </p>
        <p>
          Trong thời gian sớm nhất có thể, ban quản trị Medofa sẽ có email phải hồi lại ý kiến phản
          ánh của khách hàng. Mọi hành vi lừa đảo, gian lận trong quá trình khiếu nại/yêu cầu hỗ trợ
          đều sẽ bị từ chối giải quyết và Medofa có quyền đưa các vụ việc gian lận, lừa đảo này ra
          các cơ quan nhà nước có thẩm quyền để giải quyết khi ở mức độ nghiêm trọng theo quy định
          của pháp luật . Bất kỳ khiếu nại hoặc tranh chấp phát sinh từ hoặc liên quan đến giao dịch
          tại Website sẽ được giải quyết bằng hình thức thương lượng lượng hoặc hoài giải. Trong
          trường hợp các bên không thể giải quyết được thông qua thương lượng, một trong hai Bên có
          quyền yêu cầu cơ quan nhà nước có thẩm quyền giải quyết.
        </p>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(DisputeResolution);
