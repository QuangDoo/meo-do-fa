import { Button, Dialog, Tooltip } from '@material-ui/core';
import { Receipt } from '@material-ui/icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

type Props = {
  confirmDate: Date; // Ngày xác nhận đơn hàng
};

// Chỉ có thể xuất hóa đơn đỏ trong vòng 10 ngày kể từ ngày xác nhận đơn hàng
const expiration = 10;

const ExportInvoice = (props: Props) => {
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
      <Tooltip
        title={!invoiceExportable ? 'Đơn hàng của bạn đã quá thời gian để xuất hóa đơn' : ''}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleOpen}
          disabled={!invoiceExportable}
          startIcon={<Receipt />}>
          Xuất hóa đơn
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}></Dialog>
    </>
  );
};

export default ExportInvoice;
