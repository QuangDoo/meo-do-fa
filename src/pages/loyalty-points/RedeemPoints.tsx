import { CircularProgress, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Trans, useTranslation } from 'i18n';
import React, { useState } from 'react';
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

import { TableHeader } from './index';

function RedeemPoints({ totalPoints, refetchTotalPoint, open, setOpen }) {
  const { t } = useTranslation(['loyalty']);

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

  const [createLoyaltyExchange, { loading: creatingLoyalty }] = useMutationAuth<
    LoyaltyExchangeData,
    LoyaltyExchangeVars
  >(CREATE_LOYALTY_EXCHANGE, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      toast.success(t('exchange_success_notify'));
      refetchTotalPoint();
      // setOpen(false);
    }
  });

  const handleLoyaltyExchange = (id: number) => {
    createLoyaltyExchange({
      variables: {
        exchangeId: id
      }
    });
  };

  return (
    <>
      {/* Register modal */}
      <ModalWithHeader open={open} title={t('redeem_title')} onClose={() => setOpen(false)}>
        {!creatingLoyalty ? (
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
              <TableContainer component={Paper}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader className="text-center">{t('loyalty_points')}</TableHeader>

                        <TableHeader>{t('type')}</TableHeader>

                        <TableHeader className="text-center">{t('points')}</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loyaltyExchange?.map(({ id, name, point }) => (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">
                            {new Intl.NumberFormat('de-DE').format(point)}
                          </TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell className="text-center">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableContainer>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 my-3 text-center">
              <CircularProgress />
            </div>
          </div>
        )}
      </ModalWithHeader>
    </>
  );
}

export default RedeemPoints;
