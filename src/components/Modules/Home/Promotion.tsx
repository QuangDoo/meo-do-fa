import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import {
  GET_PROMOTION_PRODUCTS,
  GetPromotionProductsData,
  GetPromotionProductsVars
} from 'src/graphql/product/getPromotionProducts';

import ProductCard from '../ProductCard';
import { ProductsContainer } from './ProductsContainer';

export const Promotion = (): JSX.Element => {
  const { data } = useQuery<GetPromotionProductsData, GetPromotionProductsVars>(
    GET_PROMOTION_PRODUCTS,
    {
      variables: {
        page: 1,
        pageSize: 10
      }
    }
  );

  const promotionProducts = data?.getProductByConditions.Products || [];

  return (
    <ProductsContainer title="Khuyến mãi" seeMoreUrl="/deals" deals className="px-0 px-sm-3">
      <div className="products__cards">
        {promotionProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </ProductsContainer>
  );
};
