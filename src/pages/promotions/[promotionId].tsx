import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'src/components/Layout/Head';
import { ProductsContainer } from 'src/components/Modules/Home/ProductsContainer';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import withToken from 'src/utils/withToken';

const pageSize = 20;

PromotionDetail.getInitialProps = async (ctx) => {
  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

function PromotionDetail(): JSX.Element {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { promotionId } = router.query;

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

  const img = '/assets/images/banner_1.jpg';

  const promotionProducts = productsData?.getProductByConditions?.Products || [];

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <div className="container py-5">
        <div className="mt-3">
          <div hidden={promotionProducts.length === 0}>
            <ProductsContainer
              // title={t('carousels:promotion')}
              seeMoreUrl="/deals"
              deals
              className="px-0 px-sm-3">
              <div className="products__cards">
                {promotionProducts.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </ProductsContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default withToken({ ssr: true })(PromotionDetail);
