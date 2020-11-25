import React from 'react';

type Props = {
  bannerImgUrl: string;
  rightImgUrl: string;
};

function Banner(props: Props) {
  return (
    <>
      <section className="banner">
        <div className="banner-bg">
          <div className="banner-img" style={{backgroundImage:`url(${props.bannerImgUrl})`}}>
            {/* <img src={props.bannerImgUrl} alt="Join us now" /> */}
          </div>
          <div className="banner-overlay"></div>
        </div>
        <div className="banner-conent container text-white text-center">
          <h3 className="banner-title mb-3">Join us now</h3>
          <div className="banner-text">
            We build health ecosystems which no one else has dared to build.
          </div>
        </div>
      </section>
      <div className="container">
        <div className="mt-3 mb-3">
          <div className="row align-items-center">
            <div className="col-md-6 animated fadeIn">
              <div className="wrapper">
                <h3 className="about-us__title">We Modernise Healthcare Distribution</h3>
                <p>
                  Thuocsi.vn is the leading e-commerce healthcare e-commerce platform in Vietnam.
                  The platform serves healthcare practices including pharmacies, clinics and
                  hospitals by providing a wide variety of products with quality service and fast
                  delivery
                </p>
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
