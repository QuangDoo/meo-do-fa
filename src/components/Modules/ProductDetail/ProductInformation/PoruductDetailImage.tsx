import React from 'react';

const ProuductDetailImage = (props): JSX.Element => {
  return (
    <div className="col-md-4">
      <div className="d-flex justify-content-between mb-2">
        <div className="product__thumbnails scrollbar-on-hover pr-1 mr-3">
          <div className="d-flex flex-column">
            <img
              alt="Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1"
              className="img-fluid product__thumbnail lozad selected"
              src={`data:image/jpeg;base64,${props.imageUrl}`}
              title="Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1"
            />
          </div>
        </div>
        <div className="flex-grow-1">
          <div
            className="lozad product__image"
            style={{ backgroundImage: `url(data:image/jpeg;base64,${props.imageUrl})` }}
          />
        </div>
      </div>
      <small className="text-muted">* Hình sản phẩm có thể thay đổi theo thời gian</small>
    </div>
  );
};
export default ProuductDetailImage;
