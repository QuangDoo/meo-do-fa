import { Dialog, DialogProps, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    background: '#f4f7fc',
    borderRadius: '1.25em'
  }
}));

export type ModalBaseProps = DialogProps;

const ModalBase = (props: ModalBaseProps): JSX.Element => {
  const { children } = props;

  const classes = useStyles();

  return (
    <Dialog {...props} classes={{ paper: classes.root }}>
      {children}
    </Dialog>
  );
};

export default ModalBase;
