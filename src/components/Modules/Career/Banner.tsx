import { useTranslation } from 'i18n';
import React from 'react';

type Props = {
  bannerImgUrl: string;
  rightImgUrl: string;
};

function Banner(props: Props) {
  const { t } = useTranslation('career');
  return (
    <>
      <section className="banner">
        <div className="banner-bg">
          <div className="banner-img" style={{ backgroundImage: `url(${props.bannerImgUrl})` }}>
            {/* <img src={props.bannerImgUrl} alt="Join us now" /> */}
          </div>
          <div className="banner-overlay"></div>
        </div>
        <div className="banner-conent container text-white text-center">
          <h3 className="banner-title mb-3">{`${t('career:banner_title')}`}</h3>
          <div className="banner-text">{`${t('career:banner_test')}`}</div>
        </div>
      </section>
      <div className="container">
        <div className="mt-3 mb-3">
          <div className="row align-items-center">
            <div className="col-md-6 animated fadeIn">
              <div className="wrapper">
                <h3 className="about-us__title">{`${t('career:about_us_title')}`}</h3>
                <p>{`${t('career:about_us_test')}`}</p>
              </div>
            </div>
            <div className="col-md-6 animated fadeOut">
              <div className="wrapper">
                <img src={props?.rightImgUrl} alt="medofa" className="about-us__img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
