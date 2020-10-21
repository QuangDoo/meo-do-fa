import React from 'react'

type ProductImageProps = {
  productUrl: string
  imageUrl: string
}

export const ProductImage = (props: ProductImageProps) => (
  <a href={props.productUrl}>
    <div
      className="product-card__image mb-3 lozad"
      style={{
        backgroundImage: `url(${props.imageUrl})`,
      }}
    />
  </a>
)
