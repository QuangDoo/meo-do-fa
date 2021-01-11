import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import withApollo from 'src/utils/withApollo';

const PrivacyPolicy = () => {
  const { t } = useTranslation(['common', 'privacyPolicy']);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('privacyPolicy:title')}</h2>
        <ol className="list-group decimal-list">
          <li className="decimal-list-item">
            <span className="h5 font-weight-bold font-weight-bold">Mục đích áp dụng</span>
            <div className="list-content">
              <p>
                Khi sử dụng dịch vụ của Medofa, bạn đã tin tưởng cung cấp thông tin của bạn cho
                chúng tôi và khách hàng đã đồng ý với các điều khoản mà chúng tôi đã nêu ở trên.
              </p>
              <p>Chúng tôi hiểu rằng đây là một trách nhiệm lớn. </p>
              <p>
                Chính sách bảo mật này nhằm mục đích giúp bạn hiểu rõ những thông tin chúng tôi thu
                thập, lý do chúng tôi thu thập và cách bạn có thể cập nhật, quản lý thông tin của
                mình.
              </p>
              <p>
                Tại Medofa, chúng tôi coi việc bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu.
              </p>
              <p>
                Đội ngũ của Medofa luôn nỗ lực hết sức nhằm đảm bảo khả năng bảo vệ dữ liệu của bạn,
                bao gồm bảo mật dữ liệu kỹ thuật và quy trình quản lý nội bộ cũng như các biện pháp
                bảo vệ dữ liệu vật lý. Vì vậy, Chúng tôi cam kết rằng những thông tin mà bạn đã cung
                cấp cho chúng tôi sẽ được bảo mật và được sử dụng để đem lại lợi ích tối đa cho
                khách hàng.
              </p>
            </div>
          </li>
          <li className="decimal-list-item">
            <span className="h5 font-weight-bold">
              Quy định cụ thể về thu thập, sử dụng, lưu giữ và bảo mật thông tin khách hàng.
            </span>
            <ol className="list-group decimal-list mt-2">
              <li className="decimal-list-item">
                <span className="h6 font-weight-bold">Thu thập thông tin</span>
                <div className="list-content">
                  <p>
                    Khi Khách Hàng thực hiện giao dịch và/hoặc đăng ký mở tài khoản tại Website,
                    liên hệ Medofa để tra cứu thông tin về đơn đặt hàng hoặc giải quyết các vấn đề
                    khác có liên quan đến đặt hàng tùy từng thời điểm, Khách Hàng phải cung cấp một
                    số thông tin cần thiết cho việc thực hiện giao dịch và/hoặc đăng ký tài khoản
                    như:
                  </p>
                  <ol className="list-group">
                    <li>Họ tên</li>
                    <li>Nhà thuốc</li>
                    <li>Số điện thoại</li>
                    <li>Mã số thuế</li>
                    <li>Email</li>
                    <li>Địa chỉ nơi nhận hàng</li>
                    <li>Ngày sinh nhật</li>
                  </ol>
                  <p>
                    Khách hàng đảm bảo toàn bộ thông tin cung cấp là đúng sự thật và cập nhật thường
                    xuyên nếu có sự thay đổi, Medofa không chịu trách nhiệm giải quyết các vấn đề
                    phát sinh trong quá trình sử dụng website mua hàng của Medofa do khách hàng cung
                    cấp sai thông tin.
                  </p>
                  <p>Các hình thức mà Medofa sẽ thu thập thông tin của khách hàng:</p>
                  <ol className="list-group lower-alpha-list ml-3">
                    <li>
                      Đăng ký mua hàng: Trong quá trình đăng ký mua hàng hóa, Khách Hàng sẽ được yêu
                      cầu cung cấp một số thông tin cá nhân về thông tin giao nhận hoặc các thông
                      tin khác phục vụ cho mục đích xử lý đơn đặt hàng. Các thông tin đó còn được sử
                      dụng cho mục đích thanh toán, để hoàn thành đơn đặt hàng của Khách Hàng, để
                      liên hệ với Khách Hàng về đơn đặt hàng và cho mục đích tiếp thị nội bộ trong
                      tương lai. Khi khách hàng tạo tài khoản mua hàng , sẽ được Medofa yêu cầu cập
                      nhật các thông tin cá nhân cơ bản, các hình thức thanh toán ,nơi giao nhận để
                      để xử lý đơn hàng, đồng thời phục vụ cho các hình thức tiếp thị, quảng cáo nội
                      bộ của chúng tôi trong tương lai.
                    </li>
                    <li>
                      Địa chỉ thư điện tử và số điện thoại của khách hàng: Medofa sử dụng địa chỉ
                      thư điện tử của khách hàng để gửi mail xác nhận hóa đơn mua hàng sau khi đặt,
                      đồng thời , cập nhật các chương trình khuyến mãi đến khách hàng và một số vấn
                      đề cần liên lạc khác khi có nhu cầu.
                    </li>
                  </ol>
                </div>
              </li>
              <li className="decimal-list-item">
                <span className="h6 font-weight-bold">Lưu giữ và bảo mật thông tin</span>
                <div className="list-content">
                  <p>
                    Chúng tôi sử dụng thông tin để giúp cải thiện độ an toàn và tin cậy cho các dịch
                    vụ của mình. Điều này bao gồm việc phát hiện, ngăn chặn và ứng phó với những
                    hành vi gian lận, lạm dụng, các rủi ro về bảo mật và vấn đề kỹ thuật có thể có
                    hại cho Medofa, cho bạn và cho thành viên của Medofa nói chung. Khách Hàng không
                    được sử dụng các công cụ, chương trình để can thiệp trái phép vào hệ thống hay
                    làm thay đổi cấu trúc dữ liệu của Medofa, cũng như bất kỳ hành vi nào khác nhằm
                    phát tán, cổ vũ cho các hoạt động với mục đích can thiệp, phá hoại hay xâm nhập
                    vào dữ liệu của hệ thống và các hành vi mà pháp luật Việt Nam nghiêm cấm.
                  </p>
                  <p>Trong trường hợp có yêu cầu của pháp luật:</p>
                  <p>
                    Công ty sẽ xem xét và có trách nhiệm hợp tác cung cấp thông tin cá nhân khách
                    hàng khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan
                    công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng.{' '}
                  </p>
                  <p>
                    Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của khách hàng. Chúng
                    tôi Cam kết mọi thông tin của bạn là tuyệt mật và không được cung cấp cho bất kỳ
                    tổ chức hay bên thứ 3 nào khác.
                  </p>
                </div>
              </li>
              <li className="decimal-list-item">
                <span className="h6 font-weight-bold">Sử dụng thông tin khách hàng</span>
                <div className="list-content">
                  <p>Xác minh bạn đúng là đối tượng được phép sử dụng dịch vụ:</p>
                  <p>
                    Medofa thu thập các thông tin cá nhân của bạn phục vụ cho việc xác minh rằng bạn
                    đúng là đối tượng được phép sử dụng các tiện ích trên website và ngăn chặn các
                    đối tượng giả mạo, có hành vi xấu, cố tình phá hoại ảnh hưởng tới hoạt động kinh
                    doanh của Cộng đồng thành viên trên Medofa.
                  </p>
                  <p>Phục vụ cho mục đích nội bộ và lợi ích của Khách Hàng:</p>
                  <ol className="list-group">
                    <li>
                      Những thông tin về hoạt động của bạn trên website được thu thập để phục vụ cho
                      hoạt động nghiên cứu và phát triển sản phẩm và cải tiến dịch vụ của Medofa
                      ngày càng hoàn thiện hơn, làm tăng mức độ hài lòng của khách hàng.
                    </li>
                    <li>Chăm sóc khách hàng</li>
                    <li>Hỗ trợ khách hàng khi mua sản phẩm của Medofa</li>
                    <li>Giải đáp thắc mắc khách hàng</li>
                  </ol>
                  <p>Sử dụng thông tin cho các mục đích khác:</p>
                  <ol className="list-group">
                    <li>Xem xét và nâng cấp nội dung và giao diện của Website.</li>
                    <li>Thực hiện các bản khảo sát khách hàng.</li>
                  </ol>
                  <p>Phát triển các dịch vụ mới:</p>
                  <ol className="list-group">
                    <li>
                      Thực hiện các hoạt động quảng bá, tiếp thị liên quan đến các sản phẩm và dịch
                      vụ.
                    </li>
                    <li>
                      Medofa sử dụng thông tin thu thập được trong các dịch vụ hiện có để giúp phát
                      triển thêm nhiều dịch vụ mới, đồng thời nâng cấp cải tiến các phiên bản cập
                      nhật trên Website để đem lại chất lượng phục vụ tốt nhất đến bạn.
                    </li>
                    <li>
                      Đo lường hiệu quả hoạt động của hệ thống từ đó đánh giá nâng cấp khắc phục để
                      phục vụ khách hàng tốt nhất.
                    </li>
                  </ol>
                </div>
              </li>
              <li className="decimal-list-item">
                <span className="h6 font-weight-bold">Về việc chia sẻ thông tin khách hàng</span>
                <div className="list-content">
                  <p>
                    Chúng tôi cam kết bảo mật thông tin của khách hàng không cho bất kỳ bên thứ ba
                    nào trừ trường hợp yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ
                    quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách
                    hàng hoặc khi việc cung cấp thông tin đó là cần thiết đến các hoạt động liên
                    quan đến việc giao nhận hàng hóa của khách hàng khi mua sản phẩm của Medofa.
                    Ngoài các trường hợp trên chúng tôi chỉ tiết lộ thông tin khách hàng khi có sự
                    cho phép đồng ý của quý khách.
                  </p>
                </div>
              </li>
            </ol>
          </li>
          <li className="decimal-list-item">
            <span className="h5 font-weight-bold">An toàn bảo mật</span>
            <div className="list-content">
              <p>Luôn luôn đăng xuất khi Khách Hàng hoàn thành một giao dịch trực tuyến.</p>
              <p>
                Giữ mật khẩu của Khách Hàng cẩn thận, hãy nhớ rằng, bất kỳ ai biết mật khẩu của Quý
                Khách có thể truy cập tài khoản của Quý Khách. Khi tạo mật khẩu sử dụng ít nhất 8 ký
                tự và thường xuyên thay đổi mật khẩu của mình , tránh việc sử dụng nhiều mật khẩu
                cho một tài khoản trực tuyến.
              </p>
              <p>
                Thông tin của Khách Hàng được lưu trữ vĩnh viễn trên hệ thống máy chủ của Medofa ,
                chúng tôi sẽ có các biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn việc
                truy cập, sử dụng trái phép thông tin khách hàng nhằm đảm bảo đảm an toàn bằng các
                hệ thống tường lửa (firewall), các biện pháp kiểm soát truy cập và mã hóa dữ liệu.
              </p>
              <p>
                Trường hợp website bị hacker tấn công và đánh cắp dữ liệu, đây là tình huống bất khả
                kháng và không mong muốn của tất cả các bên. Chúng tôi sẽ nhờ tới sự can thiệp của
                các cơ quan chức năng có thẩm quyền và không chịu trách nhiệm về việc thông tin của
                bạn có thể bị rò rỉ hay sử dụng cho các mục đích khác.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <Footer />
    </>
  );
};

PrivacyPolicy.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: true })(PrivacyPolicy);
