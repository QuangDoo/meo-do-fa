import { Trans, useTranslation } from 'i18n';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';

const loyaltyChangeTypes = [50, 100, 200, 500];

const myPoints = 150;

function RedeemPoints() {
  const { t } = useTranslation(['loyalty']);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="primary" className="mr-2">
        {t('redeem_points')}
      </Button>

      {/* Register modal */}
      <ModalWithHeader open={open} title={t('redeem_title')} onClose={() => setOpen(false)}>
        <div className="row">
          <div className="col-12 mb-3 ">
            <Trans
              i18nKey="loyalty:points_owner"
              values={{
                points: myPoints
              }}
              components={{ b: <b /> }}
            />
          </div>
          <div className="col-12 mb-3">
            <table className="loyalty-table">
              <thead className="loyalty-table-thead">
                <tr>
                  <th scope="col">{t('cumulative_points')}</th>
                  <th scope="col">{t('exchange_value')}</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="loyalty-table-tbody">
                {loyaltyChangeTypes.map((value, index) => (
                  <tr key={index}>
                    <td>{value}</td>
                    <td>
                      <Trans
                        i18nKey="loyalty:coupon_name"
                        values={{
                          value: (value * 1000).toLocaleString('de-DE')
                        }}
                        components={{ b: <b /> }}
                      />
                    </td>
                    <td>
                      {myPoints >= value ? (
                        <Button variant="primary" size="sm" className="text-nowrap">
                          {t('exchange_point_button')}
                        </Button>
                      ) : (
                        t('no_enough_points')
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ModalWithHeader>
    </>
  );
}

export default RedeemPoints;
