import React from 'react'

type ProductImageProps = {
  imageId: string
}

export const ProductImage = (props: ProductImageProps) => (
  <a>
    <div
      className="product-card__image mb-3 lozad"
      style={{
        backgroundImage: `url(https://images.thuocsi.vn/${props.imageId})`,
        cursor: 'pointer',
      }}
    />
  </a>
)
