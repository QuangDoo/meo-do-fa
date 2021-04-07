import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Loading from 'src/components/Layout/Loading';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';
import {
  GET_PRODUCTS,
  GetProductsData,
  GetProductsVars,
  ProductTag
} from 'src/graphql/product/getProducts';
import withToken from 'src/utils/withToken';

const PAGE_SIZE = 20;

DealOfTheDay.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'dealsOfTheDay']
});

function DealOfTheDay() {
  const router = useRouter();
  const { t } = useTranslation(['dealsOfTheDay']);

  const page = +router.query.page || 1;

  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize: PAGE_SIZE,
      type: 'dod' as ProductTag,
      condition: {
        order_type: ''
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const hotDeals = productsData?.getProductByConditions?.Products || [];
  const numberHotDeals = productsData?.getProductByConditions?.total || 0;

  const { data: otherDealData, refetch: refetchProducts, loading: otherDealLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: page,
      pageSize: PAGE_SIZE,
      type: 'promotion',
      condition: {
        order_type: '01'
      }
    }
  });
  const otherDeals = otherDealData?.getProductByConditions?.Products || [];
  const totalOtherDeals = otherDealData?.getProductByConditions?.total || 0;

  useEffect(() => {
    if (otherDealLoading) {
      animateScroll.scrollToTop();
    }
  }, [otherDealLoading]);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="deals deals--mobile py-5 ">
        <div className="container mobile-content my-3 my-sm-5 ">
          <h1 className="text-white mb-3 text-center">{t('dealsOfTheDay:title')}</h1>
          {hotDeals.length === 0 &&
            otherDeals.length === 0 &&
            !productsLoading &&
            !otherDealLoading && (
              <h3 className="text-center text-white">{t('dealsOfTheDay:no_products')}</h3>
            )}
          {productsLoading ? (
            <div className="w-100 p-5 text-center">
              <Loading className="lds-roller-white" />
            </div>
          ) : (
            hotDeals.length !== 0 && (
              <div className="row no-gutters">
                <div className="col-12 mb-3 px-3">
                  <h3 className="text-white text-center my-3">{t('dealsOfTheDay:hot_deals')}</h3>
                </div>
                <div className="col-12 ">
                  <div className="products__cards mb-3">
                    {hotDeals.slice(0, 20).map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                </div>
                <div
                  className={clsx(
                    'col-12 mt-3 text-center',
                    numberHotDeals < 11 ? 'd-none' : 'd-block'
                  )}>
                  {!productsLoading && (
                    <Pagination
                      count={Math.ceil(numberHotDeals / PAGE_SIZE)}
                      page={page}
                      siblingCount={4}
                      onChange={(page) => {
                        router.push({
                          pathname: router.pathname,
                          query: {
                            ...router.query,
                            page: page
                          }
                        });
                        window.scrollTo(0, 0);
                      }}
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {otherDealLoading ? (
        <div className="w-100 p-5 text-center">
          <Loading />
        </div>
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
                      count={Math.ceil(totalOtherDeals / PAGE_SIZE)}
                      page={page}
                      siblingCount={4}
                      onChange={(page) => {
                        router.push({
                          pathname: router.pathname,
                          query: {
                            ...router.query,
                            page: page
                          }
                        });
                        refetchProducts({
                          page: page,
                          pageSize: PAGE_SIZE,
                          condition: {
                            order_type: '01'
                          }
                        });
                      }}
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
        )
      )}
    </MainLayout>
  );
}

export default withToken({ ssr: true })(DealOfTheDay);
