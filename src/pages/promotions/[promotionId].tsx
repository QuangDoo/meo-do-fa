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
        <h1 className="h3">
          <b>Mua thuốc chuột, có cơ hội trúng ngay 1400 Iphone 12 64GB, gần 25 triệu/giải</b>
        </h1>
        <hr />
        <div>
          <h4>
            Nhân dịp Panasonic 50 năm cùng Việt Nam - Tin cậy bền vững - Tri ân khách&nbsp; hàng –
            Trao ngàn, từ 15/01 – 10/02/2021, khi mua các sản phẩm
            <a href="https://medofa.com" title="tủ lạnh">
              tủ lạnh
            </a>
            ,{' '}
            <a href="https://medofa.com" title="máy giặt">
              máy giặt
            </a>
            ,{' '}
            <a href="https://medofa.com" title="điều hòa">
              điều hòa
            </a>{' '}
            Panasonic trong danh sách áp dụng, quý khách hàng sẽ có cơ hội trúng ngay&nbsp;
            <a
              href="https://www.dienmayxanh.com/dien-thoai/iphone-12"
              title="Điện thoại Iphone 12 64GB">
              Điện thoại Iphone 12 64GB
            </a>
            , trị giá&nbsp;gần 25 triệu. Mời bạn đến Điện máy XANH chọn hàng chính hãng, tham
            gia&nbsp;ngay cơ hội trúng quà to bạn nhé!&nbsp;
          </h4>
          <div className="banner__slide mt-3">
            <div className="banner__img">
              <a>
                <Image src={img} layout="fill" objectFit="cover" />
              </a>
            </div>
          </div>
          <div className="mt-3">
            <h3>1. Thông tin chương trình</h3>
            <p>Thời gian diễn ra: Từ ngày 15/01 – 10/02/2021</p>
            <h3>2. Danh sách sản phẩm áp dụng</h3>
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
      </div>
    </MainLayout>
  );
}
export default withToken({ ssr: true })(PromotionDetail);
