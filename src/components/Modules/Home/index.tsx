import { useTranslation } from 'i18n';
import React from 'react';
import SlickSlider from 'react-slick';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

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

const Home = ({ dealsOfTheDayData, bestSellingData, promotionProductsData, newProductsData }) => {
  const { t } = useTranslation(['carousels']);
  const isLoggedIn = useIsLoggedIn();

  const carousels = [
    {
      title: t('carousels:deal_of_the_day'),
      products: dealsOfTheDayData?.getProductDealOfTheDay || []
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
      {/* {isLoggedIn ? null : (
        <>
        </>
      )} */}
      {isLoggedIn ? null : (
        <>
          <Login />
        </>
      )}
      <Question />

      <Partner />

      {/* <Customer /> */}

      {/* <Social /> */}
    </div>
  );
};

export default Home;
