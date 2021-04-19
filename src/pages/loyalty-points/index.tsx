import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import withToken from 'src/utils/withToken';

import RedeemPoints from './RedeemPoints';
enum LoyaltyType {
  MANUAL = 'EARNED',
  EXCHANGE = 'PAID',
  AUTO = 'auto'
}

const loyaltyData = [
  {
    type: LoyaltyType.MANUAL,
    quantity: 100000,
    description: 'lorem blah blah hahahahha',
    create_date: '19/04/2021'
  },
  {
    type: LoyaltyType.MANUAL,
    quantity: 100000,
    description: 'lorem blah blah hahahahha',
    create_date: '19/04/2021'
  },
  {
    type: LoyaltyType.EXCHANGE,
    quantity: -100000,
    description: 'lorem blah blah hahahahha',
    create_date: '19/04/2021'
  },
  {
    type: LoyaltyType.EXCHANGE,
    quantity: -100000,
    description: 'lorem blah blah hahahahha',
    create_date: '19/04/2021'
  },
  {
    type: LoyaltyType.MANUAL,
    quantity: 100000,
    description: 'lorem blah blah hahahahha',
    create_date: '19/04/2021'
  }
];

function LoyaltyPoints() {
  const { t } = useTranslation(['loyalty']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <ProfileLayout title={t('title')}>
        <div className="row">
          <div className="col-12 mb-3 ">{t('points_owner')}</div>
          <div className="col-12 mb-3">
            <RedeemPoints />
          </div>
          <div className="col-12 mb-3 text-info">
            <h4>{t('points_hisoty_title')}</h4>
          </div>
          <div className="col-12 mb-3">
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
                {loyaltyData.map(({ create_date, type, quantity, description }) => (
                  <>
                    <tr>
                      <td>{create_date}</td>
                      <td
                        className={clsx(
                          type === LoyaltyType.EXCHANGE ? 'loyalty-text-paid' : 'loyalty-text-earn'
                        )}>
                        {type}
                      </td>
                      <td
                        className={clsx(
                          type === LoyaltyType.EXCHANGE ? 'loyalty-text-paid' : 'loyalty-text-earn'
                        )}>
                        {quantity}
                      </td>
                      <td>{description}</td>
                    </tr>
                  </>
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
