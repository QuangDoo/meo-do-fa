import { useMutation } from '@apollo/client';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex, noSpecialChars } from 'src/assets/regex/email';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import {
  SAVE_MAIL_SUBSCRIBE,
  SubscriberData,
  SubscriberVar
} from 'src/graphql/subscribe/subscribe.mutation';

import Button from '../Form/Button';
import Input from '../Form/Input';
import BackToTop from '../Layout/BackToTop';

const links: { href: string; i18nKey: string }[] = [
  { href: '/about-us', i18nKey: 'footer:about_us' },
  { href: '/terms-of-use', i18nKey: 'footer:terms_of_use' },
  { href: '/privacy-policy', i18nKey: 'footer:privacy_policy' },
  { href: '/help/account', i18nKey: 'footer:faq' },
  // { href: '/general-policy', i18nKey: 'footer:general_policy' },
  // { href: '/career', i18nKey: 'common:recruitment' },
  { href: '/terms-of-service', i18nKey: 'footer:terms_of_service' },
  { href: '/dispute-resolution', i18nKey: 'footer:dispute_resolution' }
  // { href: '/terms-and-conditions', i18nKey: 'footer:terms_and_conditions' },
  // { href: '/operating-regulations', i18nKey: 'footer:operating_regulations' }
  // { href: '', i18nKey: 'common:supply' }
];

const linksHalfLength = links.length / 2;

const FooterLink = (props: { href: string; text: string }) => (
  <Link href={props.href}>
    <a className="footer__link">{props.text}</a>
  </Link>
);

type Inputs = {
  email: string;
};

const Footer = (): JSX.Element => {
  const { t } = useTranslation(['footer', 'common']);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [saveMailSubscriber, { loading: loadingSubcribe }] = useMutation<
    SubscriberData,
    SubscriberVar
  >(SAVE_MAIL_SUBSCRIBE, {
    onCompleted: (data) => {
      toast.success(t('footer:success_subscribe'));
    },
    onError: (error) => {
      toast.error(error);
      // error.graphQLErrors.length > 0 &&
      //   toast.error(t(`errors:code_${error.graphQLErrors[0].extensions.code}`));
    }
  });
  // On form error
  const onError = (errors: DeepMap<Inputs, FieldError>) => {
    Object.keys(errors).forEach((field) => toast.error(errors[field].message));
  };

  const onSubmit = (data: Inputs) => {
    saveMailSubscriber({
      variables: {
        inputs: {
          email: data.email
        }
      }
    }).catch((error) => toast.error(error));
    reset({ email: '' });
  };

  return (
    <>
      <div className="subscribe-container">
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-xs col-md-7 text-md-center mb-2">
              <div className="row  align-items-center">
                <div className="col-sm-auto d-none d-md-block col-12 align-items-end text-center">
                  <img
                    style={{ height: '80px' }}
                    src="/assets/images/newsletter.png"
                    alt="newsletter"
                    className="img-fluid"
                  />
                </div>
                <div className="mb-2 mb-md-0 ml-sm-3 col-md text-center text-md-left">
                  <p className="font-weight-bold mb-0">{t('footer:subscribe_title')}</p>
                  <p className=" d-none d-md-block mt-1 mb-0 ">{t('footer:subscribe_content')}</p>
                </div>
              </div>
            </div>

            <form
              className=" align-items-center d-flex justify-content-center text-sm-left text-center col-md-5 col-12"
              onSubmit={handleSubmit(onSubmit, onError)}>
              <Input
                name="email"
                containerClass="group-input-footer"
                iconClass="icomoon icon-mail"
                placeholder={t('footer:email_input')}
                ref={register({
                  pattern: {
                    value: emailRegex,
                    message: `${t('register:input_email_error_invalid')}`
                  },
                  validate: {
                    noSpecialChars: (value) =>
                      noSpecialChars.test(value) ||
                      `${t('register:input_email_error_noSpecialChars')}`
                  }
                })}
                itemRight={
                  <Button type="submit" variant="primary">
                    {t('footer:subscribe')}
                  </Button>
                }
              />
              <div className="mb-1"></div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container pb-5 pt-0">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-4  col-sm-12">
              <div className="footer__info mb-5">
                <div className="footer__info-logo mb-3">
                  <div className="rockland-logo d-inline-block">
                    <Link href="/">
                      <a title="Medofa.com">
                        <img
                          alt="Medofa.com"
                          className="img-fluid logo-footer"
                          title="Medofa.com"
                          src="/assets/images/logo3.png"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="footer__info-title mb-3">
                  <b className="text-primary">Medofa.com</b> {t('footer:website_ownership')}
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

                  {/* {t('footer:ecommerce_license_label') + ': '}
                  <b>
                    <FooterLink
                      href="/ecommerce-license"
                      text={t('footer:ecommerce_license_number')}
                    />
                  </b> */}
                </p>

                {/* <div className="footer__bct">
                <a rel="nofollow">
                  <img
                    alt="Dấu đỏ của Bộ Công Thương"
                    className="img-fluid"
                    src="/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png"
                    title="Dấu đỏ của Bộ Công Thương"
                  />
                </a>
              </div> */}
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-4 col-sm-7">
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
            </div>
            <div className="col-xl-4 col-lg-3 col-md-4 col-sm-5">
              <div className="footer__header mb-3">{t('footer:contacts')}</div>

              <div className="mb-3">
                <p className="d-flex align-items-center">
                  <i className="far fa-envelope footer__icon footer__icon--email" />

                  <a
                    className="footer__link footer__link--email px-2 mr-2"
                    href="mailto: info@medofa.com">
                    info@medofa.com
                  </a>

                  {/* <a className="footer__icon footer__icon--fb">
                    <i className="fab fa-facebook-f" />
                  </a> */}
                </p>
                <p />
                <div className="d-flex align-items-center">
                  <i className="fa fa-phone footer__icon footer__icon--email" />
                  <a className="text-white px-2 mr-2" href="tel:1900232436">
                    1900232436
                  </a>
                </div>
                {/* <small>{t('footer:work_time')}</small> */}
                <p />
              </div>
              <div className="mb-5 mb-sm-0">
                <div className="footer__header mb-3">{t('footer:delivery')}</div>

                <div>
                  <img
                    className="img-fluid footer__delivery"
                    src="/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png"
                    alt="logo-ghtk"
                  />

                  <img
                    className="img-fluid footer__delivery"
                    src="/assets/images/pharma-logistics-logo.png"
                    alt="logo-logistics-pharma"
                  />

                  {/* <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png"
                  alt="MEDOFA"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png"
                  alt="MEDOFA"
                />

                <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png"
                  alt="MEDOFA"
                /> */}

                  {/* <img
                  className="img-fluid footer__delivery"
                  src="/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png"
                  alt="MEDOFA"
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">{t('footer:copyright')}</div>
        <LoadingBackdrop open={loadingSubcribe} />
        <BackToTop />
      </div>
    </>
  );
};

export default Footer;
