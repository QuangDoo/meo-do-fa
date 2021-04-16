import { useTranslation } from 'i18n';
import React from 'react';
import Button from 'src/components/Form/Button';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import withToken from 'src/utils/withToken';

import RedeemPoints from './RedeemPoints';

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
                <tr>
                  <td>Ngay taosdfnlsdklfnklsdfk</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                </tr>
                <tr>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                </tr>
                <tr>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(LoyaltyPoints);
