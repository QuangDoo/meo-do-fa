import { Button, Dialog, Tooltip } from '@material-ui/core';
import { Receipt } from '@material-ui/icons';
import { useTranslation } from 'i18n';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

type Props = {
  confirmDate: Date; // Ngày xác nhận đơn hàng
};

// Chỉ có thể xuất hóa đơn đỏ trong vòng 10 ngày kể từ ngày xác nhận đơn hàng
const expiration = 10;

const ExportInvoice = (props: Props) => {
  const { t } = useTranslation(['myOrders']);

  const { confirmDate } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Chỉ có thể xuất hóa đơn đỏ trong vòng 10 ngày kể từ ngày xác nhận đơn hàng
  const invoiceExportable = DateTime.fromJSDate(confirmDate).diffNow('days').days < -expiration;

  return (
    <>
      <Tooltip title={!invoiceExportable ? t('myOrders:time_out_invoice') : ''}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleOpen}
          disabled={!invoiceExportable}
          startIcon={<Receipt />}>
          {t('myOrders:billing_export')}
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}></Dialog>
    </>
  );
};

export default ExportInvoice;
