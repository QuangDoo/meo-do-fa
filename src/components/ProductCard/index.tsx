import { TFunction, WithTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { withTranslation } from '../../../i18n'
import useIsLoggedIn from '../../hooks/useIsLoggedIn'
import { DiscountRibbon } from './DiscountRibbon'
import LoginToSeePrice from './LoginToSeePrice'
import ProductBadge, { BadgeType } from './ProductBadge'
import { ProductImage } from './ProductImage'
import { ProductPrice } from './ProductPrice'
import QuantityInput from './QuantityInput'

export interface Product extends WithTranslation {
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
  readonly t: TFunction
}

const ProductCard = ({ badges = [], t, ...props }: Product) => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="product-card-container">
      <article className={`product-card card ${props.deal ? 'deal-card' : ''}`}>
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            {props.new && <div className="product-card__new-arrival">{t('productCard:new')}</div>}

            {props.discountPercent && <DiscountRibbon discountPercent={props.discountPercent} />}

            <ProductImage imageId={props.image} productId={props.id} />

            <div>
              <Link href={`/products/${props.id}`}>
                <a className="text-decoration-none">
                  <h6 className="product-card__name">{props.name}</h6>
                </a>
              </Link>

              <div className="product__status mb-2">
                {isLoggedIn &&
                  badges.map((badgeType) => (
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
                {t('productCard:category')}:{' '}
                <Link href={`/products?category=${props.categoryId}`}>
                  <a>{props.category}</a>
                </Link>
              </small>
            </div>
          </div>

          <div className="product-card__buy">
            {isLoggedIn ? (
              <>
                <div className="mb-2">
                  <ProductPrice price={props.price} />
                </div>
                <QuantityInput />
              </>
            ) : (
              <LoginToSeePrice />
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default withTranslation(['productCard'])(ProductCard)
