import { useTranslation } from 'i18n';
import Image from 'next/image';
import React from 'react';
import SlickSlider from 'react-slick';
import { useToken } from 'src/contexts/Token';

import ProductCard from '../ProductCard';
import { ProductsCarousel } from '../ProductsCarousel';
import { Login } from './Login';
import { ProductsContainer } from './ProductsContainer';

const bannerImages = [
  // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Freeship.jpg?alt=media',
  // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Medofa.jpg?alt=media'
  '/assets/images/banner_1.png'
];

const bannerMobiles = [
  '/assets/images/banner_mobile.jpg',
  '/assets/images/banner_mobile.jpg',
  '/assets/images/banner_mobile.jpg'
];

const Home = ({ dealsOfTheDayData, bestSellingData, promotionProductsData, newProductsData }) => {
  const { t } = useTranslation(['carousels']);

  const token = useToken();

  const carousels = [
    {
      title: t('carousels:deal_of_the_day'),
      products: dealsOfTheDayData?.getProductDealOfTheDay || [],
      seeMoreUrl: '/deals-of-the-day'
    },
    {
      title: t('carousels:bestseller'),
      products: bestSellingData?.getProductByConditions.Products || [],
      seeMoreUrl: '/products?page=1&tag=best-seller'
    },
    {
      title: t('carousels:new_products'),
      products: newProductsData?.getProductByConditions.Products || [],
      seeMoreUrl: '/products?page=1&tag=new'
    }
  ];

  const promotionProducts = promotionProductsData?.getPrmotionProducts.products || [];

  return (
    <div>
      <SlickSlider
        arrows={false}
        autoplay
        dots
        dotsClass="slick__dots bullet slick-dots"
        className="align-items-center mb-0 slick-dotted d-none d-sm-block">
        {bannerImages.map((img) => (
          <div className="banner__slide" key={img}>
            <div className="banner__img">
              <Image src={img} layout="fill" objectFit="cover" />
            </div>
          </div>
        ))}
      </SlickSlider>

      <SlickSlider
        arrows={false}
        autoplay
        dots
        dotsClass="slick__dots bullet slick-dots"
        className="align-items-center mb-0 slick-dotted d-block d-sm-none">
        {bannerMobiles.map((img) => (
          <div className="banner__slide" key={img}>
            <div className="banner__img banner__img--mobile">
              <Image src={img} layout="fill" objectFit="cover" />
            </div>
          </div>
        ))}
      </SlickSlider>

      {carousels.map((carousel, index) => (
        <div key={index} hidden={carousel.products.length === 0}>
          <ProductsContainer title={carousel.title} seeMoreUrl={carousel.seeMoreUrl}>
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

      {/* <Strength /> */}

      {token ? null : (
        <>
          <Login />
        </>
      )}

      {/* <Question /> */}

      {/* <Partner /> */}

      {/* <Customer /> */}

      {/* <Social /> */}
    </div>
  );
};

export default Home;
