import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  bannerInputVars,
  BannerType,
  GET_BANNER,
  WebBannerData
} from 'src/graphql/banner/getBannerWebSite';

import Pagination from '../Pagination';

const page = 1;

const Promotions = (): JSX.Element => {
  const bannerImages = [
    // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Freeship.jpg?alt=media',
    // 'https://firebasestorage.googleapis.com/v0/b/medofa-image.appspot.com/o/banner%2FBanner-Medofa.jpg?alt=media'
    '/assets/images/banner_1.jpg',
    '/assets/images/banner_mobile_2.jpg'
  ];
  const { data: dataBaner, loading: getingBanner } = useQuery<WebBannerData, bannerInputVars>(
    GET_BANNER,
    {
      variables: { type: BannerType.PROMOTION }
    }
  );

  const Promotivebanner = dataBaner?.getWebsiteBanner;

  const router = useRouter();

  const { t } = useTranslation('promotions');
  return (
    <div className="container py-5">
      <div className="col-12 mb-3">
        <h1>{t('promotions:promotions')}</h1>

        {bannerImages.map((img) => (
          <div className="banner__slide__promotion" key={img}>
            <div className="banner__img">
              <Link href={`promotions/1`}>
                <a>
                  <Image src={img} layout="fill" objectFit="cover" />
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        count={100 / 1}
        page={page}
        siblingCount={4}
        onChange={(page) => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              page: page
            }
          });
        }}
      />
    </div>
  );
};

export default Promotions;
