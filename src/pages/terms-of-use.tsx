import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

TermsOfUse.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'productCard', 'productBadge'],
  token: getToken(ctx)
});

function TermsOfUse(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">Điều khoản sử dụng</h2>
        <ul className="list-group decimal-list">
          <li>
            <h5 className="font-weight-bold">Giới thiệu</h5>
            <p>Medofa.com kính chào quý khách.</p>
            <p>
              {' '}
              Medofa.com là cổng thông tin giúp tra cứu các sản phẩm chăm sóc sức khỏe được phân
              phối bởi Công ty TNHH Dược phẩm Dayton. Theo đó, Công ty TNHH Dược phẩm Dayton sẽ
              thông qua trang Medofa.com để tiếp nhận nhu cầu khách hàng, đóng gói, giao hàng và thu
              tiền từ họ.Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý
              khách đồng ý với các điều khoản này.Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc
              lược bỏ bất kỳ phần nào trong Điều khoản sử dụng này vào bất cứ lúc nào. Các thay đổi
              có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý
              khách tiếp tục sử dụng trang web sau khi các thay đổi về Điều khoản sử dụng này được
              đăng tải, có nghĩa là quý khách đã chấp nhận với những thay đổi đó. Quý khách hàng vui
              lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.{' '}
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Hướng dẫn sử dụng website</h5>
            <p>
              Khi vào website của Medofa, khách hàng phải đảm bảo có giấy phép phân phối các sản
              phẩm chăm sóc sức khỏe.
            </p>
            <p>
              Chúng tôi sẽ cấp một tài khoản sử dụng để khách hàng có thể tham khảo các sản phẩm
              chăm sóc sức khỏe trên website Medofa.com trong khuôn khổ Điều khoản và Điều kiện sử
              dụng đã đề ra.
            </p>
            <p>
              Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản thân hoặc công
              ty và phải cập nhật nếu có bất kỳ thay đổi nào. Nếu chúng tôi phát hiện bất kỳ thông
              tin giả mạo nào, chúng tôi sẽ khóa tài khoản của quý khách ngay lập tức. Ngoài ra, mỗi
              người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên
              website. Quý khách hàng phải thông báo cho chúng tôi biết khi tài khoản bị truy cập
              trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp,
              đối với những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định về
              bảo mật thông tin.
            </p>
            <p>
              Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân
              danh bất kỳ đối tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản. Nếu vi
              phạm bất cứ điều nào trong đây, chúng tôi sẽ hủy tài khoản của khách mà không cần báo
              trước.
            </p>
            <p>Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website.</p>
          </li>
          <li>
            <h5 className="font-weight-bold">Ý kiến của khách hàng</h5>
            <p>
              Tất cả nội dung trang website và ý kiến phê bình của quý khách đều là tài sản của
              chúng tôi. Nếu chúng tôi phát hiện bất kỳ thông tin giả mạo nào, chúng tôi sẽ khóa tài
              khoản của quý khách ngay lập tức hoặc áp dụng các biện pháp khác theo quy định của
              pháp luật Việt Nam.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">
              Giải quyết hậu quả do lỗi nhập sai thông tin trên website
            </h5>
            <p>
              Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi tham gia giao
              dịch tại Medofa.com. Trong trường hợp khách hàng nhập sai thông tin và gửi vào trang
              Medofa.com, Medofa.com có quyền từ chối thực hiện giao dịch.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Thương hiệu và bản quyền</h5>
            <p>
              Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả
              các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch
              phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của chúng tôi. Toàn bộ nội dung
              của trang website được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế.
              Bản quyền đã được bảo lưu.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Quyền pháp lý</h5>
            <p>
              Các điều kiện, điều khoản và nội dung của trang website này được điều chỉnh bởi luật
              pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam sẽ giải quyết bất kỳ tranh chấp nào
              phát sinh từ việc sử dụng trái phép trang web này.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Quy định về bảo mật</h5>
            <p>
              Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt
              nhất để bảo vệ thông tin và việc thanh toán của quý khách. Thông tin của quý khách
              trong quá trình thanh toán sẽ được mã hóa để đảm bảo an toàn. Sau khi quý khách hoàn
              thành quá trình đặt hàng, quý khách sẽ thoát khỏi chế độ an toàn.
            </p>
            <p>
              Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để
              can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu
            </p>
            <p>
              Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào
              nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống.Cá nhân hay tổ chức vi
              phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
            </p>
            <p>
              Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật
              yêu cầu.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Đảm bảo an toàn giao dịch</h5>
            <p>
              Chúng tôi sử dụng nhiều biện pháp để bảo vệ thông tin về sản phẩm trên trang
              Medofa.com và để hạn chế tối đa các rủi ro có thể phát sinh.
            </p>
          </li>
          <li>
            <h5 className="font-weight-bold">Luật pháp và quyền tại lãnh thổ ở Việt Nam</h5>
            <p>
              Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả nghĩa vụ phát sinh ngoài
              hợp đồng hoặc có liên quan) sẽ bị chi phối và được hiểu theo luật pháp của Việt Nam.
              Bất kỳ tranh chấp hoặc khiếu nại nào liên quan đến trang Medofa.com hoặc bất kỳ sản
              phẩm hoặc dịch vụ nào được trang Medofa.com đăng tải dưới sự chấp thuận của Công ty
              TNHH Dược phẩm Dayton sẽ được giải quyết bằng trọng tài ràng buộc, thay vì tại tòa án.
            </p>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(TermsOfUse);
