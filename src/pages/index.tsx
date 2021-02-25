import { useQuery } from '@apollo/client';
import React from 'react';
import Head from 'src/components/Layout/Head';
import HomePage from 'src/components/Modules/Home';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import {
  GET_BEST_SELLING_PRODUCTS,
  GetBestSellingProductsData,
  GetBestSellingProductsVars
} from 'src/graphql/product/getBestSellingProducts';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';
import {
  GET_NEW_PRODUCTS,
  GetNewProductsData,
  GetNewProductsVars
} from 'src/graphql/product/getNewProducts';
import {
  GET_PROMOTION_PRODUCTS,
  GetPromotionProductsData,
  GetPromotionProductsVars
} from 'src/graphql/product/getPromotionProducts';
import withToken from 'src/utils/withToken';

const paginationVars = {
  variables: {
    page: 1,
    pageSize: 10
  }
};

Home.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'productCard', 'productBadge', 'carousels']
});

function Home() {
  const { data: dealsOfTheDayData } = useQuery<GetDealsOfTheDayData, GetDealsOfTheDayVars>(
    GET_DEALS_OF_THE_DAY,
    paginationVars
  );

  const { data: bestSellingData } = useQuery<
    GetBestSellingProductsData,
    GetBestSellingProductsVars
  >(GET_BEST_SELLING_PRODUCTS, paginationVars);

  const { data: newProductsData } = useQuery<GetNewProductsData, GetNewProductsVars>(
    GET_NEW_PRODUCTS,
    paginationVars
  );

  const { data: promotionProductsData } = useQuery<
    GetPromotionProductsData,
    GetPromotionProductsVars
  >(GET_PROMOTION_PRODUCTS, paginationVars);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <HomePage
        bestSellingData={bestSellingData}
        newProductsData={newProductsData}
        promotionProductsData={promotionProductsData}
        dealsOfTheDayData={dealsOfTheDayData}
      />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Home);
