import { TFunction } from 'next-i18next'
import React from 'react'
import { withTranslation } from '../../../i18n'

// All components needs "t" prop from next-i18n
// use t('id') to translate message
type FooterProps = {
  readonly t: TFunction
}

const Footer: React.FC<FooterProps> = ({ t }) => {
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
                      className="img-fluid"
                      title="thuocsi.vn"
                      src="/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg"
                    />
                  </a>
                </div>
              </div>
              <div className="footer__info-title mb-3">
                <b className="text-primary">thuocsi.vn</b> {t('FOOTER.WEBSITE_OWNERSHIP')}
              </div>
              <p className="footer__info-company">
                <b>{t('FOOTER.COMPANY_NAME')}</b>

                <br />

                {t('FOOTER.COMPANY_ADDRESS_LABEL') + ': '}
                <b>{t('FOOTER.COMPANY_ADDRESS')}</b>

                <br />

                {t('FOOTER.BUSINESS_CERTIFICATE_LABEL') + ': '}
                <b>
                  {t('FOOTER.BUSINESS_CERTIFICATE_NUMBER') +
                    ', ' +
                    t('FOOTER.BUSINESS_CERTIFICATE_ISSUE_DATE') +
                    ', '}
                </b>

                <br />

                {t('FOOTER.BUSINESS_CERTIFICATE_ISSUED_AT')}

                <br />

                {t('FOOTER.ECOMMERCE_LICENSE_LABEL') + ': '}
                <b>
                  <a
                    className="footer__link"
                    href="https://buymed-storage.s3-ap-southeast-1.amazonaws.com/trading_license/1.+Trading+License+-+Buymed+(GC+20+June+2019)+(VN).pdf"
                  >
                    {t('FOOTER.ECOMMERCE_LICENSE_NUMBER')}
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
                    className="img-fluid"
                    src="/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png"
                    title="Dấu đỏ của Bộ Công Thương"
                  />
                </a>
              </div>
            </div>
            <div className="mb-5">
              <div className="footer__header mb-3">{t('FOOTER.GENERAL_INFO')}</div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <a className="footer__link" href="https://thuocsi.vn/FOOTER.ABOUT_US">
                    {t('FOOTER.ABOUT_US')}
                  </a>

                  <br />

                  <a className="footer__link" href="https://thuocsi.vn/privacy-policy">
                    {t('FOOTER.PRIVACY_POLICY')}
                  </a>

                  <br />

                  <a
                    className="footer__link"
                    href="https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-"
                  >
                    {t('FOOTER.FAQ')}
                  </a>

                  <br />

                  <a className="footer__link" href="https://thuocsi.vn/general-policy">
                    {t('FOOTER.GENERAL_POLICY')}
                  </a>

                  <br />

                  <a
                    className="footer__link"
                    href="https://career.thuocsi.vn/"
                    title={t('header:HEADER.RECRUITMENT')}
                  >
                    {t('common:COMMON.RECRUITMENT')}
                  </a>
                </div>

                <div className="col-12 col-sm-6">
                  <a className="footer__link" href="https://thuocsi.vn/conditions-of-use">
                    {t('FOOTER.TERMS_OF_SERVICE')}
                  </a>

                  <a className="footer__link" href="https://thuocsi.vn/dispute-resolution">
                    {t('FOOTER.DISPUTE_RESOLUTION')}
                  </a>

                  <a className="footer__link" href="https://thuocsi.vn/terms-and-condition">
                    {t('FOOTER.TERMS_AND_CONDITIONS')}
                  </a>

                  <a className="footer__link" href="https://thuocsi.vn/regulations">
                    {t('FOOTER.OPERATING_REGULATIONS')}
                  </a>

                  <a
                    className="footer__link"
                    href="https://supplier.thuocsi.vn/"
                    title={t('header:HEADER.SUPPLY')}
                  >
                    {t('common:COMMON.SUPPLY')}
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-5 mb-sm-0">
              <div className="footer__header mb-3">{t('FOOTER.DELIVERY')}</div>

              <div>
                <img
                  alt="thuocN"
                  className="img-fluid footer__delivery"
                  src="/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png"
                  alt="thuocN"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png"
                  alt="thuocN"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png"
                  alt="thuocN"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png"
                  alt="thuocN"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png"
                  alt="thuocN"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer__header mb-3">{t('FOOTER.CONTACTS')}</div>

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
              <small>{t('FOOTER.WORK_TIME')}</small>
              <p />
            </div>
            <div className="footer__app mb-3">
              <div className="footer__app-ios">
                <img
                  src="/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png"
                  alt="thuocN"
                />
              </div>
              <div className="footer__app-android">
                <img
                  src="/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png"
                  alt="thuocN"
                />
              </div>
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              <a href="https://apps.apple.com/vn/app/thuocsi/id1518730923">
                <img
                  className="img-fluid"
                  src="/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png"
                  alt="thuocN"
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.buymed.app&hl=en_US">
                <img
                  className="img-fluid"
                  src="/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png"
                  alt="thuocN"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">{t('FOOTER.COPYRIGHT')}</div>
    </div>
  )
}

export default withTranslation(['footer', 'common'])(Footer)
