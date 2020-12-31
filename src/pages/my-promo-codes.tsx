import { CircularProgress, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Cookies from 'cookies';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import Pagination from 'src/components/Modules/Pagination';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_COUPONS_BY_USER,
  GetCouponsByUserData,
  GetCouponsByUserVars
} from 'src/graphql/user/getCouponsByUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withApollo from 'src/utils/withApollo';

const pageSize = 10;

const TableHeader = ({ children, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography variant="button">{children}</Typography>
    </TableCell>
  );
};

const MyPromoCodes = () => {
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
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

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

      <Footer />
    </>
  );
};

MyPromoCodes.getInitialProps = async (ctx) => {
  if (typeof window === 'undefined') {
    const cookies = new Cookies(ctx.req, ctx.res);

    if (!cookies.get('token')) {
      ctx.res.writeHead(302, {
        Location: '/'
      });

      ctx.res.end();
    }
  }

  return {
    namespacesRequired: ['myPromoCodes']
  };
};

export default withApollo({ ssr: true })(MyPromoCodes);
