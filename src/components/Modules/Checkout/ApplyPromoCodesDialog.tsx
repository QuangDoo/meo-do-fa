import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'i18n';
import React, { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { MyCoupon } from 'src/graphql/coupons/getUsedCoupons';
import { OutputCounsel } from 'src/graphql/order/getCounsel';

import PromoDiscountIcon from './PromoDiscountIcon';
import PromoGiftIcon from './PromoGiftIcon';

const useStyles = makeStyles((theme: Theme) => ({
  padding2: {
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  promoCodeInput: {
    flex: 1
  },
  applyPromoBtn: {
    minWidth: 'fit-content',
    marginLeft: theme.spacing(2)
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  promoTypeLabel: {
    textTransform: 'uppercase',
    fontWeight: 700
  },
  promoTimeLeft: {
    fontSize: 14
  }
}));

type Props = {
  open: boolean;
  onClose: () => void;
  handleApplyCoupon: (code: string) => void;
  handleUnapplyCoupon: (code: string) => void;
  usableCoupons: MyCoupon[];
  loading: boolean;
  counselData: OutputCounsel;
};

export default function ApplyPromoCodesDialog(props: Props) {
  const { t } = useTranslation(['checkout', 'errors']);

  const [input, setInput] = useState('');

  const classes = useStyles();

  const appliedCode = props.counselData?.counsel?.promotion?.coupon_code;

  const availableCoupons =
    props.usableCoupons
      ?.slice()
      .filter((coupon) => new Date(coupon.expiration_date).valueOf() - new Date().valueOf() > 0) ||
    [];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.length > 0) {
      props.handleApplyCoupon(input);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <LoadingBackdrop open={props.loading} />

      <DialogTitle className={classes.padding2}>
        {t('checkout:apply_coupon_popup_title')}
        <IconButton className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={classes.padding2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex">
              <TextField
                className={classes.promoCodeInput}
                name="promoCode"
                size="small"
                label={t('checkout:apply_coupon_input_label')}
                variant="outlined"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={handleKeyPress}
              />

              <Button
                className={classes.applyPromoBtn}
                onClick={() => props.handleApplyCoupon(input)}
                variant="contained"
                color="primary"
                disabled={!input}>
                {t('checkout:apply_coupon_confirm_btn')}
              </Button>
            </Box>
          </Grid>

          {availableCoupons.length === 0 ? (
            <Grid item xs={12} spacing={2}>
              <Box textAlign="center">{t('checkout:no_coupons')}</Box>
            </Grid>
          ) : (
            availableCoupons
              .sort((a, b) => (a.code === appliedCode ? -1 : 0))
              .map((coupon) => (
                <Grid key={coupon.code} item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={2}>
                          {coupon.program.reward_type === 'discount' ? (
                            <PromoDiscountIcon fill="#35409a" />
                          ) : (
                            <PromoGiftIcon fill="#35409a" />
                          )}
                        </Grid>

                        <Grid item xs>
                          <Typography
                            color="primary"
                            gutterBottom
                            className={classes.promoTypeLabel}>
                            {t(`checkout:reward_type_${coupon.program.reward_type}`)}
                          </Typography>

                          <Typography color="textPrimary" gutterBottom>
                            {coupon.program.name}
                          </Typography>

                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography color="textSecondary" className={classes.promoTimeLeft}>
                              <Countdown
                                renderer={(props) => (
                                  <>
                                    {zeroPad(props.days, 2) + ' '}
                                    {t('checkout:days', { count: props.days }) + ' '}
                                    {zeroPad(props.hours, 2) + ' '}
                                    {t('checkout:hours', { count: props.hours }) + ' '}
                                    {zeroPad(props.minutes, 2) + ' '}
                                    {t('checkout:minutes', { count: props.minutes }) + ' '}
                                    {zeroPad(props.seconds, 2) + ' '}
                                    {t('checkout:seconds', { count: props.seconds })}
                                  </>
                                )}
                                date={new Date(coupon.expiration_date)}
                              />
                            </Typography>

                            {coupon.code === appliedCode ? (
                              <Button
                                className={classes.applyPromoBtn}
                                onClick={() => props.handleUnapplyCoupon(coupon.code)}
                                variant="contained"
                                color="secondary">
                                {t('checkout:unapply_coupon_btn')}
                              </Button>
                            ) : (
                              <Button
                                className={classes.applyPromoBtn}
                                onClick={() => props.handleApplyCoupon(coupon.code)}
                                variant="contained"
                                color="primary">
                                {t('checkout:apply_coupon_confirm_btn')}
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
