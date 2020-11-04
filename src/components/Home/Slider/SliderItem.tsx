import React, { FC } from 'react';

type SliderItemProps = {
  imageUrl: string;
};

const SliderItem: FC<SliderItemProps> = (props) => {
  return (
    <div className="banner__slide">
      <div className="banner__bg-img"></div>
      <div
        className="banner__img"
        style={{
          backgroundImage: `url("${props.imageUrl}")`
        }}
      />
    </div>
  );
};

export default SliderItem;
