import { useTranslation } from 'i18n';
import React from 'react';

const Question = () => {
  const { t } = useTranslation('question');
  return (
    <section className="container py-5 home__faq">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="text-primary mb-3">{t('question:top_questions')}</h2>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029452912-C%C3%A1ch-%C4%91%C4%83ng-k%C3%BD-v%C3%A0-%C4%91%C4%83ng-nh%E1%BA%ADp-t%C3%A0i-kho%E1%BA%A3n-t%E1%BA%A1i-medofa-vn"
            target="_blank"
            rel="noreferrer"
            title={t('question:register_and_login')}>
            {t('question:register_and_login')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029452652-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%B7t-h%C3%A0ng"
            target="_blank"
            rel="noreferrer"
            title={t('question:order_guide')}>
            ⭑ {t('question:order_guide')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360030488231-Qu%C3%AAn-m%E1%BA%ADt-kh%E1%BA%A9u-%C4%91%C4%83ng-nh%E1%BA%ADp"
            target="_blank"
            rel="noreferrer"
            title={t('question:forgot_password')}>
            {t('question:forgot_password')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029505332-D%C3%B9ng-th%E1%BB%AD-t%E1%BA%A1i-website-medofa-vn-"
            target="_blank"
            rel="noreferrer"
            title={t('question:trial')}>
            {t('question:trial')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360030159252-Nh%C6%B0-th%E1%BA%BF-n%C3%A0o-l%C3%A0-h%C3%A0ng-c%E1%BA%ADn-date-H%E1%BA%A1n-s%E1%BB%AD-d%E1%BB%A5ng-c%C3%B2n-bao-l%C3%A2u-"
            target="_blank"
            rel="noreferrer"
            title={t('question:product_expired')}>
            {t('question:product_expired')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029773811-Thanh-to%C3%A1n-b%E1%BA%B1ng-h%C3%ACnh-th%E1%BB%A9c-chuy%E1%BB%83n-kho%E1%BA%A3n-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-"
            target="_blank"
            rel="noreferrer"
            title={t('question:transfer_payment')}>
            {t('question:transfer_payment')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360030900651-T%E1%BA%A1i-sao-t%C3%B4i-kh%C3%B4ng-thanh-to%C3%A1n-%C4%91%C6%B0%E1%BB%A3c"
            target="_blank"
            rel="noreferrer"
            title={t('question:payment_not_possible')}>
            {t('question:payment_not_possible')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029453432-Xu%E1%BA%A5t-h%C3%B3a-%C4%91%C6%A1n-%C4%91%E1%BB%8F-t%E1%BA%A1i-medofa-vn-"
            target="_blank"
            rel="noreferrer"
            title={t('question:vat_invoice')}>
            {t('question:vat_invoice')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360029396272-T%C3%B4i-mu%E1%BB%91n-ch%E1%BB%89nh-l%E1%BA%A1i-%C4%91%C6%A1n-h%C3%A0ng-th%C3%AC-l%C3%A0m-c%C3%A1ch-n%C3%A0o-"
            target="_blank"
            rel="noreferrer"
            title={t('question:reorder')}>
            {t('question:reorder')}
          </a>
        </div>
        <div className="col-12 col-sm-6">
          <a
            className="home__faq-item"
            href="https://medofa.zendesk.com/hc/vi/articles/360030403531-Th%E1%BB%9Di-gian-giao-h%C3%A0ng-d%E1%BB%B1-ki%E1%BA%BFn"
            target="_blank"
            rel="noreferrer"
            title="Thời gian giao hàng dự kiến">
            {t('question:delivery_expected')}
          </a>
        </div>
        <div className="col-12 text-center mt-3">
          <a className="btn btn-white" href="/help" target="_blank" rel="noreferrer">
            {t('question:see_all_question')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Question;
