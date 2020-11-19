import React from 'react';
import SlickSlider from 'react-slick';

import SliderItem from './SliderItem';

const Slider: React.FC = () => {
  return (
    <SlickSlider
      arrows={false}
      autoplay
      dots
      dotsClass="slick__dots bullet slick-dots"
      className="align-items-center mb-0 slick-dotted">
      <SliderItem imageUrl="https://images.medofa.vn/oXdHydi6aC3P9nHYududVJw9" />
      <SliderItem imageUrl="https://images.medofa.vn/htbavM8nVz1Z697x6DAXmrYa" />
      <SliderItem imageUrl="https://images.medofa.vn/AfxNH2kUp1EXcDuMrVFgzsuA" />
    </SlickSlider>
  );
};

export default Slider;
