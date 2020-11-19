import { useLazyQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';

import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const DealsOfTheDay = (): JSX.Element => {
  const [getFlashSaleProducts, { data }] = useLazyQuery<GetDealsOfTheDayData, GetDealsOfTheDayVars>(
    GET_DEALS_OF_THE_DAY
  );

  useEffect(() => {
    getFlashSaleProducts({
      variables: {
        page: 1,
        pageSize: 25
      }
    });
  }, []);

  const dealsOfTheDayProducts = data?.getProductDealOfTheDay || [];

  return (
    <ProductsContainer title="Flash Sale" seeMoreUrl="#" deals>
      <ProductsCarousel products={dealsOfTheDayProducts} />
    </ProductsContainer>
  );
};
