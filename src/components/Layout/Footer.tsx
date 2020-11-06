import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

const links: { href: string; i18nKey: string }[] = [
  { href: '', i18nKey: 'footer:about_us' },
  { href: '', i18nKey: 'footer:privacy_policy' },
  { href: '', i18nKey: 'footer:faq' },
  { href: '', i18nKey: 'footer:general_policy' },
  { href: '', i18nKey: 'common:recruitment' },
  { href: '', i18nKey: 'footer:terms_of_service' },
  { href: '', i18nKey: 'footer:dispute_resolution' },
  { href: '', i18nKey: 'footer:terms_and_conditions' },
  { href: '', i18nKey: 'footer:operating_regulations' },
  { href: '', i18nKey: 'common:supply' }
];

const linksHalfLength = links.length / 2;

const FooterLink = (props: { href: string; text: string }) => (
  <Link href={props.href}>
    <a className="footer__link">{props.text}</a>
  </Link>
);

const Footer = ({ t }: WithTranslation): JSX.Element => {
  return (
    <div className="footer">
      <div className="container pb-5">
        <div className="row justify-content-between">
          <div className="col-md-6">
            <div className="footer__info mb-5">
              <div className="footer__info-logo mb-3">
                <div className="buymed-logo d-inline-block">
                  <Link href="/">
                    <a title="thuocsi.vn">
                      <img
                        alt="thuocsi.vn"
                        className="img-fluid logo-footer"
                        title="thuocsi.vn"
                        src="/assets/images/logo3.png"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="footer__info-title mb-3">
                <b className="text-primary">thuocsi.vn</b> {t('footer:website_ownership')}
              </div>
              <p className="footer__info-company">
                <b>{t('footer:company_name')}</b>

                <br />

                {t('footer:company_address_label') + ': '}
                <b>{t('footer:company_address')}</b>

                <br />

                {t('footer:business_certificate_label') + ': '}
                <b>
                  {t('footer:business_certificate_number') +
                    ', ' +
                    t('footer:business_certificate_issue_date') +
                    ', '}
                </b>

                <br />

                {t('footer:business_certificate_issued_at')}

                <br />

                {t('footer:ecommerce_license_label') + ': '}
                <b>
                  <FooterLink
                    href="/ecommerce-license"
                    text={t('footer:ecommerce_license_number')}
                  />
                </b>
              </p>

              <div className="footer__bct">
                <a rel="nofollow">
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
              <div className="footer__header mb-3">{t('footer:general_info')}</div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  {links.slice(0, linksHalfLength).map((link, index) => (
                    <React.Fragment key={link.i18nKey}>
                      <FooterLink href={link.href} text={t(link.i18nKey)} />
                      {index < linksHalfLength - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>

                <div className="col-12 col-sm-6">
                  {links.slice(linksHalfLength).map((link, index) => (
                    <React.Fragment key={link.i18nKey}>
                      <FooterLink href={link.href} text={t(link.i18nKey)} />
                      {index < linksHalfLength * 2 - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-5 mb-sm-0">
              <div className="footer__header mb-3">{t('footer:delivery')}</div>

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
            <div className="footer__header mb-3">{t('footer:contacts')}</div>

            <div className="mb-3">
              <p className="d-flex align-items-center">
                <i className="far fa-envelope footer__icon footer__icon--email" />

                <a className="footer__link footer__link--email px-2 mr-2">hotro@thuocsi.vn</a>

                <a className="footer__icon footer__icon--fb">
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
              <small>{t('footer:work_time')}</small>
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
              <a>
                <img
                  className="img-fluid"
                  src="/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png"
                  alt="thuocN"
                />
              </a>
              <a>
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
      <div className="copyright">{t('footer:copyright')}</div>
    </div>
  );
};

export default withTranslation(['footer', 'common'])(Footer);
