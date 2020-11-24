import { useTranslation } from 'i18n';
import React from 'react';

const Strength = (): JSX.Element => {
  const { t } = useTranslation(['strength']);

  return (
    <section className="rockland-whyus">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6 col-12 reason-item">
            <div className="row">
              <div className="col-xl-12 col-md-4 col-4">
                <i className="icomoon icon-quality mr-1" />
              </div>
              <div className="col-xl-12 col-md-8 col-8 description">
                <div className="content">
                  <div className="title">{t('strength:title1')}</div>
                  <div className="sub-title">{t('strength:content1')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-12 reason-item">
            <div className="row">
              <div className="col-xl-12 col-md-4 col-4 fontawesome">
                <i className="icomoon icon-news-professional mr-1" />
              </div>
              <div className="col-xl-12 col-md-8 col-8 description">
                <div className="content">
                  <div className="title">{t('strength:title2')}</div>
                  <div className="sub-title">{t('strength:content2')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-12 reason-item">
            <div className="row">
              <div className="col-xl-12 col-md-4 col-4">
                <i className="icomoon icon-ship-express mr-1" />
              </div>
              <div className="col-xl-12 col-md-8 col-8 description">
                <div className="content">
                  <div className="title">{t('strength:title3')}</div>
                  <div className="sub-title">{t('strength:content3')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-12 reason-item">
            <div className="row">
              <div className="col-xl-12 col-md-4 col-4">
                <i className="icomoon icon-support mr-1" />
              </div>
              <div className="col-xl-12 col-md-8 col-8 description">
                <div className="content">
                  <div className="title">{t('strength:title4')}</div>
                  <div className="sub-title">{t('strength:content4')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strength;
