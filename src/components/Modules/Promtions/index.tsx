import { useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'i18n';
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
  const { data: dataBaner, loading: getingBanner } = useQuery<WebBannerData, bannerInputVars>(
    GET_BANNER,
    {
      variables: { type: BannerType.PROMOTION }
    }
  );

  const promotivebanner = dataBaner?.getWebsiteBanner;

  const { t } = useTranslation('promotions');
  return (
    <div className="container py-5">
      <div className="col-12 mb-3">
        <h1>{t('promotions:promotions')}</h1>
        <div hidden={promotivebanner?.length === 0}>
          {promotivebanner?.map(({ image, id, link }) => (
            <div className="banner__slide__promotion" key={id}>
              <div className="banner__img">
                <Link href={link}>
                  <a>
                    <Image src={image} layout="fill" objectFit="cover" />
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div hidden={promotivebanner?.length !== 0}>
          <Trans
            i18nKey="promotions:no_promotion"
            components={{
              a: (
                <a href="/" target="_blank">
                  {''}
                </a>
              )
            }}
          />
        </div>
      </div>
      {/* <Pagination
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
      /> */}
    </div>
  );
};

export default Promotions;
