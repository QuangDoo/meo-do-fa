import React from 'react'
import ProducerInformation from './ProductInformation/ProducerInformation';
import ProductInformation from './ProductInformation/ProductInformation';
import RelativeProducts from './RelativeProducts';
type IngredientsType = {
    name: string,
    content: number
}
type PropsType = {
    imageUrl: string,
    titleImage: string,
    altImage: string
    name: string,
    description: string,
    views: number,
    totalOrders: number
    producer: string
    category: string
    ingredients: IngredientsType[]
}
const ProductDetailComponent = (props: PropsType) => {

    return (
        <>
            <ProductInformation {...props} />
            <ProducerInformation />
            <hr />
            <RelativeProducts />
        </>
    )
}
export default ProductDetailComponent;