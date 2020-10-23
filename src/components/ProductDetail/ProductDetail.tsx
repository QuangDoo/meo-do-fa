import React from 'react'
import ProducerInformation from './ProductInformation/ProducerInformation';
import ProductInformation from './ProductInformation/ProductInformation';
import RelativeProducts from './RelativeProducts';
type IngredientsType = {
    name: string,
    content: number
}

const ProductDetailComponent = (props) => {

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