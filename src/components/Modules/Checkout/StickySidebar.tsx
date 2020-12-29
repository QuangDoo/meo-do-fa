import {
  Box,
  Button as MuiButton,
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
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_COUPON, ApplyCouponData, ApplyCouponVars } from 'src/graphql/coupons/applyCoupon';
import { GET_USED_COUPONS, GetUsedCouponsData } from 'src/graphql/coupons/getUsedCoupons';
import { OutputCounsel } from 'src/graphql/order/getCounsel';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';

import PromoDiscountIcon from './PromoDiscountIcon';
import PromoGiftIcon from './PromoGiftIcon';

type SidebarItemProps = {
  label?: string;
  children?: React.ReactNode;
  containerClass?: string;
};

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div className={clsx('col-12', props.containerClass)}>
      {(props.label || props.children) && (
        <div className="checkout__info-item d-flex justify-content-between align-items-center">
          <small className="checkout__info-item-label">{props.label}</small>

          {props.children}
        </div>
      )}
    </div>
  );
};

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
  counselData?: OutputCounsel;
  setCounselData?: (data: OutputCounsel) => void;
};

const StickySidebar = (props: Props): JSX.Element => {
  const { counselData } = props;

  const appliedCoupon = counselData?.counsel?.coupon_code;

  const { t } = useTranslation(['checkout', 'common', 'errors']);

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const [promoInput, setPromoInput] = useState<string>('');

  const handlePromoInputKeyUp = (e) => {
    e.key === 'Enter' && handleApplyCoupon(promoInput);
  };

  const { data: getUsedCouponsData, loading: gettingUsedCoupons } = useQueryAuth<
    GetUsedCouponsData,
    undefined
  >(GET_USED_COUPONS, {
    onCompleted: (data) => {
      if (!appliedCoupon) return;

      if (data.getUsedCoupon.some((myCoupon) => myCoupon.code === appliedCoupon)) {
        return;
      }

      setPromoInput(appliedCoupon);
    },
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const [applyCoupon, { loading: applyingCoupon }] = useMutationAuth<
    ApplyCouponData,
    ApplyCouponVars
  >(APPLY_COUPON, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: (data) => {
      toast.success(t('checkout:apply_coupon_success'));
      props?.setCounselData?.(data.applyCoupon);
    }
  });

  if (!counselData) return null;

  const handleApplyCoupon = (code: string) => {
    if (!code) {
      toast.error(t('checkout:coupon_code_required'));
    }

    applyCoupon({
      variables: {
        code: code,
        orderNo: counselData.counsel.orderNo,
        type: 1
      }
    });
  };

  const handleUnapplyCoupon = () => {
    applyCoupon({
      variables: {
        code: appliedCoupon,
        orderNo: counselData.counsel.orderNo,
        type: 0
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="checkout__sticky">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="d-flex flex-wrap align-items-baseline">
          {t('checkout:confirm_checkout_title')}

          <small className="ml-1">
            (
            {t('checkout:confirm_checkout_quantity', {
              count: counselData.totalQty
            })}
            )
          </small>
        </h4>

        <div>
          <Link href="/cart">
            <Button size="sm" variant="primary">
              {t('checkout:confirm_checkout_edit')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="elevated checkout__info row no-gutters mb-3">
        <SidebarItem label={t('checkout:price_provisional_sums')}>
          <span>
            <PriceText price={counselData.totalPrice} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_shipping_fee')}>
          <span>
            <PriceText price={counselData.totalShippingFee} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_total_discount')}>
          <span>
            {counselData.totalDcAmt ? (
              <>
                -<PriceText price={counselData.totalDcAmt} />
              </>
            ) : (
              0
            )}
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>
        <SidebarItem label={t('checkout:price_tax')}>
          <span>
            <PriceText price={counselData.totalPriceVat} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>
        <SidebarItem containerClass="checkout__info-promo"></SidebarItem>

        <SidebarItem label={t('checkout:price_total')} containerClass="checkout__info-total">
          <span className="checkout__total">
            <PriceText price={counselData.totalNetPrice} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:apply_coupon_label')}>
          <div>
            <MuiButton
              size="small"
              variant="text"
              color="primary"
              startIcon={<LocalOfferIcon />}
              onClick={handleOpen}>
              {appliedCoupon || t('checkout:apply_coupon_btn_label')}
            </MuiButton>
          </div>

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className={classes.padding2}>
              {t('checkout:apply_coupon_popup_title')}
              <IconButton className={classes.closeButton} onClick={handleClose}>
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
                      value={promoInput}
                      onChange={(event) => setPromoInput(event.target.value)}
                      onKeyUp={handlePromoInputKeyUp}
                      disabled={!!appliedCoupon}
                    />

                    {appliedCoupon === promoInput ? (
                      <MuiButton
                        className={classes.applyPromoBtn}
                        onClick={handleUnapplyCoupon}
                        variant="contained"
                        color="secondary">
                        {t('checkout:unapply_coupon_btn')}
                      </MuiButton>
                    ) : (
                      <MuiButton
                        className={classes.applyPromoBtn}
                        onClick={() => handleApplyCoupon(promoInput)}
                        variant="contained"
                        color="primary"
                        disabled={!!appliedCoupon}>
                        {t('checkout:apply_coupon_confirm_btn')}
                      </MuiButton>
                    )}
                  </Box>
                </Grid>

                {getUsedCouponsData?.getUsedCoupon.map((coupon) => (
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

                              {appliedCoupon === coupon.code ? (
                                <MuiButton
                                  className={classes.applyPromoBtn}
                                  onClick={handleUnapplyCoupon}
                                  variant="contained"
                                  color="secondary">
                                  {t('checkout:unapply_coupon_btn')}
                                </MuiButton>
                              ) : (
                                <MuiButton
                                  className={classes.applyPromoBtn}
                                  onClick={() => handleApplyCoupon(coupon.code)}
                                  variant="contained"
                                  color="primary"
                                  disabled={!!appliedCoupon}>
                                  {t('checkout:apply_coupon_confirm_btn')}
                                </MuiButton>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>

            <LoadingBackdrop open={applyingCoupon || gettingUsedCoupons} />
          </Dialog>
        </SidebarItem>
      </div>

      <div className="text-right">
        <div className="mb-2">
          <small>{t('checkout:confirm_checkout_doubleCheck')}</small>
        </div>

        <Button variant="secondary" size="lg" type="submit">
          {t('checkout:confirm_checkout_button')}
        </Button>
      </div>
    </div>
  );
};

export default StickySidebar;
