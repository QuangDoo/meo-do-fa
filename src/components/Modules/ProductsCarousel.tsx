import React from 'react';
import Slider from 'react-slick';
import { Product } from 'src/graphql/product/getProducts';

import ProductCard from './ProductCard';

type ProductsCarouselProps = {
  products?: Product[];
};

type ArrowButtonProps = {
  onClick?: () => void;
  type?: 'prev' | 'next';
};

const ArrowButton = ({ onClick, type = 'prev' }: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`slide-arrow ${type}-arrow slick-arrow`}
      aria-disabled="true">
      <i className={`fas fa-chevron-${type === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Slider
      speed={500}
      slidesToShow={Math.min(5, products.length)}
      slidesToScroll={3}
      prevArrow={<ArrowButton />}
      nextArrow={<ArrowButton type="next" />}
      className="m-0 p-0 slider_products"
      responsive={[
        {
          breakpoint: 1105,
          settings: {
            slidesToShow: Math.min(4, products.length),
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 890,
          settings: {
            slidesToShow: Math.min(3, products.length),
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: Math.min(2, products.length),
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
