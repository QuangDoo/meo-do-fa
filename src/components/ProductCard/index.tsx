import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { DiscountRibbon } from './DiscountRibbon'

import { BadgeType, ProductBadge } from './ProductBadge'
import { ProductImage } from './ProductImage'
import { ProductPrice } from './ProductPrice'
import { QuantityInput } from './QuantityInput'

export type Product = {
  name: string
  price: string
  unit: string
  category: string
  categoryId: string
  image: string
  id: string

  badges?: BadgeType[]
  new?: boolean
  discountPercent?: number
  supplier?: string
  oldPrice?: string
  deal?: boolean
  expirationDate?: string
}

const ProductCard = ({ badges = [], ...props }: Product) => {
  console.log('Product card data:', props)

  const router = useRouter()

  const onClick = () => {
    router.push(`/products/${props.id}`)
  }

  return (
    <div className="product-card-container">
      <article className={`product-card card ${props.deal ? 'deal-card' : ''}`}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.new && <div className="product-card__new-arrival">Mới</div>}

            {props.discountPercent && <DiscountRibbon discountPercent={props.discountPercent} />}

            <ProductImage imageId={props.image} productId={props.id} />

            <div>
              <Link href={`/products/${props.id}`}>
                <a className="text-decoration-none">
                  <h6 className="product-card__name">{props.name}</h6>
                </a>
              </Link>

              <div className="product__status mb-2">
                {badges.map((badgeType) => (
                  <ProductBadge
                    key={badgeType}
                    type={badgeType}
                    expirationDate={props.expirationDate}
                  />
                ))}
              </div>

              <small className="text-muted">{props.unit}</small>

              <br />

              <small className="text-muted product-card__category">
                Nhóm:{' '}
                <Link href={`/products?category=${props.categoryId}`}>
                  <a>{props.category}</a>
                </Link>
              </small>
            </div>
          </div>

          <div className="product-card__buy">
            <div className="mb-2">
              <ProductPrice price={props.price} />
            </div>

            <QuantityInput />
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductCard
