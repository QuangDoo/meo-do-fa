import React from 'react';

const ProuductDetailImage = (props): JSX.Element => {
  return (
    <div className="col-12">
      <div className="d-flex justify-content-between mb-2">
        <div className="product__thumbnails scrollbar-on-hover pr-1 mr-3">
          <div className="d-flex flex-column">
            <img
              className="img-fluid product__thumbnail lozad selected"
              src={
                props.imageUrl
                  ? `data:image/jpeg;base64,${props.imageUrl}`
                  : 'https://static.tinnhanhchungkhoan.vn/2020/mobile/styles/img/no-img.png'
              }
              alt=""
            />
          </div>
        </div>
        <div className="flex-grow-1">
          <div
            className="lozad product__image"
            style={{
              backgroundImage:
                props.imageUrl !== 'false'
                  ? `url(data:image/jpeg;base64,${props.imageUrl})`
                  : `url('/assets/images/no-image.jpg')`
            }}
          />
        </div>
      </div>
      <small className="text-muted">* Hình sản phẩm có thể thay đổi theo thời gian</small>
    </div>
  );
};
export default ProuductDetailImage;
