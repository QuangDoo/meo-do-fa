import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
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

  const promoDetail = dataPromoDetail;

  console.log('dataPromoDetail', dataPromoDetail);

  return (
    <Dialog onClose={props.onClose} aria-labelledby="customized-dialog-title" open={props.open}>
      <LoadingBackdrop open={props.loading} />
      <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
        {props.title}
      </DialogTitle>
      <DialogContent dividers className="d-flex flex-column justify-content-between">
        <Typography gutterBottom>{t('promoCodes:code')}: MEDOFA</Typography>
        <Typography gutterBottom>{t('promoCodes:exp_date')}: 03-03-1999</Typography>
        <hr />
        <Typography gutterBottom>
          {t('promoCodes:conditions')}:
          <div className="p-3">
            <ul>
              <li>
                Giảm 100% cho tất cả các đơn hàng. Chỉ cần giới thiệu khách hàng mới thì sẽ có lợi
                nhuận. không cần làm gì cũng có tiền.
              </li>
              <li>Cho luôn</li>
            </ul>
          </div>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
export default forwardRef(PromocodeDetailDialog);
