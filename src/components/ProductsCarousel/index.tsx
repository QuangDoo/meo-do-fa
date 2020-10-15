import React from 'react'
import Slider from 'react-slick'
import ProductCard, { Product } from '../Shared/ProductCard'

type ProductsCarouselProps = {
  products: Product[]
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <button onClick={onClick} className={className} aria-disabled="true" style={{ ...style }}>
      <i className="fas fa-chevron-left"></i>
    </button>
  )
}

const NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <button onClick={onClick} className={className} aria-disabled="true" style={{ ...style }}>
      <i className="fas fa-chevron-right"></i>
    </button>
  )
}

export const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Slider
      speed={500}
      slidesToShow={5}
      slidesToScroll={3}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
    >
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </Slider>
  )
}
