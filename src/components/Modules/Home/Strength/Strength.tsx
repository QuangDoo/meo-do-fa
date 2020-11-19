import React from 'react';

const Strength = (): JSX.Element => {
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
                  <div className="title">sản phẩm chất lượng</div>
                  <div className="sub-title">từ nhà máy, nhà phân phối uy tín</div>
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
                  <div className="title">tin tức chuyên môn</div>
                  <div className="sub-title">cập nhật tin tức mới, và chính xác</div>
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
                  <div className="title">giao hàng nhanh</div>
                  <div className="sub-title">đảm bảo trong 36 giờ, an toàn và tin cậy</div>
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
                  <div className="title">đội ngũ chuyên nghiệp</div>
                  <div className="sub-title">tư vấn miễn phí, tận tình và chu đáo</div>
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
