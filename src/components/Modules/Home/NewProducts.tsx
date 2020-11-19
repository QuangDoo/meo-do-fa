import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import {
  GET_NEW_PRODUCTS,
  GetNewProductsData,
  GetNewProductsVars
} from 'src/graphql/product/getNewProducts';

import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const NewProducts = (): JSX.Element => {
  const { data } = useQuery<GetNewProductsData, GetNewProductsVars>(GET_NEW_PRODUCTS, {
    variables: {
      page: 1,
      pageSize: 10
    }
  });

  const newProducts = data?.getProductByConditions.Products || [];

  return (
    <ProductsContainer title="Sản phẩm mới" seeMoreUrl="#">
      <ProductsCarousel products={newProducts} />
    </ProductsContainer>
  );
};
