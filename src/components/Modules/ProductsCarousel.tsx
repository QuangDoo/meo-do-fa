import React from 'react';
import Slider from 'react-slick';

import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

type ProductsCarouselProps = {
  products: Product[];
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
      className="m-0 p-0 slider_products">
      {products.map((product, index) => (
        <div key={index} className="p-2">
          <ProductCard {...product} />
        </div>
      ))}
    </Slider>
  );
};
