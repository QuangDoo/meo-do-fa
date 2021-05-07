import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';

const pageSize = 20;

import withToken from 'src/utils/withToken';

Deal.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function Deal() {
  const router = useRouter();

  const { t } = useTranslation(['deals']);

  const page = +router.query.page || 1;

  const { data: productsData, refetch: refetchProducts, loading: loadingProducts } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: page,
      pageSize: pageSize,
      type: 'promotion',
      condition: {
        order_type: '01'
      }
    }
  });

  const changePage = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: page
      }
    });

    refetchProducts({
      page: page,
      pageSize: pageSize,
      condition: {
        order_type: '01'
      }
    });
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('deals:promotion')}</title>
      </Head>

      <section className="deals deals--mobile py-5">
        <div className="container px-0">
          <div className="row no-gutters">
            <div className="col-12 mb-3 px-3 text-white">
              <h1 className="text-white">{t('deals:promotion')}</h1>

              <p>{t('deals:deal_info')}</p>
            </div>

            {loadingProducts ? (
              <div className="d-flex w-100 p-5 justify-content-center">
                <Loading className="lds-roller-white" />
              </div>
            ) : productsData?.getProductByConditions.Products.length < 1 ? (
              <div className="col-12 mb-3 px-5 text-white">
                <h1 className="text-white text-center">{t('deals:deal_empty')}</h1>
              </div>
            ) : (
              <main className="col-12">
                <div className="products__cards mb-3">
                  {productsData?.getProductByConditions.Products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                <div className="mb-3">
                  <Pagination
                    count={Math.ceil(productsData?.getProductByConditions.total / pageSize)}
                    page={page}
                    onChange={changePage}
                  />
                </div>
              </main>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Deal);
