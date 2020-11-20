import { useLazyQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import {
  GET_BEST_SELLING_PRODUCTS,
  GetBestSellingProductsData,
  GetBestSellingProductsVars
} from 'src/graphql/product/getBestSellingProducts';

import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const BestSelling = (): JSX.Element => {
  const [getBestSellingProducts, { data }] = useLazyQuery<
    GetBestSellingProductsData,
    GetBestSellingProductsVars
  >(GET_BEST_SELLING_PRODUCTS);

  useEffect(() => {
    getBestSellingProducts({
      variables: {
        page: 1,
        pageSize: 25
      }
    });
  }, []);

  const bestSellingProducts = data?.getProductByConditions.Products || [];

  return (
    <ProductsContainer title="Sản phẩm bán chạy" seeMoreUrl="#">
      <ProductsCarousel products={bestSellingProducts} />
    </ProductsContainer>
  );
};
