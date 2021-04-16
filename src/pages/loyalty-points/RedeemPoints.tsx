import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';

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
          <div className="col-12 mb-3 ">{t('points_owner')}</div>
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
                <tr>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>
                    <Button variant="primary" size="sm" className="text-nowrap">
                      Đổi ngay
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>
                    <Button variant="primary" size="sm" className="text-nowrap">
                      Đổi ngay
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Ngay tao</td>
                  <td>Ngay tao</td>
                  <td>
                    <Button variant="primary" size="sm" className="text-nowrap">
                      Đổi ngay
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ModalWithHeader>
    </>
  );
}

export default RedeemPoints;
