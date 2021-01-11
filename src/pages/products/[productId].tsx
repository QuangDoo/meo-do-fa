import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { MagnifierContainer, SideBySideMagnifier } from 'react-image-magnifiers';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Nav from 'src/components/Layout/Nav';
import SimpleBreadcrumbs from 'src/components/Modules/BreadCrum/BreadCrum';
import { DiscountRibbon } from 'src/components/Modules/ProductCard/DiscountRibbon';
import ProductDetailInfor from 'src/components/Modules/ProductDetail/ProductDetaiInfor';
import ProducerInformation from 'src/components/Modules/ProductDetail/ProductInformation/ProducerInformation';
import ProductSidebar from 'src/components/Modules/ProductDetail/ProductInformation/ProductSidebar';
import { GET_PRODUCT } from 'src/graphql/product/product.query';
import withApollo from 'src/utils/withApollo';

function ProductDetail(): JSX.Element {
  const router = useRouter();

  const { t } = useTranslation(['productDetail']);

  const { productId } = router.query;

  const productPid = (productId as string).split('-').pop().substring(3);

  const { data: dataProduct, loading, refetch } = useQuery(GET_PRODUCT, {
    variables: { id: Number(productPid) }
  });

  const product = dataProduct?.getProduct || {};

  useEffect(() => {
    if (!productId) return;

    refetch();
  }, [productId]);

  const getNameById = (array, id) => {
    return _.find(array, { id })?.name;
  };

  const title = Number(productPid) ? getNameById(dataProduct, Number(productPid)) : '';

  return (
    <>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

      <Header />

      <Nav />

      <LoadingBackdrop open={loading} />
      <div className="product container py-2">
        <SimpleBreadcrumbs categories={product?.categories} />
      </div>

      <div className="product container py-5" hidden={loading}>
        <div className="elevated">
          <div className="row p-3 mb-5">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="lozad product__image">
                    <MagnifierContainer>
                      <SideBySideMagnifier
                        alwaysInPlace={true}
                        // style={{ height: '400px' }}
                        imageSrc={product?.image_512}
                      />
                    </MagnifierContainer>
                    {product?.discount_percentage > 0 && (
                      <DiscountRibbon discountPercent={product?.discount_percentage} />
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
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <ProducerInformation {...product} />
            </div>
          </div>
        </div>
        {/* <RelativeProducts /> */}
      </div>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(ProductDetail);
