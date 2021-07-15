import { Card, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_COUPONS_BY_USER,
  GetCouponsByUserData,
  GetCouponsByUserVars
} from 'src/graphql/user/getCouponsByUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

const pageSize = 10;

MyPromoCodes.getinitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myPromoCodes']
});

function MyPromoCodes() {
  const { t } = useTranslation('myPromoCodes');

  const router = useRouter();

  const page = +router.query.page || 1;

  const { data, loading } = useQueryAuth<GetCouponsByUserData, GetCouponsByUserVars>(
    GET_COUPONS_BY_USER,
    {
      variables: {
        page: page,
        pageSize: pageSize
      }
    }
  );

  const total = data?.getCouponsByUser.total || 0;

  const coupons = data?.getCouponsByUser?.coupons;

  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        page: page,
        pageSize: pageSize
      }
    });
  };

  const handleCopy = (name) => {
    navigator.clipboard.writeText(name || '');
    toast.success('Đã copy mã giảm giá');
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myPromoCodes:my_promo_codes')}</title>
        <meta property="og:title" content="My promotion codes" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <ProfileLayout title={t('myPromoCodes:my_promo_codes')}>
        <Grid container spacing={2} hidden={total === 0}>
          {coupons?.map((coupon) => (
            <Grid item md={6} xs={12} key={coupon.display_name}>
              <div className="offers-details">
                <div className="mgg-bl">
                  <div className="mgg-row">
                    <div className="mgg-top">
                      <div className="mgg-discount">{coupon.display_name}</div>
                    </div>
                    <div className="polyxgo_title">
                      <span className="polyxgo_bold">{t('myPromoCodes:receive_date')}:</span>
                      <span className="pxg_price"> {coupon.create_date}</span>
                      <div>
                        <span className="polyxgo_bold">{t('myPromoCodes:expire_date')}:</span>
                        <span className="pxg_price"> {coupon.expiration_date}</span>
                      </div>
                      <div>
                        <span className="polyxgo_bold">{t('myPromoCodes:status')}:</span>
                        <span className="pxg_price"> {coupon.state}</span>
                      </div>
                      <div>
                        <span className="polyxgo_bold">
                          {t('myPromoCodes:related_order_number')}:
                        </span>
                        <span className="pxg_price"> {coupon.orderNo}</span>
                      </div>
                    </div>
                  </div>
                  <Tooltip title={coupon.display_name} placement="top">
                    <div className="mgg-bottom">
                      <div className="coupon-code">
                        <span className="vc-mgg">{coupon.display_name}</span>
                        <button className="cp-mgg" onClick={() => handleCopy(coupon.display_name)}>
                          <i className="far fa-copy"></i> COPY
                        </button>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        <div className="p-5 text-center" hidden={total > 0}>
          <Typography variant="button">{t('myPromoCodes:no_promo_codes')}</Typography>
        </div>

        <Pagination count={total / pageSize} page={page} onChange={handlePageChange} />
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyPromoCodes);
