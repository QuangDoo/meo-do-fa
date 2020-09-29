import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container pb-5">
        <div className="row justify-content-between">
          <div className="col-md-6">
            <div className="footer__info mb-5">
              <div className="footer__info-logo mb-3">
                <div className="buymed-logo d-inline-block">
                  <a href="https://thuocsi.vn/" title="thuocsi.vn">
                    <img
                      alt="thuocsi.vn"
                      className="img-fluid lozad"
                      title="thuocsi.vn"
                      src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg"
                    />
                  </a>
                </div>
              </div>
              <div className="footer__info-title mb-3">
                <b className="text-primary">thuocsi.vn</b> là website thuộc sở hữu của công ty TNHH
                Buymed.
              </div>
              <p className="footer__info-company">
                <b>Công Ty TNHH Buymed</b>
                <br />
                Địa chỉ: <b>248A Nơ Trang Long, Phuờng 12, Quận Bình Thạnh, Hồ Chí Minh</b>
                <br />
                Số chứng nhận đăng ký kinh doanh: <b>0314758651, cấp ngày 29/11/2017,</b>
                <br />
                tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh
                <br />
                Số Giấy phép Sàn thương mại điện tử:{' '}
                <b>
                  <a
                    className="footer__link"
                    href="https://buymed-storage.s3-ap-southeast-1.amazonaws.com/trading_license/1.+Trading+License+-+Buymed+(GC+20+June+2019)+(VN).pdf"
                  >
                    0314758651/KD-0368
                  </a>
                </b>
              </p>
              <div className="footer__bct">
                <a
                  href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=52200"
                  rel="nofollow"
                >
                  <img
                    alt="Dấu đỏ của Bộ Công Thương"
                    className="img-fluid lozad"
                    data-src="https://assets.thuocsi.vn/assets/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png"
                    src="/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png"
                    title="Dấu đỏ của Bộ Công Thương"
                  />
                </a>
              </div>
            </div>
            <div className="mb-5">
              <div className="footer__header mb-3">Thông tin chung</div>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <a className="footer__link" href="https://thuocsi.vn/about-us">
                    Giới thiệu về thuocsi.vn
                  </a>
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/privacy-policy"
                  >
                    Chính sách bảo mật
                  </a>
                  <a
                    className="footer__link"
                    href="https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-"
                  >
                    Câu hỏi thường gặp (Q&amp;A)
                  </a>
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/general-policy"
                  >
                    Chính sách quy định chung
                  </a>
                  <a className="footer__link" href="https://career.thuocsi.vn/">
                    Tuyển dụng | Recruitment
                  </a>
                </div>
                <div className="col-12 col-sm-6">
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/conditions-of-use"
                  >
                    Điều khoản sử dụng
                  </a>
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/dispute-resolution"
                  >
                    Cơ chế giải quyết tranh chấp
                  </a>
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/terms-and-condition"
                  >
                    Thỏa thuận về dịch vụ TMDT
                  </a>
                  <a
                    className="footer__link"
                    data-modal="true"
                    href="https://thuocsi.vn/regulations"
                  >
                    Quy chế hoạt động
                  </a>
                  <a
                    className="footer__link"
                    href="https://supplier.thuocsi.vn/"
                    title="Đăng ký bán hàng cùng thuocsi"
                  >
                    Đăng ký bán hàng cùng thuocsi
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-5 mb-sm-0">
              <div className="footer__header mb-3">Dịch vụ giao hàng</div>
              <div>
                <img
                  alt="thuocN"
                  className="img-fluid footer__delivery lozad"
                  src="/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png"
                />
                <img
                  className="img-fluid footer__delivery lozad"
                  data-src="https://assets.thuocsi.vn/assets/delivery/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png"
                  src="/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png"
                  alt="thuocN"
                />
                <img
                  className="img-fluid footer__delivery lozad"
                  data-src="https://assets.thuocsi.vn/assets/delivery/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png"
                  src="/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png"
                  alt="thuocN"
                />
                <img
                  className="img-fluid footer__delivery lozad"
                  data-src="https://assets.thuocsi.vn/assets/delivery/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png"
                  src="/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png"
                  alt="thuocN"
                />
                <img
                  className="img-fluid footer__delivery lozad"
                  data-src="https://assets.thuocsi.vn/assets/delivery/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png"
                  src="/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png"
                  alt="thuocN"
                />
                <img
                  className="img-fluid footer__delivery lozad"
                  data-src="https://assets.thuocsi.vn/assets/delivery/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png"
                  src="/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png"
                  alt="thuocN"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer__header mb-3">Liên hệ</div>
            <div className="mb-3">
              <p className="d-flex align-items-center">
                <i className="far fa-envelope footer__icon footer__icon--email" />
                <a
                  className="footer__link footer__link--email px-2 mr-2"
                  href="mailto:hotro@thuocsi.vn"
                >
                  hotro@thuocsi.vn
                </a>
                <a
                  className="footer__icon footer__icon--fb"
                  href="https://www.facebook.com/thuocsivn/"
                >
                  <i className="fab fa-facebook-f" />
                </a>
              </p>
              <p />
              <div className="d-flex align-items-center">
                <i className="fa fa-phone footer__icon footer__icon--email" />
                <a className="text-white px-2 mr-2" href="tel:02873008840">
                  02 873 008 840
                </a>
              </div>
              <small>Từ T2 đến T6: 8:00 - 18:00</small>
              <p />
            </div>
            <div className="footer__app mb-3">
              <div className="footer__app-ios">
                <img
                  className="lozad"
                  src="/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png"
                  alt="thuocN"
                />
              </div>
              <div className="footer__app-android">
                <img
                  className="lozad"
                  src="/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png"
                  alt="thuocN"
                />
              </div>
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              <a href="https://apps.apple.com/vn/app/thuocsi/id1518730923">
                <img
                  className="img-fluid lozad"
                  src="/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png"
                  alt="thuocN"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.buymed.app&hl=en_US">
                <img
                  className="img-fluid lozad"
                  src="/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png"
                  alt="thuocN"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© Bản quyền thuộc Công Ty TNHH Buymed - 2020</div>
    </div>
  )
}

export default Footer
