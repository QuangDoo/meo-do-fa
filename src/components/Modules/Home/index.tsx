import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { useEffect } from 'react';
import SlickSlider from 'react-slick';
import {
  GET_BEST_SELLING_PRODUCTS,
  GetBestSellingProductsData,
  GetBestSellingProductsVars
} from 'src/graphql/product/getBestSellingProducts';
import {
  GET_DEALS_OF_THE_DAY,
  GetDealsOfTheDayData,
  GetDealsOfTheDayVars
} from 'src/graphql/product/getDealsOfTheDay';
import {
  GET_NEW_PRODUCTS,
  GetNewProductsData,
  GetNewProductsVars
} from 'src/graphql/product/getNewProducts';
import {
  GET_PROMOTION_PRODUCTS,
  GetPromotionProductsData,
  GetPromotionProductsVars
} from 'src/graphql/product/getPromotionProducts';
import withApollo from 'src/utils/withApollo';

import ProductCard from '../ProductCard';
import { ProductsCarousel } from '../ProductsCarousel';
import { Login } from './Login';
import { Partner } from './Partner';
import { ProductsContainer } from './ProductsContainer';
import { Question } from './Question';
import { Strength } from './Strength';

const bannerImages = [
  '/assets/images/drugstore1.jpg',
  'assets/images/drugstore2.jpg',
  'assets/images/drugstore3.jpg'
];

const paginationVars = {
  variables: {
    page: 1,
    pageSize: 10
  }
};

const Home: React.FC = () => {
  const [getDealsOfTheDayProducts, { data: dealsOfTheDayProductsData }] = useLazyQuery<
    GetDealsOfTheDayData,
    GetDealsOfTheDayVars
  >(GET_DEALS_OF_THE_DAY);

  const [getBestSellingProducts, { data: bestSellingData }] = useLazyQuery<
    GetBestSellingProductsData,
    GetBestSellingProductsVars
  >(GET_BEST_SELLING_PRODUCTS);

  const [getNewProducts, { data: newProductsData }] = useLazyQuery<
    GetNewProductsData,
    GetNewProductsVars
  >(GET_NEW_PRODUCTS);

  const [getPromotionProducts, { data: promotionProductsData }] = useLazyQuery<
    GetPromotionProductsData,
    GetPromotionProductsVars
  >(GET_PROMOTION_PRODUCTS);

  useEffect(() => {
    getDealsOfTheDayProducts(paginationVars);
    getBestSellingProducts(paginationVars);
    getNewProducts(paginationVars);
    getPromotionProducts(paginationVars);
  }, []);

  const { t } = useTranslation(['carousels']);

  const carousels = [
    {
      title: t('carousels:deal_of_the_day'),
      products: dealsOfTheDayProductsData?.getProductDealOfTheDay || []
    },
    {
      title: t('carousels:bestseller'),
      products: bestSellingData?.getProductByConditions.Products || []
    },
    {
      title: t('carousels:new_products'),
      products: newProductsData?.getProductByConditions.Products || []
    }
  ];

  const promotionProducts = promotionProductsData?.getProductByConditions.Products || [];

  return (
    <div>
      <SlickSlider
        arrows={false}
        autoplay
        dots
        dotsClass="slick__dots bullet slick-dots"
        className="align-items-center mb-0 slick-dotted">
        {bannerImages.map((img) => (
          <div key={img} className="banner__slide">
            <div className="banner__bg-img"></div>
            <div
              className="banner__img"
              style={{
                backgroundImage: `url("${img}")`
              }}
            />
          </div>
        ))}
      </SlickSlider>

      {carousels.map((carousel, index) => (
        <div key={index} hidden={carousel.products.length === 0}>
          <ProductsContainer title={carousel.title}>
            <ProductsCarousel products={carousel.products} />
          </ProductsContainer>
        </div>
      ))}

      {/* Promotion products */}
      <div hidden={promotionProducts.length === 0}>
        <ProductsContainer
          title={t('carousels:promotion')}
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

      <Strength />

      <Login />

      <Question />

      <Partner />

      {/* <Customer /> */}

      {/* <Social /> */}
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
