import { Dialog } from '@material-ui/core';
import React from 'react';

export type ModalBaseProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalBase = (props: ModalBaseProps): JSX.Element => {
  const { open, onClose, children } = props;

  return (
    <Dialog open={open} onClose={onClose} scroll="body" maxWidth="xs" fullWidth>
      {children}
    </Dialog>
  );
};

export default ModalBase;
