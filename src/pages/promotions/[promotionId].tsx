import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'src/components/Layout/Head';
import { ProductsContainer } from 'src/components/Modules/Home/ProductsContainer';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_PRODUCTS, GetProductsData, GetProductsVars } from 'src/graphql/product/getProducts';
import { GET_PROMOTION, PromotionData, PromotionVar } from 'src/graphql/promotion/getPromotion';
import { addImageDomainToContent } from 'src/utils/addImageDomain';
import withToken from 'src/utils/withToken';

const pageSize = 20;

PromotionDetail.getInitialProps = async () => {
  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

function PromotionDetail(): JSX.Element {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { promotionId } = router.query;

  const { data: productsData } = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS, {
    variables: {
      page: page,
      pageSize: pageSize,
      type: 'promotion',
      condition: {
        order_type: '01'
      }
    }
  });

  const { data: promontionData } = useQuery<PromotionData, PromotionVar>(GET_PROMOTION, {
    variables: { id: Number(promotionId) }
  });

  const content = promontionData?.getWebsitePromotionDetail?.content || '';

  const promotionProducts = productsData?.getProductByConditions?.Products || [];

  const title = promontionData?.getWebsitePromotionDetail?.name;
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {title}</title>
      </Head>
      <div className="container py-5">
        <div dangerouslySetInnerHTML={{ __html: addImageDomainToContent(content) }} />
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
