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
import DeleteIcon from '@material-ui/icons/Delete';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
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

// Fake coupons data
const getUsedCouponsData = {
  getUsedCoupon: [
    {
      code: '123',
      type: 'discount',
      display_name: 'Giảm ngay 200,000 cho đơn hàng tối thiểu giá trị từ 24.000.000',
      expiration_date: new Date('December 30, 2020 12:00:00')
    }
  ]
};

// Fake counsel data
// const counselData = {
//   getCounsel: {
//     counsel: {
//       orderNo: '123'
//     },
//     totalQty: 0,
//     totalShippingFee: 0,
//     totalDcAmt: 0,
//     totalNetPrice: 0
//   }
// };

// Fake get used coupons loading state
// const gettingUsedCoupons = false;

const StickySidebar = (props: Props): JSX.Element => {
  const { t } = useTranslation(['checkout', 'common', 'errors']);

  const classes = useStyles();

  const [appliedCode, setAppliedCode] = useState<boolean>();

  const [open, setOpen] = useState<boolean>(false);

  const [promoCode, setPromoCode] = useState<string>('');

  const { data: getUsedCouponsData, loading: gettingUsedCoupons } = useQueryAuth<
    GetUsedCouponsData,
    undefined
  >(GET_USED_COUPONS, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors[0]?.extensions?.code}`));
    }
  });

  const [applyCoupon, { loading: applyingCoupon }] = useMutationAuth<
    ApplyCouponData,
    ApplyCouponVars
  >(APPLY_COUPON, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors[0]?.extensions?.code}`));
    },
    onCompleted: (data) => {
      toast.success('checkout:apply_coupon_success');
      setOpen(false);
      props.setCounselData(data.applyCoupon);
      setAppliedCode(true);
    }
  });

  // Fake counsel data
  // const data = counselData.getCounsel;

  const data = props.counselData;

  if (!data) return null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handleSubmitPromoCode = () => {
    applyCoupon({
      variables: {
        code: promoCode,
        orderNo: data.counsel.orderNo
      }
    });
  };

  const handleApplyCoupon = (code: string) => {
    applyCoupon({
      variables: {
        code: code,
        orderNo: data.counsel.orderNo
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
        <h4 className="d-flex flex-wrap align-items-center">
          {t('checkout:confirm_checkout_title')}

          <small className="ml-1">
            {t('checkout:confirm_checkout_quantity', {
              quantity: data.totalQty
            })}
          </small>
        </h4>

        <div>
          <Link href="/cart" passHref>
            <Button size="sm" variant="primary">
              {t('checkout:confirm_checkout_edit')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="elevated checkout__info row no-gutters mb-3">
        <SidebarItem label={t('checkout:price_provisional_sums')}>
          <span>
            <PriceText price={props.counselData?.totalPrice} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_shipping_fee')}>
          <span>
            <PriceText price={props.counselData?.totalShippingFee} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:price_total_discount')}>
          <span>
            {props.counselData?.totalDcAmt ? (
              <>
                -<PriceText price={props.counselData?.totalDcAmt} />
              </>
            ) : (
              0
            )}
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem containerClass="checkout__info-promo"></SidebarItem>

        <SidebarItem label={t('checkout:price_total')} containerClass="checkout__info-total">
          <span className="checkout__total">
            <PriceText price={data.totalNetPrice} />
            <span className="unit">{t('common:vnd')}</span>
          </span>
        </SidebarItem>

        <SidebarItem label={t('checkout:apply_coupon_label')}>
          <MuiButton
            size="small"
            variant="text"
            color="primary"
            startIcon={<LocalOfferIcon />}
            onClick={handleOpen}>
            {appliedCode || t('checkout:apply_coupon_btn_label')}
          </MuiButton>

          {appliedCode && <DeleteIcon />}

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className={classes.padding2}>
              {t('checkout:apply_coupon_popup_title')}
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers className={classes.padding2}>
              <Box display="flex" marginBottom={2}>
                <TextField
                  className={classes.promoCodeInput}
                  size="small"
                  label={t('checkout:apply_coupon_input_label')}
                  variant="outlined"
                  value={promoCode}
                  onChange={handleChange}
                />

                <MuiButton
                  onClick={handleSubmitPromoCode}
                  className={classes.applyPromoBtn}
                  variant="contained"
                  color="primary">
                  {t('checkout:apply_coupon_confirm_btn')}
                </MuiButton>
              </Box>

              {getUsedCouponsData?.getUsedCoupon.map((coupon) => (
                <Card key={coupon.code} variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        {coupon.type === 'discount' ? (
                          <PromoDiscountIcon fill="#35409a" />
                        ) : (
                          <PromoGiftIcon fill="#35409a" />
                        )}
                      </Grid>

                      <Grid item xs>
                        <Typography color="primary" gutterBottom className={classes.promoTypeLabel}>
                          {coupon.type === 'discount' ? 'Giảm giá' : 'Quà tặng'}
                        </Typography>

                        <Typography color="textPrimary" gutterBottom>
                          {coupon.display_name}
                        </Typography>

                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography color="textSecondary" className={classes.promoTimeLeft}>
                            <Countdown
                              renderer={(props) => (
                                <>
                                  {zeroPad(props.days, 2)} ngày {zeroPad(props.hours, 2)} giờ{' '}
                                  {zeroPad(props.minutes, 2)} phút {zeroPad(props.seconds, 2)} giây
                                </>
                              )}
                              date={new Date('December 19, 2020 03:24:00')}
                            />
                          </Typography>
                          <MuiButton
                            className={classes.applyPromoBtn}
                            onClick={() => handleApplyCoupon(coupon.code)}
                            variant="contained"
                            color="primary">
                            {t('checkout:apply_coupon_confirm_btn')}
                          </MuiButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
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
