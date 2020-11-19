import { useQuery } from '@apollo/react-hooks';
import { withTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { GetProductsData, GetProductsVars } from 'src/types/GetProducts';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';

const pageSize = 20;

function Deal() {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { data: productsData, refetch: refetchProducts } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page: page,
      pageSize: pageSize,
      order_type: '01'
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
      order_type: '01'
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
              <h1 className="text-white">Khuyến mãi</h1>

              <p>
                Cập nhật hàng ngày tất cả những deal giá ưu đãi trên medofa. Hãy bookmark trang này
                (nhấn Ctrl+D) và quay lại thường xuyên để không bỏ lỡ bạn nhé!
              </p>
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

export default withTranslation('common')(Deal);
