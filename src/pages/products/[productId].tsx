import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MagnifierContainer, SideBySideMagnifier } from 'react-image-magnifiers';
import { toast } from 'react-toastify';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { DiscountRibbon } from 'src/components/Modules/ProductCard/DiscountRibbon';
import ProductDetailInfor from 'src/components/Modules/ProductDetail/ProductDetailsInfo';
import ProducerInformation from 'src/components/Modules/ProductDetail/ProductInformation/ProducerInformation';
import ProductSidebar from 'src/components/Modules/ProductDetail/ProductInformation/ProductSidebar';
import RelativeProducts from 'src/components/Modules/ProductDetail/RelativeProducts';
import {
  GET_RELATED_PRODUCTS,
  GetRelatedProductsData,
  GetRelatedProductsVars
} from 'src/graphql/product/getRelatedProducts';
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

  await asyncQuery<GetRelatedProductsData, GetRelatedProductsVars>({
    ctx,
    query: GET_RELATED_PRODUCTS,
    variables: {
      page: 1,
      pageSize: 20,
      productId: getProductId(ctx.query.productId as string)
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

  const { data: getRelatedProductsData } = useQuery<GetRelatedProductsData, GetRelatedProductsVars>(
    GET_RELATED_PRODUCTS,
    {
      variables: {
        page: 1,
        pageSize: 20,
        productId: getProductId(router.query.productId as string)
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const product = getProductData?.getProduct;

  const relatedProducts = getRelatedProductsData?.getRelatedProducts;

  const categories = product?.categories?.slice().filter((c) => c.id !== null) || [];
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
        <meta property="og:title" content={product?.name} />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta property="og:image" content={product?.image_128} />
      </Head>

      {/* <div className="product container py-2">
        <SimpleBreadcrumbs categories={product?.categories} />
      </div> */}

      <div className="product container py-5">
        <div className="elevated">
          <div className="row p-3 mb-3">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="product__image">
                    <MagnifierContainer>
                      <SideBySideMagnifier
                        alwaysInPlace={true}
                        imageSrc={product?.image_512 || '/assets/images/no_images.jpg'}
                        className="product-img-magnifier"
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
            <div className="col-md-4 mt-md-0 mt-3 d-none d-md-block">
              <ProductSidebar />
            </div>
          </div>

          <div className="row px-3 mb-4">
            <div className="col-12">
              {product?.manufacturer?.id !== null && (
                <div className="row px-3 mb-3 d-flex ">
                  <div className="product__info-label mr-4">{t('productDetail:manufacturer')}</div>
                  <div className="text-capitalize">
                    <Link href={`/manufacturers/${product.manufacturer?.id}`}>
                      <a>{product.manufacturer?.name}</a>
                    </Link>
                  </div>
                </div>
              )}

              {categories.length > 0 && (
                <div className="row px-3 mb-3 d-flex ">
                  <div className="product__info-label mr-4">{t('productDetail:category')}</div>
                  {categories.map((item, index, arr) => (
                    <>
                      <Link href={`/products?category=${item.id}`}>
                        <a className="text-capitalize" key={index}>
                          {item.name}
                        </a>
                      </Link>
                      {index < arr.length - 1 && '; '}
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="row px-3">
            <div className="col-12">
              <ProducerInformation {...product} />
            </div>
          </div>

          <div className="col-md-4 mt-md-0 mt-3 d-md-none d-lg-none d-xl-none d-block">
            <ProductSidebar />
          </div>
        </div>

        {relatedProducts?.length > 0 ? (
          <RelativeProducts relatedProducts={relatedProducts} />
        ) : null}
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(ProductDetail);
