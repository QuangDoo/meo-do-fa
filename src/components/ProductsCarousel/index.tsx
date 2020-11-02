import React from 'react';
import Slider from 'react-slick';

import ProductCard, { Product } from '../ProductCard';
import { ArrowButton } from './ArrowButton';

type ProductsCarouselProps = {
  products: Product[];
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
