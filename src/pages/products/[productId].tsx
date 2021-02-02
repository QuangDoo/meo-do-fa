import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { MagnifierContainer, SideBySideMagnifier } from 'react-image-magnifiers';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import SimpleBreadcrumbs from 'src/components/Modules/BreadCrum/BreadCrum';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { DiscountRibbon } from 'src/components/Modules/ProductCard/DiscountRibbon';
import ProductDetailInfor from 'src/components/Modules/ProductDetail/ProductDetaiInfor';
import ProducerInformation from 'src/components/Modules/ProductDetail/ProductInformation/ProducerInformation';
import ProductSidebar from 'src/components/Modules/ProductDetail/ProductInformation/ProductSidebar';
import RelativeProducts from 'src/components/Modules/ProductDetail/RelativeProducts';
import { GET_PRODUCT, GetProductData, GetProductVars } from 'src/graphql/product/product.query';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

function getProductId(slug: string): number {
  return +slug.split('-').pop().replace('pid', '');
}

ProductDetail.getInitialProps = async (ctx) => {
  await asyncQuery<GetProductData, GetProductVars>({
    ctx,
    query: GET_PRODUCT,
    variables: {
      id: getProductId(ctx.query.productId)
    },
    fetchPolicy: 'network-only'
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'productDetail']
  };
};

function ProductDetail() {
  const { t } = useTranslation(['productDetail']);

  const router = useRouter();

  const { data: getProductData } = useQuery<GetProductData, GetProductVars>(GET_PRODUCT, {
    variables: {
      id: getProductId(router.query.productId as string)
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const product = getProductData?.getProduct;

  if (!product) {
    return (
      <MainLayout>
        <Head>
          <title>Medofa</title>
        </Head>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {product?.name}</title>
      </Head>

      <div className="product container py-2">
        <SimpleBreadcrumbs categories={product?.categories} />
      </div>

      <div className="product container py-5">
        <div className="elevated">
          <div className="row p-3 mb-5">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="product__image">
                    <MagnifierContainer>
                      <SideBySideMagnifier
                        alwaysInPlace={true}
                        imageSrc={product?.image_512 || '/assets/images/no_images.jpg'}
                      />
                    </MagnifierContainer>

                    {product?.discount_percentage > 0 && (
                      <DiscountRibbon discountPercent={product.discount_percentage} />
                    )}
                  </div>
                  <small className="text-muted">* {t('productDetail:image_change')}</small>
                </div>
                <div className="col-md-6">
                  <ProductDetailInfor {...product} />
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 ">
              <ProductSidebar />
            </div>
          </div>
          <div className="row px-3">
            <div className="col-12">
              <ProducerInformation {...product} />
            </div>
          </div>
        </div>

        <RelativeProducts />
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(ProductDetail);
