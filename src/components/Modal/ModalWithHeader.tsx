import { Backdrop, Fade, Modal as MaterialModal } from '@material-ui/core';
import React, { FC } from 'react';

import ModalBase, { BaseModalProps } from './ModalBase';

type ModalProps = BaseModalProps & {
  // Modal title
  title: string;

  // Additional classname for modal content container
  className?: string;
};

const ModalWithHeader: FC<ModalProps> = (props) => {
  return (
    <ModalBase open={props.open} onClose={props.onClose}>
      <div className={`modal-dialog modal-dialog-centered ${props.className}`}>
        <div className="modal-content">
          <div className="modal-header">
            <header className="modal-title text-capitalize">{props.title}</header>
            <button onClick={props.onClose} aria-label="Close" className="close" type="button">
              <span aria-hidden="true">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>

          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </ModalBase>
  );

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
        <div className={`modal-dialog modal-dialog-centered ${props.className}`}>
          <div className="modal-content">
            <div className="modal-header">
              <header className="modal-title text-capitalize">{props.title}</header>
              <button onClick={props.onClose} aria-label="Close" className="close" type="button">
                <span aria-hidden="true">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>

            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </Fade>
    </MaterialModal>
  );
};

export default ModalWithHeader;
