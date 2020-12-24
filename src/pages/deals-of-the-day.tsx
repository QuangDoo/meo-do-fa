import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import Footer from 'src/components/Layout/Footer';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import {
  GET_PRODUCTS_DEAL_OF_THE_DAY,
  GetProductDealOfTheDayData,
  GetProductDealOfTheDayVars
} from 'src/graphql/product/getProductDealOfTheDay';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

const DealOfTheDay = () => {
  const router = useRouter();

  const hotDealsPage = +router.query.hotdeals || 1;
  const otherDealsPage = +router.query.otherdeals || 1;

  const { data: hotDealData, refetch: refetchProducts, loading: hotDealLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: hotDealsPage,
      pageSize: pageSize,
      type: 'promotion',
      condition: {
        order_type: '01'
      }
    }
  });
  const hotDeals = hotDealData?.getProductByConditions?.Products || [];
  const totalHotDeals = hotDealData?.getProductByConditions?.total || 0;

  useEffect(() => {
    if (hotDealLoading) {
      animateScroll.scrollToTop({
        duration: 1500,
        smooth: true
      });
    }
  }, [hotDealLoading]);

  const { data: otherDealData, loading: otherDealLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: otherDealsPage,
      pageSize: pageSize,
      condition: {
        order_type: '01'
      }
    }
  });
  const otherDeals = otherDealData?.getProductByConditions?.Products || [];
  const totalOtherDeals = otherDealData?.getProductByConditions?.total || 0;
  useEffect(() => {
    if (otherDealLoading) {
      animateScroll.scrollTo(0, {
        duration: 1500,
        smooth: true,
        containerId: 'other-deals'
      });
    }
  }, [otherDealLoading]);

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />
      {hotDealData?.getProductByConditions && (
        <div className="deals deals--mobile py-5">
          <div className="container px-0">
            <h1 className="text-white mb-3">Deals of the day</h1>
            <div className="row no-gutters">
              <div className="col-12 mb-3 px-3 text-white">
                <h3 className="text-white text-center my-3">Hot deals</h3>
              </div>
              <>
                <div className="col-12">
                  <div className="products__cards mb-3">
                    {hotDeals.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                  <Pagination
                    count={Math.ceil(totalHotDeals / pageSize)}
                    page={hotDealsPage}
                    siblingCount={4}
                    onChange={(page) =>
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          hotdeals: page
                        }
                      })
                    }
                  />
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      {otherDealData?.getProductByConditions && (
        <div className="deals--mobile py-5">
          <div className="container px-0">
            <div className="row no-gutters">
              <div className="col-12 mb-3 px-3">
                <h3 className="text-center">Other deals</h3>
              </div>
              <>
                <div className="col-12">
                  <div className="products__cards mb-3">
                    {otherDeals.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                  <Pagination
                    count={Math.ceil(totalOtherDeals / pageSize)}
                    page={otherDealsPage}
                    siblingCount={4}
                    onChange={(page) =>
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          otherdeals: page
                        }
                      })
                    }
                  />
                </div>
              </>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(DealOfTheDay);
