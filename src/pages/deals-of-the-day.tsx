import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import Footer from 'src/components/Layout/Footer';
import Header from 'src/components/Layout/Header';
import Loading from 'src/components/Layout/Loading';
import Nav from 'src/components/Layout/Nav';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

const DealOfTheDay = () => {
  const router = useRouter();
  const { t } = useTranslation(['dealsOfTheDay']);
  const [showMore, setShowMore] = useState(false);

  const page = +router.query.page || 1;
  const numberProducts = showMore ? 15 : 10;

  // const { data: hotDealData, loading: hotDealLoading } = useQuery<
  //   GetDealsOfTheDayData,
  //   GetDealsOfTheDayVars
  // >(GET_DEALS_OF_THE_DAY, {
  //   variables: {
  //     page: 1,
  //     pageSize: 15,
  //   }
  // });
  // const hotDeals = hotDealData?.getProductDealOfTheDay || [];
  // const numberHotDeals = hotDealData?.getProductDealOfTheDay?.length || 0;

  const { data: hotDealData, loading: hotDealLoading } = useQuery<GetProductsData, GetProductsVars>(
    GET_PRODUCTS,
    {
      variables: {
        page: 1,
        pageSize: 15,
        condition: {
          order_type: '05'
        }
      }
    }
  );
  const hotDeals = hotDealData?.getProductByConditions?.Products || [];
  const numberHotDeals = hotDealData?.getProductByConditions?.Products?.length || 0;

  // const { data: otherDealData, loading: otherDealLoading } = useQuery<
  //   GetProductsData,
  //   GetProductsVars
  // >(GET_PRODUCTS, {
  //   variables: {
  //     page: page,
  //     pageSize: pageSize,
  //     type: 'promotion',
  //     condition: {
  //       order_type: '01'
  //     }
  //   }
  // });
  // const otherDeals = otherDealData?.getProductByConditions?.Products || [];
  // const totalOtherDeals = otherDealData?.getProductByConditions?.total || 0;

  const { data: otherDealData, loading: otherDealLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: page,
      pageSize: pageSize,
      condition: {
        order_type: '05'
      }
    }
  });
  const otherDeals = otherDealData?.getProductByConditions?.Products || [];
  const totalOtherDeals = otherDealData?.getProductByConditions?.total || 0;

  useEffect(() => {
    if (otherDealLoading) {
      animateScroll.scrollTo(0, {
        to: 'other-deals',
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

      <div className="deals deals--mobile py-5">
        <div className="container px-0">
          <h1 className="text-white mb-3">{t('dealsOfTheDay:title')}</h1>
          {hotDeals.length === 0 &&
            otherDeals.length === 0 &&
            !hotDealLoading &&
            !otherDealLoading && (
              <h3 className="text-center text-white">{t('dealsOfTheDay:no_products')}</h3>
            )}
          {hotDealLoading ? (
            <div className="w-100 p-5 text-center">
              <Loading className="lds-roller-white" />
            </div>
          ) : (
            hotDeals.length !== 0 && (
              <div className="row no-gutters">
                <div className="col-12 mb-3 px-3">
                  <h3 className="text-white text-center my-3">{t('dealsOfTheDay:hot_deals')}</h3>
                </div>
                <div className="col-12">
                  <div className="products__cards mb-3">
                    {hotDeals.slice(0, numberProducts).map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                </div>
                <div
                  className={clsx(
                    'col-12 mt-3 text-center',
                    numberHotDeals < 11 ? 'd-none' : 'd-block'
                  )}>
                  <button className="btn btn-primary" onClick={() => setShowMore(!showMore)}>
                    {!showMore ? t('dealsOfTheDay:show_more') : t('dealsOfTheDay:show_less')}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {otherDealLoading ? (
        <div className="w-100 p-5 text-center"></div>
      ) : (
        otherDeals.length !== 0 && (
          <div className="deals--mobile py-5">
            <div className="container px-0">
              <div className="row no-gutters">
                <div className="col-12 mb-3 px-3">
                  <h3 className="text-center">{t('dealsOfTheDay:other_deals')}</h3>
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
                      page={page}
                      siblingCount={4}
                      onChange={(page) =>
                        router.push({
                          pathname: router.pathname,
                          query: {
                            ...router.query,
                            page: page
                          }
                        })
                      }
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
        )
      )}
      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(DealOfTheDay);
