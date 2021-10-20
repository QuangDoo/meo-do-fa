import { Dialog, makeStyles } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React, { forwardRef } from 'react';

export type ModalBaseProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  onBackdropClick?: () => void;
};

const useStyles = makeStyles(() => ({
  root: {
    background: '#f4f7fc',
    borderRadius: '1.25em'
  }
}));

const ModalBase = (props: ModalBaseProps) => {
  const { open, onClose, disableBackdropClick, disableEscapeKeyDown, children } = props;

  const classes = useStyles();

  const { t } = useTranslation('termPopup');

  const alertMessage = () => {
    return alert(`${t('termPopup:message')}`);
  };

  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      alertMessage();
    }

    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return false;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      maxWidth="xs"
      fullWidth
      classes={{ paper: classes.root }}
      // disableBackdropClick={props.disableBackdropClick}
      // onBackdropClick={props.onBackdropClick}
      disableEscapeKeyDown={props.disableEscapeKeyDown}>
      {children}
    </Dialog>
  );
};

export default forwardRef(ModalBase);
