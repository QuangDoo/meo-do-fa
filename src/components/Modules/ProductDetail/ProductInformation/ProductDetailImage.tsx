import React from 'react';

const ProuductDetailImage = (props): JSX.Element => {
  return (
    <div className="col-12">
      <div className="d-flex justify-content-between mb-2">
        <div className="flex-grow-1">
          <div
            className="lozad product__image"
            style={{
              backgroundImage: `url(${props.imageUrl})`
            }}
          />
        </div>
      </div>
      <small className="text-muted">* Hình sản phẩm có thể thay đổi theo thời gian</small>
    </div>
  );
};
export default ProuductDetailImage;
