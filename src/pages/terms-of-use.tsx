import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import TermPopup from 'src/components/Modules/TermPopup';
import withToken from 'src/utils/withToken';

TermsOfUse.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'productCard', 'productBadge']
});

function TermsOfUse() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <TermPopup />

      <div className="container text-justify my-5">
        <h2 className="text-center my-5">Điều khoản sử dụng</h2>
        <ol className="list-group p-0">
          <li>
            <h5 className="font-weight-bold mt-2 p-0">Giới thiệu</h5>
            <div className="list-item">
              Chào mừng quý khách đã truy cập Website trực tuyến Medofa. Medofa.com là cổng thông
              tin giúp tra cứu các sản phẩm chăm sóc sức khỏe được phân phối bởi Công ty TNHH Dược
              phẩm Dayton. Trang Web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào
              trong Điều khoản sử dụng này vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi
              được đăng trên trang Web mà không cần thông báo trước. Và khi quý khách tiếp tục sử
              dụng trang Web sau khi các thay đổi về Điều khoản sử dụng này được đăng tải, có nghĩa
              là quý khách đã chấp nhận với những thay đổi đó. Các nội dung, hình ảnh và thông tin
              trên Web chỉ nhằm mục đích cung cấp những thông tin cơ bản nhất về sản phẩm và kiến
              thức bệnh lý. Khi quý khách hàng truy cập vào trang Website của chúng tôi có nghĩa là
              quý khách đồng ý với các điều khoản sử dụng của Website .Trong trường hợp có bất kỳ
              thiệt hại nào phát sinh do việc vi phạm quy định sử dụng Website, chúng tôi có quyền
              đình chỉ hoặc khóa tài khoản của quý khách vĩnh viễn. Nếu quý khách không hài lòng với
              Website hoặc bất kỳ điều khoản, điều kiện, quy tắc, chính sách, hướng dẫn, hoặc cách
              thức vận hành của Website vui lòng không sử dụng các chức năng của Website Quý khách
              hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
            </div>
          </li>
          <li>
            <h5 className="font-weight-bold mt-2">Hướng dẫn sử dụng Website</h5>
            <div className="list-item">
              <p>
                Khi sử dụng Website của Medofa, khách hàng phải đảm bảo có giấy phép kinh doanh được
                phép phân phối các sản phẩm chăm sóc sức khỏe và đăng ký tài khoản mua hàng của
                Medofa . Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản thân
                hoặc công ty và phải cập nhật nếu có bất kỳ thay đổi nào. Nếu chúng tôi phát hiện
                bất kỳ thông tin giả mạo nào, chúng tôi sẽ khóa tài khoản của quý khách ngay lập
                tức. Ngoài ra, mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và
                hoạt động của mình trên Website. Quý khách hàng phải thông báo cho chúng tôi biết
                khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù
                trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do quý khách
                không tuân thủ quy định về bảo mật thông tin.Nghiêm cấm sử dụng bất kỳ phần nào của
                trang Web này với mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu
                không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây,
                chúng tôi sẽ hủy tài khoản của khách mà không cần báo trước. Từ tiêu đề đến nội dung
                các bài viết của chúng tôi đã được bảo hộ bản quyền. Bất cứ mục đích sử dụng nào sử
                dụng nội dung vi phạm điều khoản của chúng tôi đều là một hành vi vi phạm bản quyền.
                Trường hợp này, quyền sử dụng nội dung của bạn sẽ bị bắt buộc kết thúc và các bản
                sao nội dung của chúng tôi lên các Web khác sẽ phải lập tức bị hủy.
              </p>
              <p className="font-weight-bold mt-2">Ý kiến của khách hàng</p>
              <p>
                Medofa hoan nghênh khách hàng đóng góp các nội dung ý kiến bình luận và ý kiến phê
                bình của quý khách đều là tài sản của chúng tôi Nếu chúng tôi phát hiện bất kỳ thông
                tin giả mạo nào nhằm mục đích gây ảnh hưởng xấu đến công ty,chúng tôi sẽ khóa tài
                khoản của quý khách ngay lập tức hoặc áp dụng các biện pháp khác theo quy định của
                pháp luật Việt Nam.
              </p>
              <p className="font-weight-bold mt-2">Đặt hàng và xác nhận đơn hàng</p>
              <p>
                Khi quý khách đặt hàng tại Website Medofa, chúng tôi sẽ xác nhận đơn hàng nếu đơn
                hàng của quý khách đặt thỏa mãn tiêu chí thực hiện của Web và sẽ gửi mail xác nhận
                đặt hàng thành công giá trị đơn hàng đến quý khách.Chúng tôi sử dụng nhiều biện pháp
                để bảo vệ thông tin về sản phẩm trên trang Medofa.com và để hạn chế tối đa các rủi
                ro có thể phát sinh. Medofa cung cấp các hình thức thanh toán COD ( nhận hàng rồi
                thanh toán ) hoặc các hình thức chuyển khoản nhằm tạo ra sự thuận lợi nhất đến khách
                hàng khi mua sắm tại Medofa. Đảm bảo an toàn giao dịch.
              </p>
              <p className="font-weight-bold mt-2">GIẢI QUYẾT TRƯỜNG HỢP SAI THÔNG TIN </p>
              <p>
                Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi tham gia giao
                dịch tại Medofa.com. Trong trường hợp khách hàng nhập sai thông tin và gửi vào trang
                Medofa.com, Medofa.com có quyền từ chối thực hiện giao dịch.Vì vậy quý khách vui
                lòng kiểm tra kỹ thông tin khi đăng nhập.
              </p>
            </div>
          </li>
          <li>
            <h5 className="font-weight-bold mt-2">Thương hiệu và bản quyền</h5>
            <div className="list-item">
              Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả
              các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch
              phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của chúng tôi. Toàn bộ nội dung
              của trang Website được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế.
              Bản quyền đã được bảo lưu.
            </div>
          </li>
          <li>
            <h5 className="font-weight-bold mt-2">Quy định về bảo mật</h5>
            <div className="list-item">
              <p>
                Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để
                can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Việc thu thập dữ liệu chủ
                yếu trên Website bao gồm: email, số điện thoại (nếu có), tên đăng nhập, mật khẩu
                đăng nhập, địa chỉ khách hàng (thành viên). Đây là các thông tin chúng tôi yêu cầu
                thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ để Công ty chúng tôi liên
                hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên Website nhằm đảm bảo quyền
                lợi cho người tiêu dùng. Trong quá trình giao dịch thanh toán tại Website, chúng tôi
                chỉ lưu giữ thông tin chi tiết về đơn hàng đã thanh toán của thành viên. Chúng tôi
                cũng sẽ sử dụng cả thông tin nhận diện cá nhân của thành viên để gia tăng khả năng
                đáp ứng dịch vụ, cũng như về phát triển những chức năng, tính năng và các dịch vụ
                mới theo những xu hướng và sở thích đang diễn tiến.
              </p>
              <p>
                Trang Web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động
                nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống.Cá nhân hay tổ
                chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu
                cần thiết.
              </p>
              <p>
                Thông tin cá nhân của quý khách trên Medofa được cam kết bảo mật tuyệt đối. Việc thu
                thập và sử dụng thông tin của quý khách chỉ được thực hiện nếu nhận được sự đồng ý
                từ quý khách, Thông tin của quý khách trong quá trình thanh toán sẽ được mã hóa để
                đảm bảo an toàn{' '}
              </p>
              <p>
                Không tự ý sử dụng, chuyển giao, cung cấp thông tin khách hàng cho bên thứ 3 nào nếu
                không có sự đồng ý từ quý khách. Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ
                trong trường hợp cơ quan pháp luật yêu cầu.
              </p>
            </div>
          </li>
          <li>
            <h5 className="font-weight-bold mt-2">Giải quyết tranh chấp </h5>
            <div className="list-item">
              <p>
                Medofa sẽ giải quyết các hình thức khiếu nại hoặc tranh chấp bằng hình thức hòa giải
                thương lượng. Trong trường hợp tính chất sự việc ở mức độ nghiêm trọng nằm ngoài khả
                năng không thể giải quyết được thông qua thương lượng sẽ nhờ sự can thiệp của cơ
                quan nhà nước có thẩm quyền.
              </p>
              <p className="font-weight-bold mt-2">Luật pháp và quyền tại lãnh thổ ở Việt Nam</p>
              <p>
                Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả nghĩa vụ phát sinh
                ngoài hợp đồng hoặc có liên quan) sẽ bị chi phối và được hiểu theo luật pháp của
                Việt Nam. Bất kỳ tranh chấp hoặc khiếu nại nào liên quan đến trang Medofa.com hoặc
                bất kỳ sản phẩm hoặc dịch vụ nào được trang Medofa.com đăng tải dưới sự chấp thuận
                của Công ty TNHH Dược phẩm Dayton. Các tranh chấp phát sinh trong quá trình sử dụng
                Website sẽ được điều chỉnh theo quy định của các quy định pháp luật có liên quan.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(TermsOfUse);
