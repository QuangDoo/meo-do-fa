import { CircularProgress, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { Trans, useTranslation } from 'i18n';
import React from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_LOYALTY_HISTORY,
  LoyaltyHistoryData,
  LoyaltyType
} from 'src/graphql/loyalty-points/getLoyaltyHistory';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withToken from 'src/utils/withToken';

import RedeemPoints from './RedeemPoints';

export const TableHeader = ({ children, ...props }) => {
  return (
    <TableCell {...props}>
      <Typography variant="button">{children}</Typography>
    </TableCell>
  );
};

function LoyaltyPoints() {
  const { t } = useTranslation(['loyalty']);

  const { data: loyaltyHistoryData, loading, refetch } = useQueryAuth<
    LoyaltyHistoryData,
    undefined
  >(GET_LOYALTY_HISTORY, {
    fetchPolicy: 'network-only',
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const loyaltyHistory = loyaltyHistoryData?.getLoyaltyHistory?.slice().reverse();
  const totalPoints = loyaltyHistory?.[0]?.loyalty_point_sum ?? 0;

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('title')}</title>
        <meta property="og:title" content="Loyalty points" />
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
      <ProfileLayout title={t('title')}>
        <div className="row">
          <div className="col-12 mb-3 ">
            <Trans
              i18nKey="loyalty:points_owner"
              values={{
                points: new Intl.NumberFormat('de-DE').format(totalPoints)
              }}
              components={{ b: <b /> }}
            />
          </div>
          <div className="col-12 mb-3">
            <RedeemPoints totalPoints={totalPoints} refetchTotalPoint={refetch} />
          </div>
          <div className="col-12 mb-3">
            <TableContainer component={Paper}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>{t('created_date')}</TableHeader>

                      <TableHeader>{t('type')}</TableHeader>

                      <TableHeader>{t('points')}</TableHeader>

                      <TableHeader>{t('description')}</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="p-5 text-center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : totalPoints > 0 ? (
                      loyaltyHistory.map(({ create_date, type, quantity, description }, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {new Date(create_date).toLocaleDateString('en-GB')}
                          </TableCell>
                          <TableCell>
                            <span
                              className={clsx(
                                type === LoyaltyType.EXCHANGE
                                  ? 'loyalty-text-paid'
                                  : 'loyalty-text-earn'
                              )}>
                              {type === LoyaltyType.EXCHANGE ? 'PAID' : 'EARNED'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={clsx(
                                type === LoyaltyType.EXCHANGE
                                  ? 'loyalty-text-paid'
                                  : 'loyalty-text-earn'
                              )}>
                              {new Intl.NumberFormat('de-DE').format(quantity)}
                            </span>
                          </TableCell>
                          <TableCell>{description}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="p-5 text-center">
                          <Typography variant="button">{t('no_loyalty_history')}</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(LoyaltyPoints);
