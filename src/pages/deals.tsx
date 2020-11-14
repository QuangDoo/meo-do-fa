import { useQuery } from '@apollo/react-hooks';
import { withTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS_DEAL } from 'src/graphql/product/product.query';
import { GetProductsDealData, GetProductsDealVars } from 'src/types/GetProducts';

import Footer from '../components/Layout/Footer';
import Head from '../components/Layout/Head';
import Header from '../components/Layout/Header';
import Nav from '../components/Layout/Nav';

const pageSize = 25;

function Deal() {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { data: productsData, refetch: refetchProducts } = useQuery<
    GetProductsDealData,
    GetProductsDealVars
  >(GET_PRODUCTS_DEAL, {
    variables: {
      page: page,
      pageSize: pageSize
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
      pageSize: pageSize
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
                Cập nhật hàng ngày tất cả những deal giá ưu đãi trên thuocsi. Hãy bookmark trang này
                (nhấn Ctrl+D) và quay lại thường xuyên để không bỏ lỡ bạn nhé!
              </p>
            </div>

            <main className="col-12">
              <div className="mb-3">
                <Pagination count={5} page={page} onChange={changePage} />
              </div>

              <div className="products__cards mb-3">
                {productsData?.getProductsDeal.map((product) => (
                  <ProductCard
                    key={product.id}
                    showBadges={false}
                    showCategories={false}
                    {...product}
                  />
                ))}
              </div>

              <div className="mb-3">
                <Pagination count={5} page={page} onChange={changePage} />
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
