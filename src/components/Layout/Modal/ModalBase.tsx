import { Dialog, makeStyles } from '@material-ui/core';
import React from 'react';

export type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    background: '#f4f7fc',
    borderRadius: '1.25em'
  }
}));

const ModalBase = (props: ModalBaseProps): JSX.Element => {
  const { open, onClose, children } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      maxWidth="xs"
      fullWidth
      classes={{ paper: classes.root }}>
      {children}
    </Dialog>
  );
};

export default ModalBase;
