import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';
import withToken from 'src/utils/withToken';

const DynamicHomePage = dynamic(() => import('src/components/Modules/Home'));

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

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <DynamicHomePage dealsOfTheDayData={dealsOfTheDayData} />
      {/* <HomePage
        bestSellingData={bestSellingData}
        newProductsData={newProductsData}
        promotionProductsData={promotionProductsData}
        dealsOfTheDayData={dealsOfTheDayData}
      /> */}
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Home);
