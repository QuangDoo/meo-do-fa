import { CircularProgress, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
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

const TableHeader = ({ children, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography variant="button">{children}</Typography>
    </TableCell>
  );
};

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

  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        page: page,
        pageSize: pageSize
      }
    });
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
        <TableContainer component={Paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{t('myPromoCodes:promo_code')}</TableHeader>

                  <TableHeader align="right">{t('myPromoCodes:receive_date')}</TableHeader>

                  <TableHeader align="right">{t('myPromoCodes:expire_date')}</TableHeader>

                  <TableHeader align="right">{t('myPromoCodes:status')}</TableHeader>

                  <TableHeader align="right">{t('myPromoCodes:related_order_number')}</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="p-5 text-center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : total > 0 ? (
                  data.getCouponsByUser.coupons.map((coupon, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {coupon.display_name}
                      </TableCell>
                      <TableCell align="right">{coupon.create_date}</TableCell>
                      <TableCell align="right">{coupon.expiration_date}</TableCell>
                      <TableCell align="right">{coupon.state}</TableCell>
                      <TableCell align="right">{coupon.orderNo}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="p-5 text-center">
                      <Typography variant="button">{t('myPromoCodes:no_promo_codes')}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>

        <Pagination count={total / pageSize} page={page} onChange={handlePageChange} />
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyPromoCodes);
