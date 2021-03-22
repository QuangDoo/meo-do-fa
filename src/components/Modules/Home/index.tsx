import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Image from 'next/image';
import React from 'react';
import SlickSlider from 'react-slick';
import { useToken } from 'src/contexts/Token';
import {
  bannerInputVars,
  BannerType,
  GET_BANNER,
  WebBannerData
} from 'src/graphql/banner/getBannerWebSite';

import ProductCard from '../ProductCard';
import { ProductsCarousel } from '../ProductsCarousel';
import { Login } from './Login';
import { ProductsContainer } from './ProductsContainer';

const bannerImages = [
  // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Freeship.jpg?alt=media',
  // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Medofa.jpg?alt=media'
  '/assets/images/banner_1.jpg',
  '/assets/images/banner_3.jpg'
];

const bannerMobiles = [
  '/assets/images/banner_mobile_1.jpg',
  '/assets/images/banner_mobile_2.jpg',
  '/assets/images/banner_mobile_3.jpg'
];

const Home = ({ dealsOfTheDayData, bestSellingData, promotionProductsData, newProductsData }) => {
  const { t } = useTranslation(['carousels']);

  const { data: dataBanerPC, loading: getingBannerPC } = useQuery<WebBannerData, bannerInputVars>(
    GET_BANNER,
    {
      variables: { type: BannerType.MAIN }
    }
  );

  const { data: dataBanerMoblie, loading: getingBannerMobile } = useQuery<
    WebBannerData,
    bannerInputVars
  >(GET_BANNER, {
    variables: { type: BannerType.MOBILE }
  });

  const bannerPC = dataBanerPC?.getWebsiteBanner;

  const banerMoblie = dataBanerMoblie?.getWebsiteBanner;

  const token = useToken();

  const carousels = [
    {
      title: t('carousels:deal_of_the_day'),
      products: dealsOfTheDayData?.getProductDealOfTheDay || [],
      seeMoreUrl: '/deals-of-the-day',
      iconClass: 'fas fa-capsules'
    },
    {
      title: t('carousels:bestseller'),
      products: bestSellingData?.getProductByConditions.Products || [],
      seeMoreUrl: '/products?page=1&tag=best-seller',
      iconClass: 'fas fa-capsules'
    },
    {
      title: t('carousels:new_products'),
      products: newProductsData?.getProductByConditions.Products || [],
      seeMoreUrl: '/products?page=1&tag=new',
      iconClass: 'fas fa-capsules'
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
        {bannerPC?.map(({ image, id }) => (
          <div className="banner__slide" key={id}>
            <div className="banner__img">
              <Image src={image} layout="fill" objectFit="cover" />
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
        {banerMoblie?.map(({ image, id }) => (
          <div className="banner__slide" key={image}>
            <div className="banner__img banner__img--mobile">
              <Image src={image} layout="fill" objectFit="cover" />
            </div>
          </div>
        ))}
      </SlickSlider>

      {carousels.map((carousel, index) => (
        <div key={index} hidden={carousel.products.length === 0}>
          <ProductsContainer
            title={carousel.title}
            iconClass={carousel.iconClass}
            seeMoreUrl={carousel.seeMoreUrl}
            className={clsx(index === 0 && 'mt-5')}>
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

      {!token && <Login />}

      {/* <Question /> */}

      {/* <Partner /> */}

      {/* <Customer /> */}

      {/* <Social /> */}
    </div>
  );
};

export default Home;
