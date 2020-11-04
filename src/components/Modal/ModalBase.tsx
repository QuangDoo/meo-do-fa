import { Backdrop, Fade, Modal as MaterialModal } from '@material-ui/core';
import React, { ReactElement } from 'react';

export type BaseModalProps = {
  // Modal is open
  open: boolean;

  // On modal close
  onClose: () => void;

  children: ReactElement<any, any>;
};

const ModalBase = (props: BaseModalProps): JSX.Element => {
  return (
    <MaterialModal
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300
      }}>
      <Fade in={props.open} timeout={300}>
        {props.children}
      </Fade>
    </MaterialModal>
  );
};

export default ModalBase;
