import { useTranslation } from 'i18n';
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
import { GET_PRODUCT, ProductDetails } from 'src/graphql/product/product.query';
import redirect from 'src/utils/redirect';
import withToken from 'src/utils/withToken';

ProductDetail.getInitialProps = async (ctx) => {
  let productDetailsData;

  try {
    productDetailsData = await ctx.apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        id: +ctx.query.productId.split('-').pop().replace('pid', '')
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });
  } catch (error) {
    console.log('getProduct error:', error);

    if (ctx.res) {
      toast.error(`errors:code_undefined`);
    }

    redirect({
      ctx,
      location: '/'
    });
  }

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'productDetail'],
    productDetails: productDetailsData?.data.getProduct
  };
};

type Props = {
  productDetails: ProductDetails;
};

function ProductDetail(props: Props) {
  const { t } = useTranslation(['productDetail']);

  const { productDetails: product } = props;

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {product.name}</title>
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
                        imageSrc={product.image_512 || '/assets/images/no_images.jpg'}
                      />
                    </MagnifierContainer>

                    {product.discount_percentage > 0 && (
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

        {/* <RelativeProducts /> */}
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(ProductDetail);
