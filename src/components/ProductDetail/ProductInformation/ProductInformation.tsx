import React from 'react'
import ProuductDetailImage from './PoruductDetailImage'
import ProductDetailInfor from '../ProductDetaiInfor'
type PropsType = {
  image_128: string
  image_256: string
  image_512: string
  name: string
  description: string
  views: number
  totalOrders: number
  price: number
}
const ProductInformation = (props: PropsType) => {
  return (
    <div className="row py-3 mb-5 elevated">
      <ProuductDetailImage imageUrl={props.image_128} />
      <ProductDetailInfor {...props} />
    </div>
  )
}
export default ProductInformation
