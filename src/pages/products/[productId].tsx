/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'i18n';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MagnifierContainer, SideBySideMagnifier } from 'react-image-magnifiers';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import ModalBase from 'src/components/Layout/Modal/ModalBase';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));
type ArrowButtonProps = {
  onClick?: () => void;
  type?: 'prev' | 'next';
};

const ArrowButton = ({ onClick, type = 'prev' }: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`slide-arrow-image ${type}-arrow slick-arrow`}
      aria-disabled="true">
      <i className={`fas fa-chevron-${type === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};

function ProductDetail() {
  const { t, i18n } = useTranslation(['productDetail']);

  const classes = useStyles();

  const [subImageIndex, setSubImageIndex] = useState<number>(0);

  const [subImages, setSubImages] = useState<string[]>([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [openModalImage, setOpenModalImage] = useState<boolean>(false);

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

  useEffect(() => {
    if (!product?.sub_images) return;

    setSubImages(product?.sub_images);
  }, [product]);

  useEffect(() => {
    const changePathname = () => {
      if (router) {
        i18n.off('languageChanged');
        i18n.on('languageChanged', (lang) => {
          setTimeout(() => {
            if (lang === 'vi') {
              router.push(`/san-pham/${router?.query?.productId}`, undefined, { shallow: true });
            } else {
              router.push(`/products/${router?.query?.productId}`, undefined, { shallow: true });
            }
          });
        });
      }
    };
    changePathname();

    return () => {
      changePathname();
      i18n.off('languageChanged');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const listImage = [...subImages];

  listImage.unshift(product?.image_512);
  // console.log(`abc`, abc);

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

  const imagesSlice = listImage.slice(0, 4);

  const imagesSliceLength = imagesSlice.length;

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
                  <div className="product__image d-none d-sm-block">
                    <MagnifierContainer>
                      <SideBySideMagnifier
                        alwaysInPlace={true}
                        imageSrc={listImage[subImageIndex]}
                        className="product-img-magnifier"
                      />
                    </MagnifierContainer>

                    {product?.discount_percentage > 0 && (
                      <DiscountRibbon discountPercent={product.discount_percentage} />
                    )}
                  </div>
                  <div className="product__image d-sm-none">
                    <Slider
                      {...settings}
                      prevArrow={<ArrowButton />}
                      nextArrow={<ArrowButton type="next" />}>
                      {listImage.map((image, index) => (
                        <MagnifierContainer key={index}>
                          <SideBySideMagnifier
                            alwaysInPlace={true}
                            imageSrc={image}
                            className="product-img-magnifier"
                          />
                        </MagnifierContainer>
                      ))}
                    </Slider>

                    {product?.discount_percentage > 0 && (
                      <DiscountRibbon discountPercent={product.discount_percentage} />
                    )}
                  </div>
                  <section className="box-image d-none d-sm-block">
                    <div className="container mb-3">
                      {/* <h3 className="text-center about-us__title">Life At Medofa</h3> */}
                    </div>
                    <div className={classes.root}>
                      <Grid container>
                        {imagesSlice.map((image, index) => (
                          <Grid
                            xs={6}
                            sm={4}
                            md={3}
                            lg={3}
                            item
                            key={index}
                            className="grid-sub-image">
                            <Paper>
                              {imagesSliceLength === index + 1 ? (
                                <div
                                  onClick={() => setOpenModalImage(true)}
                                  className={'border-sub__image_lastimage'}
                                  key={index}>
                                  <img src={image} alt={image} className="img-fluid" />
                                  <span>{t('productDetail:see_more')}</span>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setSubImageIndex(index);
                                  }}
                                  className={`border-sub__image ${
                                    subImageIndex === index ? 'active' : ''
                                  } `}
                                  key={index}>
                                  <img src={image} alt={image} className="img-fluid" />
                                </div>
                              )}
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                      <ModalBase open={openModalImage} onClose={() => setOpenModalImage(false)}>
                        <Slider
                          {...settings}
                          prevArrow={<ArrowButton />}
                          nextArrow={<ArrowButton type="next" />}>
                          {listImage.map((image, index) => (
                            <img src={image} alt={image} style={{ width: '100%' }} key={index} />
                          ))}
                        </Slider>
                      </ModalBase>
                    </div>
                  </section>
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
                <div className="row px-3 mb-3 d-flex title-info ">
                  <div className="product__info-label ">{t('productDetail:manufacturer')}</div>
                  <div className="text-capitalize">
                    <Link href={`/manufacturers/${product.manufacturer?.id}`}>
                      <a>{product.manufacturer?.name}</a>
                    </Link>
                  </div>
                </div>
              )}
              {product?.default_vendor !== null && (
                <div className="row px-3 mb-3 d-flex title-info ">
                  <div className="product__info-label ">{t('productDetail:supplier')}</div>
                  <div className="text-capitalize">
                    <Link href={`/suppliers/${product.default_vendor_id}`}>
                      <a>{product.default_vendor}</a>
                    </Link>
                  </div>
                </div>
              )}

              {categories.length > 0 && (
                <div className="row px-3 mb-3 d-flex title-info ">
                  <div className="product__info-label ">{t('productDetail:category')}</div>
                  {categories.map((item, index, arr) => (
                    <>
                      <Link
                        href={`${i18n?.language === 'en' ? '/products' : '/san-pham'}?category=${
                          item.id
                        }`}>
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
