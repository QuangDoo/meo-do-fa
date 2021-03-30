import { useQuery } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'i18n';
import React, { forwardRef } from 'react';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { CouponData, CouponVar, GET_COUPON_PROGRAM } from 'src/graphql/coupons/getCouponProgram';

type Props = {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  title?: string;
  promodeCode?: string;
  expire_date?: Date;
  condition?: string;
  id?: number;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function PromocodeDetailDialog(props: Props) {
  const { t } = useTranslation('promoCodes');

  const { data: dataPromoDetail } = useQuery<CouponData, CouponVar>(GET_COUPON_PROGRAM, {
    variables: { id: props.id }
  });

  const promoDetail = dataPromoDetail?.getCouponProgramsDetail;
  const convertDate = (day) => {
    const date = new Date(day?.substring(0, day?.indexOf(' ')));
    if (!isNaN(date?.getTime())) {
      // Months use 0 index.
      return date?.getMonth() + 1 + '/' + date?.getDate() + '/' + date?.getFullYear();
    }
  };

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth={'xs'}>
      <LoadingBackdrop open={props.loading} />
      <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
        {props.title}
      </DialogTitle>
      <DialogContent dividers className="d-flex flex-column justify-content-between">
        <Typography gutterBottom>
          {t('promoCodes:code')}:<b> {promoDetail?.promo_code}</b>
        </Typography>
        {promoDetail?.rule_date_to !== 'false' && (
          <Typography gutterBottom>
            {t('promoCodes:exp_date')}:<b> {convertDate(promoDetail?.rule_date_to)} </b>
          </Typography>
        )}
        <hr />
        <Typography gutterBottom>
          {t('promoCodes:conditions')}:
          <div className="p-3">
            <ul>
              <li>
                <b>{promoDetail?.name}</b>
              </li>
            </ul>
          </div>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
export default forwardRef(PromocodeDetailDialog);
