import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import withApollo from 'src/utils/withApollo';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">Chính sách bảo mật</h2>
        <p>
          Khi sử dụng dịch vụ của Medofa, bạn đã tin tưởng cung cấp thông tin của bạn cho chúng tôi.
          Chúng tôi hiểu rằng đây là một trách nhiệm lớn. Vì vậy, chúng tôi nỗ lực bảo vệ thông tin
          của bạn.
        </p>
        <p>
          Chính sách bảo mật này nhằm mục đích giúp bạn hiểu rõ những thông tin chúng tôi thu thập,
          lý do chúng tôi thu thập và cách bạn có thể cập nhật, quản lý thông tin của mình.
        </p>

        <p className="font-weight-bold">
          Tại Medofa, chúng tôi coi việc bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu.
        </p>
        <p>
          Đội ngũ của Medofa luôn nỗ lực hết sức nhằm đảm bảo khả năng bảo vệ dữ liệu của bạn, bao
          gồm bảo mật dữ liệu kỹ thuật và quy trình quản lý nội bộ cũng như các biện pháp bảo vệ dữ
          liệu vật lý.
        </p>

        <p className="h3">Medofa thu thập thông tin gì từ bạn?</p>
        <ul className="list-group ml-3">
          <li>
            Những thông tin bạn cung cấp khi tạo tài khoản, bao gồm:
            <ul className="list-group ml-3">
              <li>Họ tên</li>
              <li>Nhà thuốc</li>
              <li>Số điện thoại</li>
              <li>Email</li>
              <li>Địa chỉ</li>
              <li>Ngày sinh nhật</li>
            </ul>
          </li>
          <li>
            Các hoạt động của bạn khi truy cập website, bao gồm:
            <ul className="list-group ml-3">
              <li>Các sản phẩm bạn đã xem</li>
              <li>Những bài viết bạn đã đọc</li>
              <li>Hoạt động của bạn</li>
              <li>Tương tác của bạn với website</li>
              <li>Các từ khóa bạn đã tìm kiếm</li>
              <li>
                Chúng tôi cũng thu thập thông tin trong các cuộc gọi bạn gọi tới tổng đài Chăm sóc
                Khách hàng và Tổng đài Giải quyết khiếu nại
              </li>
            </ul>
          </li>
        </ul>

        <p className="h3">Tại sao Medofa thu thập những thông tin trên?</p>
        <ul className="list-group ml-3">
          <li>
            Xác minh bạn đúng là đối tượng được phép sử dụng dịch vụ:
            <br />
            Medofa thu thập các thông tin cá nhân của bạn phục vụ cho việc xác minh rằng bạn đúng là
            đối tượng được phép sử dụng các tiện ích trên website và ngăn chặn các đối tượng giả
            mạo, có hành vi xấu, cố tình phá hoại ảnh hưởng tới hoạt động kinh doanh của Cộng đồng
            thành viên trên Medofa.
          </li>
          <li>
            Duy trì và cải thiện chất lượng dịch vụ:
            <br />
            Những thông tin về hoạt động của bạn trên website được thu thập để phục vụ cho hoạt động
            nghiên cứu và phát triển sản phẩm ngày càng hoàn thiện hơn.
            <br />
            Trong một số trường hợp, Medofa cũng thu thập thông tin về bạn từ các nguồn có thể truy
            cập công khai để phục vụ cho hoạt động cải tiến chất lượng dịch vụ, làm tăng mức độ hài
            lòng của khách hàng.
          </li>
          <li>
            Phát triển các dịch vụ mới:
            <br />
            Chúng tôi sử dụng thông tin thu thập được trong các dịch vụ hiện có để giúp phát triển
            thêm nhiều dịch vụ mới
          </li>
          <li>
            Đo lường hiệu quả hoạt động:
            <br />
            Các dữ liệu thu thập được cũng được chúng tôi sử dụng để phân tích và đo lường nhằm hiểu
            rõ cách các dịch vụ của chúng tôi được sử dụng, từ đó đánh giá hiệu quả hoạt động của
            toàn bộ hệ thống.
          </li>
          <li>
            Liên lạc với bạn:
            <br />
            Những thông tin cá nhân bạn cung cấp được chúng tôi sử dụng để tương tác trực tiếp với
            bạn.
          </li>
          <li>
            Bảo vệ chính bạn và thành viên của Medofa
            <br />
            Chúng tôi sử dụng thông tin để giúp cải thiện độ an toàn và tin cậy cho các dịch vụ của
            mình. Điều này bao gồm việc phát hiện, ngăn chặn và ứng phó với những hành vi gian lận,
            lạm dụng, các rủi ro về bảo mật và vấn đề kỹ thuật có thể có hại cho Medofa, cho bạn và
            cho thành viên của Medofa nói chung.
          </li>
        </ul>

        <p className="h3">Tại sao Medofa thu thập những thông tin trên?</p>
        <p className="ml-3">
          Chúng tôi Cam kết mọi thông tin của bạn là tuyệt mật và không được cung cấp cho bất kỳ tổ
          chức hay bên thứ 3 nào khác.
          <br />
          Trong trường hợp khi có yêu cầu của cơ quan chức năng hoặc yêu cầu từ chính bạn, Medofa sẽ
          căn cứ trên Quy định của Luật pháp và tình hình thực tiễn để đưa ra quyết định cuối cùng.
          <br />
          Trường hợp website bị hacker tấn công và đánh cắp dữ liệu, đây là tình huống bất khả kháng
          và không mong muốn của tất cả các bên. Chúng tôi sẽ nhờ tới sự can thiệp của các cơ quan
          chức năng có thẩm quyền và không chịu trách nhiệm về việc thông tin của bạn có thể bị rò
          rỉ hay sử dụng cho các mục đích khác.
        </p>
      </div>

      <Footer />
    </>
  );
};

PrivacyPolicy.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: true })(PrivacyPolicy);
