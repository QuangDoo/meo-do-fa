import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { GetProductDealOfTheDayData, GetProductDealOfTheDayVars, GET_PRODUCTS_DEAL_OF_THE_DAY } from 'src/graphql/product/getProductDealOfTheDay';
import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const DealOfTheDay = (): JSX.Element => {
    const { data: productsData, error:errorData} = useQuery<GetProductDealOfTheDayData, GetProductDealOfTheDayVars>(
    GET_PRODUCTS_DEAL_OF_THE_DAY,
    {
        variables: {
        page: 1,
        pageSize: 20,
        },
        
    }
    ); 
    console.log('productsData', productsData)
  return (
    <ProductsContainer title="Deal Of The Day" deals>
      <ProductsCarousel products={productsData?.getProductDealOfTheDay} />
    </ProductsContainer>
  );
};

