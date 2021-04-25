import { Trans, useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import {
  CREATE_LOYALTY_EXCHANGE,
  LoyaltyExchangeVars
} from 'src/graphql/loyalty-points/createLoyaltyExchange';
import {
  GET_LOYALTY_EXCHANGE,
  LoyaltyExchangeData
} from 'src/graphql/loyalty-points/getLoyaltyExchange';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

function RedeemPoints({ totalPoints, refetchTotalPoint }) {
  const { t } = useTranslation(['loyalty']);
  const [open, setOpen] = useState(false);

  const { data: loyaltyExchangeData } = useQueryAuth<LoyaltyExchangeData, undefined>(
    GET_LOYALTY_EXCHANGE,
    {
      fetchPolicy: 'network-only',
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const loyaltyExchange = loyaltyExchangeData?.getLoyaltyExchange
    .slice()
    .sort((a, b) => a.point - b.point);

  const [createLoyaltyExchange] = useMutationAuth<LoyaltyExchangeData, LoyaltyExchangeVars>(
    CREATE_LOYALTY_EXCHANGE,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      },
      onCompleted: () => {
        toast.success(t('exchange_success_notify'));
        refetchTotalPoint();
        setOpen(false);
      }
    }
  );

  const handleLoyaltyExchange = (id: number) => {
    createLoyaltyExchange({
      variables: {
        exchangeId: id
      }
    });
  };

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
                points: totalPoints
              }}
              components={{ b: <b /> }}
            />
          </div>
          <div className="col-12 mb-3">
            <table className="loyalty-table">
              <thead className="loyalty-table-thead">
                <tr>
                  <th scope="col">{t('loyalty_points')}</th>
                  <th scope="col">{t('exchange_value')}</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="loyalty-table-tbody">
                {loyaltyExchange?.map(({ id, name, point }) => (
                  <tr key={id}>
                    <td>{point}</td>
                    <td>{name}</td>
                    <td className="text-center">
                      {totalPoints >= point ? (
                        <Button
                          variant="primary"
                          size="sm"
                          className="text-nowrap"
                          onClick={() => handleLoyaltyExchange(id)}>
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
