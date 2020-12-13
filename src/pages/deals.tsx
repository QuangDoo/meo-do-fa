import { useQuery } from '@apollo/client';
import { useTranslation, withTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

function Deal() {
  const router = useRouter();

  const { t } = useTranslation(['deals']);

  const page = +router.query.page || 1;

  const { data: productsData, refetch: refetchProducts } = useQuery<
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
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />

      <Nav />

      <section className="deals deals--mobile py-5">
        <div className="container px-0">
          <div className="row no-gutters">
            <div className="col-12 mb-3 px-3 text-white">
              <h1 className="text-white">{t('deals:promotion')}</h1>

              <p>{t('deals:deal_info')}</p>
            </div>

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
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

Deal.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

const TranslatedPage = withTranslation(['common'])(Deal);

export default withApollo({ ssr: true })(TranslatedPage);
