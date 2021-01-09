import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

TermsOfService.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'productCard', 'productBadge'],
  token: getToken(ctx)
});

function TermsOfService(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">Thỏa thuận về Dịch Vụ Thương Mại Điện Tử</h2>
        <p>
          Bằng cách hoàn tất thủ tục đăng ký xử lý dữ liệu trên Medofa, Công ty TNHH Dược phẩm
          Dayton tại đây xác nhận rằng, Công ty TNHH Dược phẩm Dayton là pháp nhân hợp pháp, có giấy
          phép phân phối dược phẩm để giao kết thỏa thuận dịch vụ thương mại điện tử với Medofa (“
          <b>Thỏa Thuận</b>”) cũng như thực hiện các nghĩa vụ tương ứng với các Thỏa Thuận đó. Bằng
          cách đăng ký và sử dụng dịch vụ của Medofa, và kế từ ngày Công ty TNHH Dược phẩm Dayton
          hoàn tất thủ tục mở gian hàng trên sàn giao dịch của Medofa (“ <b>ngày hiệu lực</b> ”),
          Công ty TNHH Dược phẩm Dayton đồng ý chịu sự ràng buộc với mọi và tất cả điều khoản dịch
          vụ và điều kiện được quy định tại thỏa thuận này, và tất cả các chính sách của sàn giao
          dịch được công bố đến Công ty TNHH Dược phẩm Dayton theo từng thời điếm nhất định, bao gồm
          tất cả diều khoản dịch vụ, điều kiện sửa đổi, bổ sung (nếu có) trong tương lai.
        </p>
        <h3 className="mt-3 text-uppercase">Điều khoản tổng quát</h3>
        <ul className="list-group upper-roman-list">
          <li>
            <p className="font-weight-bold"> Dịch vụ của medofa </p>
            Medofa cung cấp dịch vụ xử lý dữ liệu (“<b>Dịch Vụ</b>”) trên cơ sở tính phí, bao gồm
            các Dịch Vụ sau đây:
            <ul className="ml-3 list-group decimal-list">
              <li>Niêm yết và đăng tải Thông Tin Nội Dung;</li>
              <li>Dịch vụ chăm sóc khách hàng;</li>
              <li>Xác nhận đơn hàng;</li>
              <li>Theo dõi tình trạng giao hàng và thu tiền từ khách hàng;</li>
              <li>Theo dõi tình trạng trả hàng từ khách hàng.</li>
            </ul>
            và các dịch vụ bổ sung khác tùy vào yêu cầu của Công ty TNHH Dược phẩm Dayton.
            <br /> Chi tiết vui lòng xem thêm <a href="#terms-of-service-2">Điều 2</a> của Điều
            Khoản Dịch Vụ.
          </li>
          <li>
            <p className="font-weight-bold">Sản Phẩm Bán Trên Sàn Giao Dịch</p>
            Công ty TNHH Dược phẩm Dayton có thể bán các Sản Phẩm mà pháp luật và chính sách của
            Medofa cho phép nhập khẩu, phân phối và lưu hành tại thị trường Việt Nam. Vì Sản Phẩm
            được phân phối bởi chính Công ty TNHH Dược phẩm Dayton, nên Công ty TNHH Dược phẩm
            Dayton là người chịu hoàn toàn trách nhiệm về đổi trả sản phẩm do lỗi, hư hỏng hoặc
            nghĩa vụ về bảo hành, …
            <br /> Chi tiết vui lòng xem thêm <a>Điều 10</a> của Điều Khoản Dịch Vụ.
          </li>
          <li>
            <p className="font-weight-bold">Phí</p>
            Công ty TNHH Dược phẩm Dayton sẽ được sử dụng Dịch Vụ của Medofa trên cơ sở không thu
            phí, trừ một số phí dịch vụ vận hành cụ thể, tùy thuộc vào phương thức thực hiện mà Công
            ty TNHH Dược phẩm Dayton lựa chọn (ví dụ như phí sử dụng Phương thức Xử Lý Bởi Medofa).
            <br /> Tuy nhiên, tùy vào quyết định của mình, Medofa có thể tiến hành thu các phí khác
            bằng một thông báo gửi đến Công ty TNHH Dược phẩm Dayton phù hợp với quy định của Điều
            Khoản Dịch Vụ này.
          </li>
          <li>
            <p className="font-weight-bold">Trách Nhiệm Của Nhà Cung Cấp</p>
            Công ty TNHH Dược phẩm Dayton chịu mọi trách nhiệm liên quan đến Sản Phẩm mà mình phân
            phối trên Sàn Giao Dịch của Medofa, bao gồm chất lượng, nguồn gốc sản phẩm, hóa đơn tài
            chính theo quy định của pháp luật thuế và các nghĩa vụ khác như được quy định tại{' '}
            <a>Điều 10</a> của Điều Khoản Dịch Vụ.
          </li>
          <li>
            <p className="font-weight-bold">Trách Nhiệm Của Medofa đối với nội dung sản phẩm</p>
            Sàn Giao Dịch của Medofa chịu mọi trách nhiệm đăng tải nội dung liên quan đến sản phẩm
            trên Sàn Giao Dịch của Medofa, bao gồm cả thông tin, hình ảnh đăng tải, nội dung sản
            phẩm được cập nhật liên tục từ Công ty TNHH Dược phẩm Dayton. Công ty TNHH Dược phẩm
            Dayton sẽ nhận được đầy đủ hỗ trợ qua hộp thư{' '}
            <a href="mailto:info@medofa.com">
              <u>info@medofa.com</u>
            </a>{' '}
            <br /> Công ty TNHH Dược phẩm Dayton có thể chấm dứt giao kết hợp đồng với Medofa bất cứ
            lúc nào mà không bị xem là vi phạm hợp đồng nếu đã thông báo cho Medofa ít nhất 14 (mười
            bốn) ngày trước ngày dự kiến chấm dứt.
            <br /> Chi tiết vui lòng xem thêm <a>Điều 13</a> của Điều Khoản Dịch Vụ.
          </li>
          <li>
            <p className="font-weight-bold">Tranh Chấp hoặc Khiếu Nại</p>
            Thỏa Thuận Về Dịch Vụ Thương Mại Điện Tử và Điều Khoản Dịch Vụ tương ứng được điều chỉnh
            bởi pháp luật của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
            <br />
            Khi phát sinh tranh chấp hoặc khiếu nại, Các Bên có nghĩa vụ giải quyết trên tinh thần
            thương lượng và hòa giải. Nếu vẫn không giải quyết được, một trong Các Bên có quyền yêu
            cầu cơ quan trọng tài thương mại giải quyết.
            <br /> Chi tiết vui lòng xem thêm <a>Điều 17</a> của Điều Khoản Dịch Vụ.
          </li>
          <li>
            <p className="font-weight-bold">Định Nghĩa</p>
            Vui lòng xem chi tiết tại <a href="#form-1">Biểu 1</a> đính kèm Điều Khoản Dịch Vụ.
          </li>
        </ul>

        <h3 className="mt-3 text-uppercase">Điều khoản dịch vụ và điều kiện chung về dịch vụ</h3>
        <ul className="list-group decimal-list">
          <li>
            <p className="font-weight-bold">Chấp thuận</p>
            <ul className="ml-3 list-group decimal-list">
              <li>
                Việc sử dụng Dịch Vụ Sàn Giao Dịch chỉ được cấp giới hạn cho Công ty TNHH Dược phẩm
                Dayton đã giao kết và thiết lập Thỏa Thuận với Medofa phù hợp với quy định của pháp
                luật và Điều Khoản Dịch Vụ này. Công ty TNHH Dược phẩm Dayton theo đó tuyên bố và
                cam kết rằng:
                <ul className="list-group ml-3 lower-roman-list">
                  <li>
                    Công ty TNHH Dược phẩm Dayton là pháp nhân được thành lập hợp pháp theo quy định
                    của pháp luật doanh nghiệp, có đủ năng lực hành vi và năng lực pháp luật để giao
                    kết Thỏa Thuận với Medofa cũng như thực hiện các nghĩa vụ tương ứng với Thỏa
                    Thuận đó;
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cũng cam kết thêm rằng:
                    <ul className="list-group lower-alpha-list">
                      <li>
                        Công ty TNHH Dược phẩm Dayton đã có, đang và sẽ luôn duy trì, các giấy phép
                        kinh doanh cần thiết để hoạt động dưới hình thức pháp nhân, được tồn tại và
                        hoạt động hợp pháp phù hợp với pháp luật hiện hành nơi mà pháp nhân đặt trụ
                        sở chính;
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton đã đạt được tất cả các quyền lợi, năng lực và
                        thẩm quyền tiên quyết để giao kết thỏa thuận với Medofa cũng như thực hiện
                        các nghĩa vụ tương ứng với Thỏa thuận đó; và
                      </li>
                      <li>
                        mọi thông tin Công ty TNHH Dược phẩm Dayton tự cung cấp hoặc tạo ra, hoặc do
                        các bên liên kết của Công ty TNHH Dược phẩm Dayton cung cấp hoặc tạo ra,
                        luôn chính xác và đầy đủ. Công ty TNHH Dược phẩm Dayton cũng tuyên bố và
                        khẳng định thêm rằng, Công ty TNHH Dược phẩm Dayton và bất kỳ cá nhân hoặc
                        pháp nhân nào có quyền lợi tài chính liên quan đến hoạt động kinh doanh của
                        chính Công ty TNHH Dược phẩm Dayton, hoặc các cá nhân hoặc pháp nhân nào
                        đang hoạt động dưới sự ủy quyền của Công ty TNHH Dược phẩm Dayton, sẽ:
                        <ul className="list-group lower-alpha-list">
                          <li>
                            không có quan hệ liên kết với nhân viên của Medofa hoặc Các Bên Liên Kết
                            của Medofa;
                          </li>
                          <li>
                            chưa bị Medofa cấm bán Sản Phẩm trên Sàn Giao Dịch của Medofa; hoặc
                          </li>
                          <li>
                            chưa từng bị dính líu đến bất kỳ vụ kiện tụng hoặc khiếu nại nào liên
                            quan đến Thỏa Thuận của Medofa.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Vào bất kỳ lúc nào, Medofa bảo lưu quyền và có toàn quyền quyết định việc thay đổi
                bất kỳ điều khoản và điều kiện nào tại Điều Khoản Dịch Vụ này, hoặc bất kỳ khoản
                phí, quy trình, chính sách nào điều chỉnh các Dịch Vụ xử lý dữ liệu (bao gồm tất cả
                các Phụ Lục đính kèm). Mọi thay đổi sẽ được công bố trên Sàn Giao Dịch và và sẽ có
                hiệu lực sau 7 (bảy) ngày kể từ ngày công bố nói trên. Công ty TNHH Dược phẩm Dayton
                tại đây đồng ý và xác nhận rằng Công ty TNHH Dược phẩm Dayton chịu trách nhiệm trong
                việc truy cập, xem xét và phê duyệt tất cả các nội dung điều chỉnh đó. Việc Công ty
                TNHH Dược phẩm Dayton tiếp tục sử dụng các Dịch Vụ do Medofa cung cấp sau khi có các
                nội dung điều chỉnh đó sẽ được xem là sự xác nhận và chấp thuận của Công ty TNHH
                Dược phẩm Dayton về Điều Khoản Dịch Vụ đã được điều chỉnh và rằng Điều Khoản Dịch Vụ
                điều chỉnh đó sẽ ràng buộc đối với Nhà Cung Cấp. Trường hợp Công ty TNHH Dược phẩm
                Dayton không đồng ý với các nội dung được điều chỉnh, Công ty TNHH Dược phẩm Dayton
                có quyền chấm dứt Điều Khoản Dịch Vụ xử lý dữ liệu theo quy định tại Điều 13 của
                Điều Khoản Dịch Vụ xử lý dữ liệu, và ngay lập tức ngừng việc sử dụng Dịch Vụ xử lý
                dữ liệu do Medofa cung cấp. Để tránh nhầm lẫn, phiên bản điều chỉnh mới sẽ thay thế
                và/hoặc hủy bỏ các nội dung tương ứng ở phiên bản cũ.
              </li>
            </ul>
          </li>

          <li>
            <p className="font-weight-bold">Dịch vụ xử lỹ dữ liệu</p>
            Medofa sẽ cung cấp các Dịch vụ xử lý dữ liệu sau đây và Công ty TNHH Dược phẩm Dayton
            đồng ý chi trả Phí Dịch Vụ xử lý dữ liệu cho Medofa liên quan đến các Dịch Vụ xử lý dữ
            liệu đã được cung cấp đó.
            <br />
            Các Dịch Vụ xử lý dữ liệu bao gồm:
            <ul className="ml-3 list-group decimal-list">
              <li>Niêm yết và đăng tải Thông Tin Nội Dung;</li>
              <li>Dịch vụ chăm sóc khách hàng;</li>
              <li>Xác nhận đơn hàng;</li>
              <li>Quản lý Sản Phẩm hoàn trả, bị hủy bỏ và không giao được.</li>
            </ul>
          </li>

          <li>
            <p className="font-weight-bold">Quy trình thanh toán</p>
            Công ty TNHH Dược phẩm Dayton có trách nhiệm thanh toán Phí Dịch Vụ Vận Hành như được
            quy định tại Điều 3 của Điều Khoản Dịch Vụ này và tất cả các Phí Dịch Vụ khác được quy
            định tại Điều Khoản Dịch Vụ, tùy vào từng thời điểm nhất định.
          </li>

          <li>
            <p className="font-weight-bold"> Cam Kết Của Công ty TNHH Dược phẩm Dayton</p>
            <ul className="list-group ml-3 decimal-list">
              <li>
                <p className="font-weight-bold">Cam kết chung</p>
                Khi sử dụng Dịch Vụ, Công ty TNHH Dược phẩm Dayton tại đây bảo đảm, tuyên bố và xác
                nhận rằng:
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    Công ty TNHH Dược phẩm Dayton đã hoặc sẽ xin được tất cả các giấy phép, cho phép
                    hoặc phê duyệt cần thiết theo quy định để bán Sản Phẩm thông qua Sàn Giao Dịch
                    trước khi niêm yết Sản Phẩm trên Sàn Giao Dịch (bao gồm nhưng không giới hạn Sản
                    Phẩm được xem là “có điều kiện” theo Quy Định Pháp Luật) và sẽ được trình cho
                    Medofa vào bất kỳ thời điểm nào khi Medofa yêu cầu.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton sẽ tuân thủ các quy định về quản lý thuế, bao gồm
                    cả quy định về kê khai và nộp các loại thuế liên quan, bao gồm nhưng không giới
                    hạn, thuế thu nhập cá nhân, thuế giá trị gia tăng và thuế thu nhập doanh nghiệp.
                    Đồng thời cam kết giữ cho Medofa và Các Bên Liên Kết của Medofa khỏi những trách
                    nhiệm, khiếu nại, yêu cầu bồi hoàn, quyết định xử phạt hành chính, liên quan đến
                    hoặc xuất phát từ hành vi vi phạm nghĩa vụ về quản lý thuế của Nhà Cung Cấp.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cam kết sẽ phát hành hóa đơn tài chính đối với Sản
                    Phẩm, trừ khi pháp luật có quy định khác đi. Công ty TNHH Dược phẩm Dayton đồng
                    ý chịu toàn bộ trách nhiệm đối với tiền phạt hoặc sự tịch thu Sản Phẩm bởi cơ
                    quan nhà nước có thẩm quyền vì vận chuyển hàng hóa thương mại mà không có tài
                    liệu phù hợp. Trong trường hợp Công ty TNHH Dược phẩm Dayton không phát hành hóa
                    đơn tài chính theo yêu cầu của pháp luật Việt Nam, Medofa có toàn quyền chấm dứt
                    Dịch Vụ xử lý dữ liệu với hiệu lực ngay lập tức.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton là chủ sở hữu hoặc có quyền hợp pháp đối với các
                    bằng sáng chế, bản quyền, bí mật thương mại, nhãn hiệu Sản Phẩm, tên thương mại,
                    hoặc các quyền sở hữu trí tuệ khác liên quan đến Sản Phẩm và Thông Tin Nội Dung
                    và Công ty TNHH Dược phẩm Dayton không được biết bất kỳ khiếu nại nào được thực
                    hiện bởi bất kỳ bên thứ ba nào liên quan đến bất kỳ việc xâm phạm thực tế hoặc
                    bị cáo buộc đối với bằng sáng chế, bản quyền, bí mật thương mại, nhãn hiệu Sản
                    Phẩm, tên thương mại, hoặc các quyền sở hữu trí tuệ khác hoặc khiếu nại, yêu cầu
                    hoặc hành động nào khác xảy ra từ Thông Tin Nội Dung, việc quảng cáo, công bố,
                    quảng bá, sản xuất, bán, phân phối hoặc sử dụng Sản Phẩm và bằng tuyên bố này sẽ
                    không xâm phạm các quyền nói trên một cách trực tiếp hoặc gián tiếp.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cam kết cung cấp các thông tin sau liên quan đến
                    Sản Phẩm của Công ty TNHH Dược phẩm Dayton niêm yết trên Sàn Giao Dịch:
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Ký tự, hình ảnh và bất kỳ thông tin nào khác liên quan đến Sản Phẩm được
                        đăng tải chính xác, cập nhật và đầy đủ;
                      </li>
                      <li>
                        Thông Tin Nội Dung phải được cung cấp bằng tiếng Việt, tuân thủ Quy Định
                        Pháp Luật áp dụng và không chứa đựng bất kỳ tài liệu về giới tính, mang tính
                        chất bôi nhọ hoặc khiêu dâm;
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton phải thêm văn bản, Điều Khoản Dịch Vụ miễn
                        trừ, cảnh báo, thông báo, nhãn hiệu hoặc Thông Tin Nội Dung khác theo quy
                        định của Quy Định Pháp Luật áp dụng liên quan đến hoạt động giới thiệu, giao
                        dịch, quảng cáo và bán Sản Phẩm;
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton có trách nhiệm phân loại Sản Phẩm. Mỗi Sản
                        Phẩm phải được phân loại vào tiểu mục Sản Phẩm ở mức chi tiết nhất có thể.
                        Medofa có quyền thay đổi cách phân loại Sản Phẩm của Công ty TNHH Dược phẩm
                        Dayton bất cứ khi nào cần thiết và Medofa sẽ không chịu trách nhiệm đối với
                        việc Công ty TNHH Dược phẩm Dayton phân loại nhầm Sản Phẩm. Nếu sự nhầm lẫn
                        trong việc phân loại Sản Phẩm dẫn đến sự khác biệt đối với Phí Dịch Vụ Vận
                        Hành (nếu có) của Công ty TNHH Dược phẩm Dayton (như thể hiện tại Điều Khoản
                        Dịch Vụ), Medofa sẽ không thanh toán cho Công ty TNHH Dược phẩm Dayton phần
                        chênh lệch này. Bất cứ sự nhầm lẫn nào đối với việc phân loại Sản Phẩm theo
                        hạng mục Sản Phẩm cấp 1 sẽ dẫn đến việc xóa bỏ Sản Phẩm và tạo nên Sản Phẩm
                        mới; Medofa có thể thông báo cho Công ty TNHH Dược phẩm Dayton khi có bất kỳ
                        thay đổi nào về hạng mục Sản Phẩm ít nhất 7 (bảy) ngày trước khi chính thức
                        áp dụng;{' '}
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton không được phép cung cấp bất kỳ Thông Tin Nội
                        Dung nào, hoặc tìm cách niêm yết để bán trên Sàn Giao Dịch bất kỳ Sản Phẩm
                        nào, hoặc chèn bất kỳ đường dẫn nào vào bất kỳ dấu hiệu định vị tài nguyên
                        thống nhất nào (URL) để sử dụng trên Sàn Giao Dịch, trừ khi Công ty TNHH
                        Dược phẩm Dayton có quyền đăng Thông Tin Nội Dung và được cấp phép bán loại
                        Sản Phẩm đó theo Luật áp dụng.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cam kết thực hiện Đơn Hàng theo đúng thông tin và
                    giá cả đã hiển thị khi Khách Hàng đặt mua Sản Phẩm, trừ những trường hợp khác
                    theo sự chấp thuận của Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton phải đảm bảo Giá Niêm Yết phải được thể hiện rõ
                    rằng giá đã bao gồm hay chưa bao gồm các chi phí liên quan đến quá trình mua bán
                    Sản Phẩm, như các loại thuế, phí đóng gói, phí giao hàng, và các loại phí phát
                    sinh khác. Nếu Giá Niêm Yết không được thể hiện rõ thì sẽ mặc định rằng giá đó
                    đã bao gồm tất cả các chi phí liên quan đến các phí nêu trên.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cam kết rằng giá bán lẻ đề nghị được đăng tải trên
                    Sàn Giao Dịch của Medofa không được lớn hơn 50% Giá Niêm Yết cho cùng một Sản
                    Phẩm. Cho mục đích rõ nghĩa, giá bán lẻ đề nghị là giá bán mà nhà sản xuất đề
                    xuất áp dụng cho một sản phẩm trên thị trường bán lẻ, và có thể được giảm giá
                    bởi nhà bán lẻ. Medofa có quyền chấm dứt Điều Khoản Dịch Vụ nếu Công ty TNHH
                    Dược phẩm Dayton vi phạm quy định tại khoản này mà không cần phải thông báo
                    trước.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton chịu trách nhiệm đăng ký hoặc thông báo các chương
                    trình khuyến mãi, giảm giá Sản Phẩm, hoặc các hình thức thúc đẩy doanh số bán
                    hàng, đối với các Sản Phẩm của mình, và đồng ý bồi hoàn toàn bộ giá trị thiệt
                    hại cho Medofa và Các Bên Liên Kết Của Medofa đối với mọi Khiếu Nại (như được
                    định nghĩa dưới đây) liên quan đến việc không tuân thủ trách nhiệm đăng ký hoặc
                    thông báo các chương trình khuyến mãi này.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton chịu trách nhiệm chính duy trì tính bảo mật đối
                    với mật khẩu của mình. Công ty TNHH Dược phẩm Dayton không được tiết lộ mật khẩu
                    của mình cho bất kỳ bên thứ ba nào (ngoại trừ các bên thứ ba được Medofa ủy
                    quyền sử dụng tài khoản của Nhà Cung Cấp). Nếu mật khẩu của mình bị lộ, Công ty
                    TNHH Dược phẩm Dayton phải ngay lập tức đổi mật khẩu.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-weight-bold">Cam kết không vi phạm</p>
                Công ty TNHH Dược phẩm Dayton bảo đảm, tuyên bố và xác nhận thêm rằng Công ty TNHH
                Dược phẩm Dayton sẽ không, dù là trực tiếp hoặc gián tiếp, dù là vô ý hoặc cố ý,
                thực hiện các hành vi sau đây:
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    Đăng tải Thông Tin Nội Dung của các Sản Phẩm chứa đựng bất kỳ yếu tố nào của các
                    tài sản sở hữu trí tuệ thuộc quyền sở hữu của bên thứ ba bất kỳ;
                  </li>
                  <li>
                    Bán Sản Phẩm nằm trong số các sản phẩm bị cấm nhập khẩu, cấm bán và/hoặc cấm vận
                    chuyển theo Quy Đnh Pháp Luật hiện hành, và/hoặc bởi Các Chính Sách Của Medofa;
                    hoặc theo nhận định của Medofa, các Sản Phẩm đó là vi phạm hoặc có khả năng vi
                    phạm pháp luật hiện hành và/hoặc điều kiện về Thông Tin Nội Dung như được quy
                    định tại Điều Khoản Dịch Vụ;
                  </li>
                  <li>
                    Không cung cấp được các giấy phép, chấp thuận hoặc phê chuẩn cần thiết liên quan
                    đến việc bán các Sản Phẩm đó khi Medofa hoặc cơ quan nhà nước yêu cầu;
                  </li>
                  <li>
                    Sử dụng bất kỳ sở hữu trí tuệ nào thuộc về Medofa hoặc Bên Liên Kết Của Medofa
                    nếu không có sự chấp thuận trước bằng văn bản của Medofa.
                  </li>
                </ul>
              </li>

              <li>
                <p className="font-weight-bold">
                  Cam kết riêng liên quan đến Sản Phẩm: đối với Sản Phẩm được đăng bán, Công ty TNHH
                  Dược phẩm Dayton bảo đảm, tuyên bố và xác nhận thêm rằng:
                </p>
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    Các Sản Phẩm là hàng chính hãng, mới, chưa qua sử dụng, còn hạn sử dụng, không
                    được tân trang lại;
                  </li>
                  <li>
                    Các Sản Phẩm đảm bảo phù hợp với tất cả các quy chuẩn và tiêu chuẩn về chất
                    lượng, và/hoặc các thông số kỹ thuật tương ứng theo quy định của pháp luật Việt
                    Nam, bao gồm cả các quy định về dán nhãn hàng hóa. Trong trường hợp có bất kỳ
                    lỗi, khuyết điểm hoặc sự không tuân thủ nào với Luật áp dụng và/hoặc các thông
                    số kỹ thuật trên Sàn Giao Dịch liên quan đến Sản Phẩm, Medofa có thể yêu cầu
                    loại bỏ Sản Phẩm, và tất cả chi phí và phí tổn liên quan đến việc loại bỏ đó sẽ
                    do Công ty TNHH Dược phẩm Dayton chịu. Bằng cách khác, Medofa có thể yêu cầu
                    Công ty TNHH Dược phẩm Dayton thu hồi Sản Phẩm bị ảnh hưởng bởi lỗi, khuyết điểm
                    hoặc sự không tuân thủ và cung cấp Sản Phẩm thay thế, và mọi chi phí và phí tổn
                    liên quan đến việc thu hồi và thay thế sẽ do Công ty TNHH Dược phẩm Dayton chịu.
                  </li>
                  <li>
                    Tại thời điểm ký kết Điều Khoản Dịch Vụ, Công ty TNHH Dược phẩm Dayton đã có
                    được tất cả các giấy phép, sự chấp thuận, phê duyệt và/hoặc quyền sử dụng hợp
                    pháp để phân phối các Sản Phẩm đó trên Sàn Giao Dịch của Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cam kết giữ Medofa khỏi mọi tranh chấp, khiếu
                    kiện, khiếu nại, hoặc các khoản chi phí nào khác phát sinh từ hoặc liên quan đến
                    cam kết quản lý giá bán Sản Phẩm mà Công ty TNHH Dược phẩm Dayton đã thiết lập
                    với một bên thứ ba bất kỳ, dù là trước hoặc sau khi giao kết Thỏa Thuận với
                    Medofa.
                  </li>
                  <li>
                    Nhà Cung Cấp, không để cho Medofa hoặc Khách Hàng phải chịu thêm bất kỳ chi phí
                    nào, đảm bảo sẽ đạt được tất cả các giấy phép và chấp thuận để sử dụng bất kỳ
                    quyền sở hữu trí tuệ của một bên thứ ba cần thiết để cung cấp hoặc phân phối các
                    Sản Phẩm đó trên Sàn Giao Dịch của Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton đảm bảo tuân thủ nghĩa vụ bảo hành Sản Phẩm và
                    thời hạn bảo hành cam kết mà Công ty TNHH Dược phẩm Dayton đã xác lập với Khách
                    Hàng.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton sẽ bảo đảm cho Medofa khỏi chịu bất kỳ chi phí,
                    tổn thất, phí tổn hoặc thiệt hại nào phát sinh từ bất kỳ khiếu nại, vụ kiện hoặc
                    thủ tục tố tụng của bên thứ ba nào đối với Medofa và phát sinh từ hoặc liên quan
                    đến việc bán và sử dụng Sản Phẩm có khuyết điểm hoặc không tuân thủ.
                  </li>
                </ul>
              </li>

              <li>
                <p className="font-weight-bold">Quyền Và Trách Nhiệm Của Medofa</p>
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    Không phụ thuộc vào bất kỳ nội dung nào của Điều Khoản Dịch Vụ, Medofa có thể,
                    tùy vào quyết định của mình, trì hoãn hoặc tạm ngừng việc niêm yết, hoặc từ chối
                    niêm yết, hoặc xóa niêm yết hoặc yêu cầu Công ty TNHH Dược phẩm Dayton không
                    niêm yết, bất cứ hoặc tất cả Sản Phẩm nào mà Công ty TNHH Dược phẩm Dayton thực
                    hiện việc niêm yết để bán hàng thông qua Sàn Giao Dịch của Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton đồng ý, và/hoặc trao cho Medofa (trong bất cứ
                    trường hợp nào) các quyền sau đây liên quan đến Thông Tin Nội Dung của Sản Phẩm
                    niêm yết trên Sàn Giao Dịch: quyền không hủy ngang được miễn phí bản quyền,
                    không độc quyền, có giá trị toàn cầu và liên tục để sử dụng, sao chép, thực
                    hiện, trưng bày, phân phối, điều chỉnh, sửa đổi, căn chỉnh lại, tạo ra các sản
                    phẩm phái sinh của, và bằng cách khác khai thác thương mại hoặc phi thương mại
                    dưới bất kỳ hình thức nào, bất kỳ và tất cả Thông Tin Nội Dung do Công ty TNHH
                    Dược phẩm Dayton cung cấp, và cấp phép lại các quyền nêu trên cho các bên liên
                    kết và các bên điều hành của Medofa; tuy nhiên, với điều kiện là Medofa không
                    được thay đổi bất kỳ nhãn hiệu thương mại nào theo mẫu được Công ty TNHH Dược
                    phẩm Dayton cung cấp (ngoại trừ việc điều chỉnh lại kích cỡ của nhãn hiệu thương
                    mại trong mức độ cần thiết cho mục đích giới thiệu, miễn là vẫn giữ nguyên các
                    tỷ lệ tương ứng của nhãn hiệu thương mại) và phải tuân thủ các yêu cầu gỡ bỏ của
                    Công ty TNHH Dược phẩm Dayton đối với từng mục đích cụ thể khi sử dụng nhãn hiệu
                    thương mại; tuy nhiên, cũng với điều kiện là, không có quy định nào trong Điều
                    Khoản Dịch Vụ ngăn không cho Medofa sử dụng Thông Tin Nội Dung khi chưa có chấp
                    thuận của Công ty TNHH Dược phẩm Dayton trong phạm vi việc sử dụng đó được chấp
                    nhận nhưng không có giấy phép của Công ty TNHH Dược phẩm Dayton hoặc các bên
                    liên kết của Công ty TNHH Dược phẩm Dayton theo Quy Định Pháp Luật áp dụng.
                  </li>
                  <li>
                    vn có quyền sử dụng các cơ chế đánh giá, hoặc cho phép Khách Hàng đánh giá hoặc
                    xem xét Sản Phẩm của Công ty TNHH Dược phẩm Dayton và/hoặc hoạt động của Công ty
                    TNHH Dược phẩm Dayton với tư cách là bên bán hàng và Medofa có quyền công khai
                    các đánh giá và nhận xét như vậy.
                  </li>
                  <li>
                    vn có quyền quyết định Thông Tin Nội Dung, cơ cấu, giao diện, thiết kế, chức
                    năng và tất cả các phương diện khác của Sàn Giao Dịch, bao gồm quyền thiết kế
                    lại, sửa đổi, gỡ bỏ hoặc thay đổi nội dung, giao diện, thiết kế, thẻ meta
                    (meta-tags), tên gọi, ghi chú, tờ mẫu, mô tả, ứng dụng, các liên kết bên trong
                    và bên ngoài và các phương diện khác của, và ngăn hoặc hạn chế việc truy cập Sàn
                    Giao Dịch và bất kỳ yếu tố, phương diện, tỷ lệ hoặc đặc điểm nào của Sàn Giao
                    Dịch (kể cả các hoạt động niêm yết sản phẩm), tùy từng thời điểm.
                  </li>
                  <li>
                    vn có quyền, không hủy ngang và liên tục, sử dụng, niêm yết, thiết kế căn chỉnh
                    lại và khai thác (multi-source) bất kỳ và tất cả Thông Tin Nội Dung mà Công ty
                    TNHH Dược phẩm Dayton đã đăng tải thành công trên Sàn Giao Dịch. Quy định này
                    vẫn còn hiệu lực ngay cả khi chấm dứt Điều Khoản Dịch Vụ.
                  </li>
                  <li>
                    vn theo toàn quyền quyết định của mình có quyền ngưng để điều tra và/hoặc từ
                    chối tiến hành bất kỳ việc xử lý dữ liệu Đơn Hàng hoặc Giao Dịch nào.
                  </li>
                  <li>
                    Vào bất kỳ thời điểm nào, Sản Phẩm phải được trả về địa điểm chỉ định của Công
                    ty TNHH Dược phẩm Dayton.Công ty TNHH Dược phẩm Dayton sẽ chịu trách nhiệm thu
                    hồi những Sản Phẩm hoàn trả lại từ Nơi Chỉ Định Của Medofa trong vòng 15 (mười
                    lăm) Ngày Làm Việc kể từ khi nhận được thông báo bằng văn bản của Medofa. Trong
                    trường hợp Công ty TNHH Dược phẩm Dayton không thu hồi Sản Phẩm hoàn trả lại
                    trong thời hạn nêu trên, Medofa sẽ, theo toàn quyền quyết định của mình, gửi trả
                    Sản Phẩm cho Công ty TNHH Dược phẩm Dayton và Công ty TNHH Dược phẩm Dayton sẽ
                    phải chịu mức phí vận chuyển tương ứng. Sản Phẩm hoàn trả sẽ được gửi đến địa
                    chỉ giao hàng đã chỉ định của Công ty TNHH Dược phẩm Dayton tại cùng quốc gia
                    nơi Sản Phẩm đó được vận chuyển bởi Medofa. Nếu Công ty TNHH Dược phẩm Dayton
                    cung cấp địa chỉ cũ, không chính xác hoặc là địa chỉ quốc tế, hoặc nếu Công ty
                    TNHH Dược phẩm Dayton không thể thanh toán chi phí vận chuyển hoàn trả đó, thì
                    xem như Công ty TNHH Dược phẩm Dayton đã từ bỏ Sản Phẩm đó và Medofa có quyền
                    tiêu hủy số Sản Phẩm nêu trên bằng bất cứ hình thức nào được xem là phù hợp.
                    Công ty TNHH Dược phẩm Dayton cam kết sẽ chịu hoàn toàn trách nhiệm pháp lý phát
                    sinh từ hoặc liên quan đến Sản Phẩm hoàn trả đang được giữ bởi Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton hiểu rằng, Công ty TNHH Dược phẩm Dayton chịu
                    trách nhiệm chính khi thực hiện Đơn Hàng với Khách Hàng của họ. Medofa có quyền,
                    theo toàn quyền quyết định của mình, có quyền cấm hoặc tạm ngừng việc đăng tải
                    Sản Phẩm của Công ty TNHH Dược phẩm Dayton trên Sàn Giao Dịch, hoặc chấm dứt
                    thỏa thuận dịch vụ ngay lập tức nếu Medofa xác định rằng Công ty TNHH Dược phẩm
                    Dayton vi phạm bất kỳ tuyên bố, cam kết hoặc bảo đảm nào được quy định tại Điều
                    7 của Điều Khoản Dịch Vụ này.
                  </li>
                </ul>
              </li>

              <li>
                <p className="font-weight-bold">
                  Sự Độc Lập của Công ty TNHH Dược phẩm Dayton &#38; Bồi Hoàn
                </p>
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    vn không phải là một bên tham gia các giao dịch giữa Khách Hàng và Công ty TNHH
                    Dược phẩm Dayton, và Công ty TNHH Dược phẩm Dayton tại đây giải trừ Medofa (và
                    các bên liên kết, đại lý và nhân viên của Medofa) khỏi các Khiếu Nại (như được
                    định nghĩa tại Điều 12.3 dưới đây), các yêu cầu và các thiệt hại (thực tế và
                    mang tính hệ quả) thuộc bất kỳ loại nào và có bất kỳ tính chất nào, được biết và
                    không được biết, có nghi ngờ và không có nghi ngờ, được tiết lộ và không được
                    tiết lộ, phát sinh từ hoặc bằng bất kỳ cách nào liên quan đến các giao dịch đó.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton và Medofa là các nhà thầu độc lập, và không có quy
                    định nào trong Điều Khoản Dịch Vụ sẽ tạo thành bất kỳ quan hệ hợp danh, liên
                    doanh, đại lý, nhượng quyền hoặc đại diện bán hàng nào giữa Các Bên. Các Bên xác
                    nhận với nhau rằng Điều Khoản Dịch Vụ sẽ không gây ra việc thiết lập bất kỳ quan
                    hệ lao động trực tiếp nào giữa Medofa và những chủ thể cung cấp dịch vụ cho Nhà
                    Cung Cấp, bao gồm nhưng không giới hạn đối với Nhà Vận Chuyển hoặc Bưu Cục Chỉ
                    Định. Công ty TNHH Dược phẩm Dayton sẽ không có thẩm quyền thực hiện hoặc chấp
                    nhận bất kỳ đề nghị hoặc tuyên bố nào nhân danh Medofa.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton giải trừ Medofa và Các Bên Liên Kết của Medofa và
                    đồng ý bồi hoàn, bảo vệ và không để Medofa (và Các Bên Liên Kết của Medofa, các
                    viên chức, giám đốc, nhân viên và đại lý) chịu thiệt hại đối với bất kỳ khiếu
                    nại, tổn thất, thiệt hại, khoản thanh toán, chi phí, phí tổn, phí phạt hành
                    chính, phí phạt, hoặc trách nhiệm khác (bao gồm, không giới hạn, phí luật sư)
                    (mỗi khoản như vậy gọi là <b>“Khiếu Nại”</b> ) phát sinh từ hoặc liên quan đến:
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Vi phạm thực tế hoặc hành vi không tuân thủ của Công ty TNHH Dược phẩm
                        Dayton hoặc nhân viên, đại lý hoặc nhà thầu của Nhà Cung Cấp, đối với bất kỳ
                        nghĩa vụ nào trong Điều Khoản Dịch Vụ hoặc Thỏa Thuận Với Khách Hàng;
                      </li>
                      <li>
                        Bất kỳ kênh bán hàng nào của Sản Phẩm được sở hữu hoặc vận hành bởi Công ty
                        TNHH Dược phẩm Dayton (bao gồm việc chào bán, bán hàng, thực hiện, trả lại
                        tiền, hoàn trả hoặc các điều chỉnh), Thông Tin Nội Dung của Nhà Cung Cấp,
                        bất kỳ sự xâm phạm thực tế hoặc bị cáo buộc đối với bất kỳ Quyền Sở Hữu Trí
                        Tuệ nào bởi bất kỳ người nào nói trên, và bất kỳ sự tổn thương cá nhân, cái
                        chết hoặc thiệt hại tài sản liên quan đến những người đó;
                      </li>
                      <li>Các khoản thuế của Nhà Cung Cấp;</li>
                      <li>
                        bất kỳ việc xâm phạm thực tế hoặc bị cáo buộc đối với bằng sáng chế, bản
                        quyền, bí mật thương mại, nhãn hiệu Sản Phẩm, tên thương mại, hoặc các quyền
                        sở hữu trí tuệ khác hoặc khiếu nại, yêu cầu hoặc hành động nào khác xảy ra
                        từ Thông Tin Nội Dung, việc quảng cáo, công bố, quảng bá, sản xuất, bán,
                        phân phối hoặc sử dụng Sản Phẩm;{' '}
                      </li>
                      <li>
                        Một hoặc nhiều Bên Vận Hành thực hiện hành động pháp lý đối với Medofa hoặc
                        Các Bên Liên Kết của Medofa phát sinh từ hoặc liên quan đến Điều Khoản Dịch
                        Vụ.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Mọi Khiếu Nại của Công ty TNHH Dược phẩm Dayton về Dịch Vụ và/hoặc Điều Khoản
                    Dịch Vụ của Medofa phải được thông báo cho Medofa trong vòng 90 (chín mươi) ngày
                    kể từ ngày Đơn Hàng được xác lập và/hoặc Dịch Vụ được cung cấp. Cho mục đích rõ
                    nghĩa, Medofa không có nghĩa vụ phải giải quyết các Khiếu Nại của Công ty TNHH
                    Dược phẩm Dayton về Medofa nếu vượt quá thời hạn nêu trên.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton cho phép Medofa có thể kiểm soát việc bồi thường
                    với chi phí của Nhà Cung Cấp, nếu bất cứ lúc nào Medofa hợp lý xác định rằng bất
                    kỳ yêu cầu bồi thường nào có thể ảnh hưởng tiêu cực đến Medofa hoặc Bên Liên Kết
                    Của Medofa. Công ty TNHH Dược phẩm Dayton có thể không đồng ý với việc chấp nhận
                    bất kỳ phán quyết nào hoặc tham gia vào bất kỳ buổi hòa giải nào của một Khiếu
                    nại mà không có sự đồng ý trước bằng văn bản bởi Medofa, mà sự đồng ý này có thể
                    được rút lại vì bất cứ lý do gì.
                  </li>
                  <li>
                    vn bảo lưu quyền giao hoặc ký thầu phụ việc để thực hiện bất kỳ chức năng nào
                    của Medofa liên quan đến việc thực hiện các nghĩa vụ của Medofa theo Điều Khoản
                    Dịch Vụ mà Medofa cho là phù hợp.
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton sẽ không ký hợp đồng phụ cho bất kỳ quyền hoặc
                    nghĩa vụ nào của mình theo Điều Khoản Dịch Vụ mà không có sự chấp thuận trước
                    bằng văn bản của Medofa.
                  </li>
                </ul>
              </li>

              <li>
                <p className="font-weight-bold">Chấm Dứt</p>
                <ul className="list-group ml-3 decimal-list">
                  <li>
                    Bảo lưu quyền đơn phương và ngay lập tức chấm dứt Các Điều Khoản khi xảy ra bất
                    kỳ sự kiện nào sau đây:
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Chậm thanh toán trong hơn 30 (ba mươi) ngày mà không có lý do hợp lệ theo
                        Các Điều Khoản và Chính Sách Của Medofa;
                      </li>
                      <li>
                        Chậm hoàn trả trong hơn 60 (sáu mươi) ngày mà không có lý do hợp lệ theo Các
                        Điều Khoản và Chính Sách Của Medofa;
                      </li>
                      <li>
                        Việc đưa ra quyết định hành chính quan đến Medofa hoặc việc chỉ định một bên
                        quản lý tài sản đối với tài sản của Medofa;
                      </li>
                      <li>
                        Dàn xếp hoặc thỏa hiệp với các chủ nợ của mình nói chung hoặc nộp đơn lên
                        Tòa Án của vùng tài phán có thẩm quyền xin bảo hộ khỏi các chủ nợ của mình;
                      </li>
                      <li>vn ngừng hoặc đe dọa ngừng thực hiện hoạt động kinh doanh.</li>
                    </ul>
                  </li>
                  <li>
                    Công ty TNHH Dược phẩm Dayton có quyền đơn phương chấm dứt Các Điều Khoản trong
                    vòng 14 (mười bốn) ngày sau khi xảy ra bất kỳ sự kiện nào sau đây:
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Chậm thanh toán trong hơn 30 (ba mươi) ngày mà không có lý do hợp lệ theo
                        Các Điều Khoản và Chính Sách Của Medofa;
                      </li>
                      <li>
                        Chậm hoàn trả trong hơn 60 (sáu mươi) ngày mà không có lý do hợp lệ theo Các
                        Điều Khoản và Chính Sách Của Medofa;
                      </li>
                      <li>
                        Việc đưa ra quyết định hành chính quan đến Medofa hoặc việc chỉ định một bên
                        quản lý tài sản đối với tài sản của Medofa;
                      </li>
                      <li>
                        Dàn xếp hoặc thỏa hiệp với các chủ nợ của mình nói chung hoặc nộp đơn lên
                        Tòa Án của vùng tài phán có thẩm quyền xin bảo hộ khỏi các chủ nợ của mình;
                      </li>
                      <li>vn ngừng hoặc đe dọa ngừng thực hiện hoạt động kinh doanh.</li>
                    </ul>
                  </li>
                  <li>
                    Không phụ thuộc vào các quy định trên, Công ty TNHH Dược phẩm Dayton sẽ có quyền
                    đơn phương chấm dứt Các Điều Khoản mà không cần có nguyên nhân, bằng toàn quyền
                    quyết định của Nhà Cung Cấp, trong vòng 14 (mười bốn) ngày kể từ ngày Công ty
                    TNHH Dược phẩm Dayton gửi văn bản thông báo về việc chấm dứt đó.
                  </li>
                  <li>
                    Trước khi chấm dứt Điều Khoản Dịch Vụ,
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Công ty TNHH Dược phẩm Dayton sẽ thông báo với Medofa về tất cả các thỏa
                        thuận được ký kết với Khách Hàng, mà phải được thực hiện. Để tránh hiểu
                        nhầm, Công ty TNHH Dược phẩm Dayton sẽ có trách nhiệm thực hiện các Đơn Hàng
                        theo mô hình thực hiện cụ thể đã thỏa thuận với Medofa. Nếu Công ty TNHH
                        Dược phẩm Dayton không làm như vậy, Medofa có thể hủy bỏ các Đơn Hàng và có
                        thể tính cho Công ty TNHH Dược phẩm Dayton Phí Dịch Vụ áp dụng cho các Đơn
                        Hàng cộng với các khoản phí khác (nếu có), khoản này sẽ được trừ vào bất kỳ
                        Khoản Thanh Toán nào mà Medofa sẽ phải trả cho Nhà Cung Cấp.
                      </li>
                      <li>
                        vn sẽ thanh toán tất cả các khoản công nợ còn tồn đọng cho Công ty TNHH Dược
                        phẩm Dayton với điều kiện là Công ty TNHH Dược phẩm Dayton phải dừng các
                        hoạt động bán hàng trên Sàn Giao Dịch của Medofa tối thiểu 14 (mười bốn)
                        ngày kể từ ngày Medofa hoặc Công ty TNHH Dược phẩm Dayton gửi thông báo yêu
                        cầu chấm dứt.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Bảo Vệ Dữ Liệu Cá Nhân
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Công ty TNHH Dược phẩm Dayton cam kết, tuyên bố và bảo đảm rằng Công ty TNHH
                        Dược phẩm Dayton sẽ chỉ sử dụng và xử lý Dữ Liệu Cá Nhân: i) cho mục đích
                        thực hiện Thỏa Thuận Với Medofa hoặc Thỏa Thuận Mua Bán với Khách Hàng và sẽ
                        không tiết lộ cho bên thứ ba bất kỳ nào; ii) tuân thủ theo các yêu cầu và
                        quy định của pháp luật về bảo vệ dữ liệu cá nhân; và iii) theo cách thức mà
                        đảm bảo Medofa vẫn duy trì tính tuân thủ theo quy định của pháp luật về bảo
                        vệ dữ liệu cá nhân.
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton cam kết thêm rằng, Công ty TNHH Dược phẩm
                        Dayton sẽ áp dụng các biện pháp bảo mật cần thiết để đảm bảo Dữ Liệu Cá Nhân
                        được lưu giữ an toàn và bảo quản phù hợp với pháp luật về bảo vệ dự liệu cá
                        nhân, và chấp thuận cho phép Medofa tiến hành các đợt kiểm tra cần thiết để
                        đảm bảo tính tuân thủ của Nhà Cung Cấp.
                      </li>
                      <li>
                        Công ty TNHH Dược phẩm Dayton giải trừ Medofa và Các Bên Liên Kết của Medofa
                        và đồng ý bồi hoàn, bảo vệ và không để Medofa (và Các Bên Liên Kết của
                        Medofa, các viên chức, giám đốc, nhân viên và đại lý) chịu thiệt hại đối với
                        bất kỳ Khiếu Nại phát sinh từ hoặc liên quan đến Dữ Liệu Cá Nhân.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Bảo Mật
                    <ul className="list-group ml-3 decimal-list">
                      <li>
                        Vì các mục đích của Điều Khoản Dịch Vụ, <b>“Thông Tin Mật”</b> nghĩa là bất
                        kỳ dữ liệu hoặc thông tin nào thuộc quyền sở hữu của bên tiết lộ và các Bên
                        Liên Kết (<b>“Bên Tiết Lộ”</b>) và không được phổ biến ra công chúng, dù ở
                        dạng hữu hình hay vô hình, được tiết lộ bất kỳ lúc nào và bằng cách nào, bao
                        gồm, nhưng không giới hạn:
                        <ul className="list-group lower-roman-list">
                          <li>
                            chiến lược marketing, kế hoạch, thông tin tài chính, hoặc các dự án,
                            hoạt động, ước tính doanh số và kế hoạch kinh doanh liên quan đến các
                            hoạt động kinh doanh trong quá khứ, ở hiện tại hoặc trong tương lai của
                            bên đó;
                          </li>
                          <li>
                            kết quả thực hiện trong quá khứ hoặc ở hiện tại, bao gồm các Đơn Hàng và
                            khối lượng;
                          </li>
                          <li>kế hoạch và chiến lược mở rộng nào;</li>
                          <li>
                            bất kỳ sản phẩm hoặc dịch vụ nào, và danh sách khách hàng và các nhà
                            cung cấp;
                          </li>
                          <li>
                            thông tin kỹ thuật hoặc khoa học, phát minh, thiết kế, quy trình, thủ
                            tục, công thức, cải tiến, công nghệ hoặc phương pháp;
                          </li>
                          <li>
                            khái niệm, báo cáo, dữ liệu, bí quyết, công việc đang thực hiện, thiết
                            kế, công cụ phát triển, thông số kỹ thuật, phần mềm máy tính, mã nguồn,
                            mã đối tượng, biểu đồ, cơ sở dữ liệu, phát minh, thông tin và bí mật
                            thương mại; và
                          </li>
                          <li>
                            bất kỳ thông tin nào khác mà sẽ được công nhận hợp lý là thông tin mật
                            của Bên Tiết Lộ. Thông Tin Mật không nhất thiết phải mới lạ, độc nhất,
                            thuộc bằng sáng chế, thuộc bản quyền hoặc cấu thành bí mật thương mại để
                            được chỉ định là Thông Tin Mật.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Bên nhận Thông Tin Mật (“Bên Nhận”) sẽ không tiết lộ Thông Tin Mật, ngoại
                        trừ với sự chấp thuận trước bằng văn bản của Bên Tiết Lộ. Bên Nhận chỉ có
                        thể sử dụng Thông Tin Mật cho mục đích thực hiện Điều Khoản Dịch Vụ, và
                        không cho bất kỳ mục đích nào khác. Không phụ thuộc vào các quy định trên,
                        Bên Nhận có thể tiết lộ Thông Tin Mật vì bất kỳ lý do nào sau đây:
                        <ul className="list-group ml-3 decimal-list">
                          <li>
                            tuân thủ các quy định bắt buộc của Luật áp dụng hoặc các quy tắc của bất
                            kỳ vùng tài phán được công nhận nào;
                          </li>
                          <li>
                            thông tin được tiết lộ hợp lệ cho các cố vấn chuyên môn, các bên kiểm
                            toán hoặc ngân hàng của Bên Nhận, với điều kiện là bên nhận thông tin
                            trước tiên đồng ý không tiết lộ thông tin đó;
                          </li>
                          <li>
                            thông tin được phổ biến trên các nguồn công cộng, không phải do vi phạm
                            điều này;
                          </li>
                          <li>
                            vì các mục đích của bất kỳ thủ tục phân xử trọng tài hoặc thủ tục tố
                            tụng nào phát sinh từ Điều Khoản Dịch Vụ; và
                          </li>
                          <li>cho bất kỳ cơ quan nhà nước nào theo yêu cầu của họ.</li>
                        </ul>
                      </li>
                      <li>
                        Các quyền và nghĩa vụ của Bên Nhận theo Điều 14 này sẽ tiếp tục có hiệu lực
                        sau khi chấm dứt Điều Khoản Dịch Vụ.
                      </li>
                      <li>
                        Trả lại Thông Tin Mật:
                        <ul className="list-group ml-3 decimal-list">
                          <li>
                            Bên Nhận sẽ trả lại và giao lại cho Bên Tiết Lộ mọi tài liệu hữu hình
                            bao gồm Thông Tin Mật được cung cấp theo Điều Khoản Dịch Vụ và mọi biên
                            bản, ghi chú, tóm tắt, bản ghi nhớ, bản vẽ, sách hướng dẫn, hồ sơ, trích
                            dẫn hoặc thông tin phái sinh xuất phát từ đó và mọi chứng từ hoặc tài
                            liệu khác (sau đây gọi là <b>“Các Ghi Chú”</b>) (và mọi bản sao của bất
                            kỳ Ghi Chú nào nói trên, bao gồm các bản sao đã được chuyển thành dữ
                            liệu trên máy tính ở dạng hình ảnh, dữ liệu hoặc hồ sơ xử lý bằng word
                            bất kể bằng tay hay bằng cách chụp hình, (sau đây được gọi là{' '}
                            <b>“Các Bản Sao”</b>)) dựa trên hoặc bao gồm bất kỳ Thông Tin Mật nào, ở
                            bất kỳ dạng lưu trữ hay phục hồi, sau thời điểm nào xảy ra sớm hơn trong
                            các thời điểm sau đây:
                            <ul className="list-group ml-3 decimal-list">
                              <li>Chấm dứt Điều Khoản Dịch Vụ;</li>
                              <li>Vào thời điểm mà Bên Tiết Lộ yêu cầu như vậy.</li>
                            </ul>
                            <br />
                            Việc trả lại các tài liệu đó phải được thực hiện trong vòng 24 (hai mươi
                            bốn) giờ sau khi xảy ra các sự kiện được nêu trên đây
                          </li>
                          <li>
                            Tuy nhiên, Bên Nhận có thể giữ lại các tài liệu của Bên Tiết Lộ nếu cần
                            thiết để Bên Nhận đảm bảo tuân thủ các chính sách giữ lại tài liệu của
                            mình. Bằng cách khác, Bên Nhận, với sự chấp thuận bằng văn bản của Bên
                            Tiết Lộ có thể (hoặc trong trường hợp Các Ghi Chú, theo quyền lựa chọn
                            của Bên Nhận) ngay lập tức tiêu hủy bất kỳ tài liệu nào nói trên bao gồm
                            Thông Tin Mật (hoặc việc xóa dữ liệu không thể phục hồi của dữ liệu trên
                            máy tính) và, theo yêu cầu, xác nhận bằng văn bản việc tiêu hủy đó bởi
                            nhân viên của Bên Nhận phụ trách giám sát việc hủy bỏ.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <p className="font-weight-bold">Bất Khả Kháng</p>
            <ul className="list-group ml-3 decimal-list">
              <li>
                Không Bên nào chịu trách nhiệm với Bên còn lại hoặc được cho là vi phạm Điều Khoản
                Dịch Vụ vì lý do của bất kỳ việc chậm trễ nào trong việc thực hiện hoặc bất kỳ việc
                không thực hiện nào đối với các nghĩa vụ của Bên đó nếu việc trì hoãn hoặc không
                thực hiện đó là do bất kỳ sự kiện hoặc nguyên nhân nào ngoài sự kiểm soát hợp lý của
                Bên đó (mỗi sự kiện như vậy gọi là <b>“Bất Khả Kháng”</b>). Không làm ảnh hưởng đến
                tính tổng quát của các quy định trên đây, các sự kiện sau đây sẽ được xem là là các
                sự kiện Bất Khả Kháng:
                <ul className="list-group ml-3 decimal-list">
                  <li>Thiên tai, nổ, lũ lụt, giông, cháy hoặc tai nạn;</li>
                  <li>
                    Chiến tranh hoặc đe dọa chiến tranh, sự phá hoại, sự nổi dậy, bạo loạn dân sự
                    hoặc sự trưng thu, hành động khủng bố hoặc sự náo động dân sự;
                  </li>
                  <li>
                    Các hành động, hạn chế, quy định, quy chế, lệnh cấm hoặc biện pháp thuộc bất kỳ
                    loại nào về phía cơ quan nhà nước, quốc hội hoặc địa phương;
                  </li>
                  <li>Các quy định hoặc lệnh cấm nhập khẩu hoặc xuất khẩu;</li>
                  <li>
                    Sự gián đoạn giao thông, đình công, bãi công hoặc hành động công nghiệp khác
                    hoặc tranh chấp thương mại (bất kể là liên quan đến nhân viên của bên đó hoặc
                    một bên thứ ba);
                  </li>
                  <li>
                    Dịch bệnh do được công bố bởi Tổ Chức Y Tế Thế Giới hoặc Cơ quan Nhà Nước Việt
                    Nam;
                  </li>
                  <li>
                    Sự gián đoạn sản xuất hoặc hoạt động, các khó khăn trong việc có được nguyên
                    liệu thô, lao động, nhiên liệu hoặc máy móc; và
                  </li>
                  <li>Sự mất điện hoặc hư hỏng máy móc.</li>
                </ul>
              </li>
              <li>
                Sau khi xảy ra bất kỳ sự kiện nào nêu tại Điều 16.1, Bên bị ảnh hưởng có thể, theo
                quyền chọn của mình, tạm ngưng hoàn toàn một một phần việc giao hàng hoặc thực hiện
                nghĩa vụ của mình theo quy định của Điều Khoản Dịch Vụ trong khi sự kiện hoặc tình
                huống đó tiếp diễn. Nếu bất kỳ sự kiện nào được nêu tại Điều 16.1 sẽ xảy ra trong
                khoảng thời gian hơn một tháng, Bên không bị ảnh hưởng có thể ngay lập tức chấm dứt
                Điều Khoản Dịch Vụ sau khi gửi thông báo bằng văn bản cho Bên bị ảnh hưởng.
              </li>
            </ul>
          </li>

          <li>
            <p className="font-weight-bold">Luật Điều Chỉnh Và Giải Quyết Tranh Chấp</p>
            <ul className="list-group ml-3 decimal-list">
              <li>Điều Khoản Dịch Vụ được điều chỉnh bởi pháp luật Việt Nam.</li>
              <li>
                Mọi tranh chấp, mâu thuẫn hoặc khác biệt phát sinh từ việc thực hiện Điều Khoản Dịch
                Vụ (gọi chung <b>“Tranh Chấp”</b>) sẽ được các Bên thống nhất giải quyết bằng hòa
                giải và thương lượng. Trong trường hợp các bên không thỏa thuận được với nhau về
                việc giải quyết Tranh Chấp trong vòng ba mươi (30) ngày kể từ ngày xảy ra Tranh
                Chấp, các Bên có quyền yêu cầu Trung tâm trọng tài quốc tế Việt Nam (VIAC) bên cạnh
                Phòng Thương mại và Công nghiệp Việt Nam (VCCI) giải quyết theo thủ tục tố tụng của
                VIAC. Nơi giải quyết Tranh Chấp là Thành phố Hồ Chí Minh. Ngôn ngữ là tiếng Việt.
              </li>
            </ul>
          </li>

          <li>
            <p className="font-weight-bold">Điều Khoản Khác</p>
            <ul className="list-group ml-3 decimal-list">
              <li>
                Quy định của Điều Khoản Dịch Vụ là hoàn toàn riêng biệt, nếu có bất kỳ điều khoản
                nào bị vô hiệu hoặc không thể thực thi được, với phạm vi toàn bộ hay một phần, thì
                những sự vô hiệu hoặc không thực thi được đó sẽ chỉ tác động đối với chính điều
                khoản đó và không ảnh hưởng đến bất kỳ điều khoản nào khác. Trong phạm vi pháp luật
                cho phép, một điều khoản trong đó phản ánh ý định ban đầu của Các Bên sẽ được thay
                thế cho điều khoản vô hiệu hoặc không thể thực thi đó.
              </li>
              <li>
                Việc một Bên không thực hiện các quyền của mình trong trường hợp Bên kia vi phạm hợp
                đồng sẽ không được xem là sự từ bỏ quyền của Bên đó theo Điều Khoản Dịch Vụ hoặc
                theo Quy Định Pháp Luật áp dụng.
              </li>
              <li>
                Điều Khoản Dịch Vụ sẽ không thể được sửa đổi ngoại trừ một thông báo chính thức được
                ký bởi người đại diện theo ủy quyền của Medofa gửi đến Công ty TNHH Dược phẩm Dayton
                trong vòng 14 (mười bốn) ngày trước ngày có hiệu lực.
              </li>
              <li>
                Không Bên nào được quyền chuyển nhượng, chuyển giao hoặc ký hợp đồng thầu phụ toàn
                bộ hoặc một phần quyền lợi hoặc nghĩa vụ của mình phát sinh từ Điều Khoản Dịch Vụ
                khi chưa có chấp thuận trước bằng văn bản của bên còn lại.
              </li>
            </ul>
          </li>
          <p className="text-uppercase mt-3">
            TÔI, CÔNG TY TNHH DƯỢC PHẨM DAYTON, ĐÃ ĐỌC VÀ ĐỒNG Ý VỚI MỌI ĐIỀU KHOẢN HIỆN CÓ VÀ NHỮNG
            ĐIỀU KHOẢN BỔ SUNG SỬA ĐỔI NẾU CÓ. BẰNG CÁCH BẤM NÚT “XÁC NHẬN” VÀO PHIẾU ĐĂNG KÝ BÁN
            HÀNG, TÔI HIỂU RẰNG TÔI ĐANG TẠO CHỮ KÝ ĐIỆN TỬ MÀ TÔI HIỂU RẰNG NÓ CÓ GIÁ TRỊ VÀ HIỆU
            LỰC TƯƠNG TỰ NHƯ CHỮ KÝ TÔI KÝ BẰNG TAY.
          </p>
        </ul>

        <h3 id="form-1" className="text-upper-case">
          Biểu 1 - Định nghĩa đính kèm với điều khoản dịch vụ
        </h3>
        <ol start={8} className="list-group decimal-list">
          Những từ, thuật ngữ và cụm từ khi được sử dụng trong tài liệu này, sẽ có ý nghĩa như sau:
          <li>
            <b>Bên Vận Hành:</b> có nghĩa là bất kỳ cá nhân hoặc doanh nghiệp thành lập hợp pháp tại
            Việt Nam, được ủy quyền hợp lệ bởi Công ty TNHH Dược phẩm Dayton để vận hành và quản lý
            tài khoản của Công ty TNHH Dược phẩm Dayton trên Trung tâm Công ty TNHH Dược phẩm Dayton
            được cung cấp bởi Medofa phù hợp với Điều Khoản Dịch Vụ và điều kiện này.
          </li>
          <li>
            <b>Bằng Văn Bản:</b> (i) Thư xác nhận việc nhận được; (ii) Thư được gửi trực tiếp hoặc
            gửi fax hoặc báo cáo trả lời từ máy fax; hoặc (iii) Thư điện tử có xác nhận được gửi đến
            địa chỉ email cụ thể (nếu có)
          </li>
          <li>
            <b>Bên Liên Kết Của Medofa:</b> một người, bất kỳ người nào trực tiếp hoặc gián tiếp
            kiểm soát, được kiểm soát bởi, hoặc là dưới sự kiểm soát chung với người đó, và cho các
            mục đích như các thuật ngữ “kiểm soát”, “kiểm soát bởi” và “dưới sự kiểm soát chung với”
            và các dẫn xuất khác có nghĩa là sở hữu thông qua một hoặc nhiều trung gian, một hoặc
            nhiều người có hơn hai mươi lăm phần trăm (25%) quyền biểu quyết hoặc có quyền hạn để
            chỉ đạo hoặc tạo sự tác động đến chính sách quản lý của bất kỳ người nào, dù là thông
            qua quyền sở hữu chứng khoán, vốn cổ phần, vốn điều lệ, như một đối tác hoặc người được
            ủy thác, thông qua hợp đồng hay không; và chủ thế bao gồm cá nhân, một đơn vị công ty,
            đơn vị hợp danh, bất kỳ đơn vị không phải doanh nghiệp hay hiệp hội và bất kỳ cơ quan
            nhà nước có liên quan;
          </li>
          <li>
            <b>Các Giao Dịch:</b> Các khoản thanh toán bởi Khách Hàng, Phí Dịch Vụ, khoản giải ngân,
            bồi hoàn, khoản phạt, phí điều chỉnh và những giao dịch khác liên quan đến quá trình
            thực hiện Điều Khoản Dịch Vụ và Thỏa thuận với Khách Hàng.
          </li>
          <li>
            <b>Chính Sách Của Medofa:</b> tất cả các tiêu chuẩn và yêu cầu được quy định và cung cấp
            cho Công ty TNHH Dược phẩm Dayton bởi Medofa và được ghi nhận tại đường
            dẫn https://Medofa/hoặc bất kỳ đường dẫn nào khác, hoặc được đăng tải trên Trung Tâm
            Công ty TNHH Dược phẩm Dayton của Medofa (như được định nghĩa dưới đây), tùy vào quyết
            định của Medofa. Công ty TNHH Dược phẩm Dayton phải đọc và sẽ được xem như đã đọc và
            chấp thuận tất cả Chính Sách Của Medofa đã được gửi cho Công ty TNHH Dược phẩm Dayton
            hoặc được đăng tải trên đường dẫn nêu trên hoặc đăng tải thông qua Trung Tâm Nhà Cung
            Cấp
          </li>
          <li>
            <b>O.D:</b> Phương thức thanh toán bằng tiền mặt khi nhận hàng.
          </li>
          <li>
            <b>Dịch Vụ:</b> Dịch vụ cung cấp bởi Medofa cho Nhà Cung Cấp, bao gồm nhưng không giới
            hạn đối với những dịch vụ chung được quy định tại Điều 3 của Điều Khoản Dịch Vụ này và
            theo Phương thức thực hiện như đã thống nhất bởi các Bên trong Phiếu Thông Tin Nhà Cung
            Cấp, Hợp Đồng Dịch Vụ Thương Mại Điện Tử và các Phụ Lục tương ứng.
          </li>
          <li>
            <b>Dữ Liệu Cá Nhân:</b> là bất kỳ thông tin nào được quy định bởi pháp luật về bảo vệ dữ
            liệu cá nhân trên phạm vi Lãnh Thổ mà chứa đựng, nhưng không giới hạn, các thông tin
            liên quan đến họ tên, số điện thoại, email, địa chỉ liên lạc, của nhân viên, nhà thầu,
            nhà cung cấp, các đại lý của Medofa hoặc của Khách Hàng.
          </li>
          <li>
            <b>Đơn Hàng:</b> Đơn Hàng tạo bởi Khách Hàng để mua Sản Phẩm thông qua Sàn Giao Dịch.
          </li>
          <li>
            <b>Giá Niêm Yết:</b> Là giá của Sản Phẩm niêm yết trên Sàn Giao Dịch dựa trên quyết định
            của Công ty TNHH Dược phẩm Dayton và bao gồm bất kì khoản thuế áp dụng nào theo quy định
            của pháp luật.
          </li>
          <li>
            <b>Khách Hàng:</b> Một bên thứ ba, là bên mua Sản Phẩm tại Sàn Giao dịch.
          </li>
          <li>
            <b>Khoản Thanh Toán Từ Khách Hàng:</b> tất cả các khoản thanh toán của Khách Hàng theo
            Thỏa thuận với Khách Hàng được thực hiện thông qua thẻ tín dụng hoặc cổng thanh toán
            trực tuyến Cybersource/Smartlink hoặc C.O.D được Medofa quy định trên Sàn Giao Dịch,
            hoặc thông qua các phương thức thanh toán khác được chấp thuận bởi Medofa và tuân thủ
            theo các Quy Định Của Pháp Luật.
          </li>
          <li>
            <b></b>Không Giao Được Sản Phẩm: Trường hợp Nhà Vận Chuyển không thể thực hiện thành
            công bất kỳ Thỏa Thuận Với Khách Hàng nào vì (i) Địa chỉ giao Sản Phẩm được nêu trong
            Đơn Hàng không chính xác; (ii) Khách Hàng không liên lạc được sau rất nhiều nỗ lực – số
            lần nỗ lực giao Sản Phẩm sẽ được xác định bởi Nhà Vận Chuyển; hoặc (iii) Khách Hàng từ
            chối và hủy Đơn Hàng khi Sản Phẩm được giao đến địa chỉ được nêu cụ thề trong Đơn Hàng.
          </li>
          <li>
            <b>Nhà Vận Chuyển:</b> Một bên thứ ba, bao gồm nhưng không giới hạn Vietnam Post, Ho Chi
            Minh Post, Giao Hàng Nhanh, do Medofa, theo toàn quyền quyết định của mình, chỉ định để
            vận chuyển Sản Phẩm của Nhà Cung Cấp.
          </li>
          <li>
            <b>Ngày Làm Việc:</b> Thứ Hai đến Thứ Bảy, từ 9 giờ sáng đến 6 giờ chiều, là khoảng thời
            gian mà ngân hàng thương mại tiến hành giao dịch tại Việt Nam, ngoại trừ Chủ nhật và các
            ngày nghỉ lễ của Việt Nam.
          </li>
          <li>
            <b>Nơi Chỉ Định Của Medofa:</b> là địa điểm giao hàng do Medofa chỉ định để Công ty TNHH
            Dược phẩm Dayton giao đến hoặc Nhà Vận Chuyển đến lấy.
          </li>
          <li>
            <b>Phí Dịch Vụ:</b> Là khoản phí cho các Dịch Vụ (như định nghĩa dưới đây) mà Medofa sẽ
            phát hành hóa đơn cho Nhà Cung Cấp, được thể hiện là Phí Dịch Vụ Vận Hành và những khoản
            phí khác phát sinh cho Công ty TNHH Dược phẩm Dayton trong thời gian thực hiện Điều
            Khoản Dịch Vụ, Phí liên quan đến Các Dịch Vụ Thực Hiện Bởi Medofa như được định nghĩa
            trong Điều Khoản Dịch Vụ, Điều Khoản và Điều kiện chung.
          </li>
          <li>
            <b>Quy Định Pháp Luật:</b> Bao gồm toàn bộ Luật, Bộ Luật, Pháp lệnh, quy định hành
            chính, và các quy định có hiệu lực pháp luật khác theo thời gian, bao gồm nhưng không
            giới hạn những vấn đề quy định về môi trường và an toàn về sức khỏe.
          </li>
          <li>
            <b>Trung Tâm Nhà Cung Cấp:</b> một trung tâm công nghệ thông tin quản lý bởi Medofa, bao
            gồm tất cả thông tin về Đơn Hàng, Sản Phẩm, và khoản giao dịch giữa Công ty TNHH Dược
            phẩm Dayton và Khách Hàng.
          </li>
          <li>
            <b>Thông Tin Nội Dung:</b> Là những thông tin chính xác và đầy đủ về sản phẩm, ký tự,
            hình ảnh, và bất kỳ thông tin nào khác liên quan đến Sản Phẩm tuân thủ theo quy định
            được lập ra bởi Medofa cho Hạng Mục Sản Phẩm được áp dụng, theo hình thức và tuân thủ
            theo quy trình yêu cầu bởi Medofa.
          </li>
          <li>
            <b>Thỏa Thuận Với Khách Hàng:</b> Thỏa thuận giữa Công ty TNHH Dược phẩm Dayton và Khách
            Hàng liên quan đến việc mua bán Sản Phẩm trong phạm vi Đơn Hàng.
          </li>
          <li>
            <b>Sản Phẩm:</b> Là sản phẩm có thực (kể cả các bộ phận lắp ráp hoặc phụ tùng của sản
            phẩm đó, bao gồm cả bao bì nguyên gốc của nhà sản xuất) mà Công ty TNHH Dược phẩm Dayton
            dự kiến niêm yết và bán cho Khách Hàng trên và thông qua Sàn Giao Dịch.
          </li>
        </ol>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(TermsOfService);
