import {
  Box,
  Button as MuiButton,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
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
import { toast } from 'react-toastify';
import Button from 'src/components/Form/Button';
import PriceText from 'src/components/Form/PriceText';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { APPLY_COUPON, ApplyCouponData, ApplyCouponVars } from 'src/graphql/coupons/applyCoupon';
import { GetCounselData, OutputCounsel } from 'src/graphql/order/getCounsel';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

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
  }
}));

type Props = {
  counselData?: OutputCounsel;
  setCounselData?: (data: OutputCounsel) => void;
};

const StickySidebar = (props: Props): JSX.Element => {
  const { t } = useTranslation(['checkout', 'common', 'errors']);

  const classes = useStyles();

  const [chosenCode, setChosenCode] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);

  const [promoCode, setPromoCode] = useState<string>('');

  const [applyCoupon, { loading: applyingCoupon }] = useMutationAuth<
    ApplyCouponData,
    ApplyCouponVars
  >(APPLY_COUPON, {
    onError: (error) => {
      toast.error(`errors:code_${error.graphQLErrors[0]?.extensions?.code}`);
    },
    onCompleted: (data) => {
      toast.success('checkout:apply_coupon_success');
      props.setCounselData(data.applyCoupon);
      setChosenCode(data.applyCoupon.promotion.coupon_code);
    }
  });

  // const data = props.counselData?.getCounsel;

  // fake data to test
  const data = {
    counsel: {
      orderNo: '123'
    },
    totalQty: 0,
    totalShippingFee: 0,
    totalDcAmt: 0,
    totalNetPrice: 0
  };

  // if (!data) return null;

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

        <SidebarItem label={'Mã khuyến mãi'}>
          <MuiButton
            size="small"
            variant="text"
            color="primary"
            startIcon={<LocalOfferIcon />}
            onClick={handleOpen}>
            {chosenCode || 'Dùng mã'}
          </MuiButton>

          {chosenCode && <DeleteIcon />}

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className={classes.padding2}>
              Chọn mã khuyến mãi
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers className={classes.padding2}>
              <Box display="flex">
                <TextField
                  className={classes.promoCodeInput}
                  size="small"
                  label="Nhập mã"
                  variant="outlined"
                  value={promoCode}
                  onChange={handleChange}
                />

                <MuiButton
                  onClick={handleSubmitPromoCode}
                  className={classes.applyPromoBtn}
                  variant="contained"
                  color="primary">
                  Áp dụng
                </MuiButton>
              </Box>
            </DialogContent>

            <LoadingBackdrop open={applyingCoupon} />
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
