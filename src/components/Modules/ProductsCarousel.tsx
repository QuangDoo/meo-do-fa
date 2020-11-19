import React from 'react';
import Slider from 'react-slick';
import { Product } from 'src/types/Product';

import ProductCard from './ProductCard';

type ProductsCarouselProps = {
  products?: Product[];
};

type ArrowButtonProps = {
  onClick?: () => void;
  type?: 'prev' | 'next';
};

const ArrowButton = ({ onClick, type = 'prev' }: ArrowButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`slide-arrow ${type}-arrow slick-arrow`}
      aria-disabled="true">
      <i className={`fas fa-chevron-${type === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};

export const ProductsCarousel = ({ products }: ProductsCarouselProps): JSX.Element => {
  return (
    <Slider
      speed={500}
      slidesToShow={5}
      slidesToScroll={3}
      prevArrow={<ArrowButton />}
      nextArrow={<ArrowButton type="next" />}
      className="m-0 p-0 slider_products"
      responsive={[
        {
          breakpoint: 1105,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 890,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]}>
      {products?.map((product, index) => (
        <div key={index} className="p-2">
          <ProductCard {...product} />
        </div>
      ))}
    </Slider>
  );
};
