import React, { FC } from 'react';

type PartnerImgProps = {
  imgUrl: string;
};

const PartnerImg: FC<PartnerImgProps> = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img src={props.imgUrl} alt="" className="img-fluid " />
    </div>
  );
};

export default PartnerImg;
