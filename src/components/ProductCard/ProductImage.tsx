import { useRouter } from 'next/router'
import React from 'react'

type ProductImageProps = {
  imageId: string
  productId: string
}

export const ProductImage = (props: ProductImageProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/products/${props.productId}`)
  }

  return (
    <a onClick={onClick}>
      <div
        className="product-card__image mb-3 lozad"
        style={{
          backgroundImage: `url(https://images.thuocsi.vn/${props.imageId})`,
          cursor: 'pointer',
        }}
      />
    </a>
  )
}
