import { useQuery } from '@apollo/client';
import React from 'react';
import {
  GET_RELATED_PRODUCTS,
  GetRelatedProductsData,
  GetRelatedProductsVars
} from 'src/graphql/product/getRelatedProducts';

import { ProductsContainer } from '../Home/ProductsContainer';
import { ProductsCarousel } from '../ProductsCarousel';

const RelativeProducts = () => {
  const { data } = useQuery<GetRelatedProductsData, GetRelatedProductsVars>(GET_RELATED_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 10
    }
  });

  const relatedProducts = data?.getProductByConditions.Products || [];

  return (
    <ProductsContainer title="Có thể bạn muốn mua " seeMoreUrl="#">
      <ProductsCarousel products={relatedProducts} />
    </ProductsContainer>
  );
};

export default RelativeProducts;
