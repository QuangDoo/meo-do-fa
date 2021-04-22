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

function LoyaltyPoints() {
  const { t } = useTranslation(['loyalty']);

  const { data: loyaltyHistoryData, refetch } = useQueryAuth<LoyaltyHistoryData, undefined>(
    GET_LOYALTY_HISTORY,
    {
      fetchPolicy: 'network-only',
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const loyaltyHistory = loyaltyHistoryData?.getLoyaltyHistory?.slice().reverse();
  const totalPoints = loyaltyHistory?.[0]?.loyalty_point_sum;

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <ProfileLayout title={t('title')}>
        <div className="row">
          <div className="col-12 mb-3 ">
            <Trans
              i18nKey="loyalty:points_owner"
              values={{
                points: totalPoints
              }}
              components={{ b: <b /> }}
            />
          </div>
          <div className="col-12 mb-3">
            <RedeemPoints totalPoints={totalPoints} refetchTotalPoint={refetch} />
          </div>
          <div className="col-12 mb-3 text-info">
            <h4>{t('points_hisoty_title')}</h4>
          </div>
          <div className="col-12 mb-3 overflow-auto">
            <table className="loyalty-table">
              <thead className="loyalty-table-thead">
                <tr>
                  <th scope="col">{t('created_date')}</th>
                  <th scope="col">{t('type')}</th>
                  <th scope="col">{t('points')}</th>
                  <th scope="col">{t('description')}</th>
                </tr>
              </thead>
              <tbody className="loyalty-table-tbody">
                {loyaltyHistory?.map(({ create_date, type, quantity, description }, index) => (
                  <tr key={index}>
                    <td>{new Date(create_date).toLocaleDateString('en-GB')}</td>
                    <td
                      className={clsx(
                        type === LoyaltyType.EXCHANGE ? 'loyalty-text-paid' : 'loyalty-text-earn'
                      )}>
                      {type === LoyaltyType.EXCHANGE ? 'PAID' : 'EARNED'}
                    </td>
                    <td
                      className={clsx(
                        type === LoyaltyType.EXCHANGE ? 'loyalty-text-paid' : 'loyalty-text-earn'
                      )}>
                      {quantity}
                    </td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(LoyaltyPoints);
