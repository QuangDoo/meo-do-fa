import { useQuery } from '@apollo/client';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import HomePage from 'src/components/Modules/Home';
import { TokenContext } from 'src/contexts/Token';
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
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

const paginationVars = {
  variables: {
    page: 1,
    pageSize: 10
  }
};

Home.getInitialProps = async (ctx) => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge'],
  token: getToken(ctx)
});

function Home(props) {
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
    <TokenContext.Provider value={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <HomePage
        bestSellingData={bestSellingData}
        newProductsData={newProductsData}
        promotionProductsData={promotionProductsData}
        dealsOfTheDayData={dealsOfTheDayData}
      />

      <Footer />
    </TokenContext.Provider>
  );
}

export default withApollo({ ssr: true })(Home);
