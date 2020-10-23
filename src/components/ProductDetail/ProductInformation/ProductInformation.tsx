import React from 'react'
import ProuductDetailImage from './PoruductDetailImage'
import ProductDetailInfor from '../ProductDetaiInfor'
type PropsType = {
  imageUrl: string
  name: string
  description: string
  views: number
  totalOrders: number
}
const ProductInformation = (props: PropsType) => {
  return (
    <div className="row py-3 mb-5 elevated">
      <ProuductDetailImage imageUrl={props.imageUrl} />
      <ProductDetailInfor />
    </div>
  )
}
export default ProductInformation
