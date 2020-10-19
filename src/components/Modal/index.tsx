import { Backdrop, Fade, Modal as MaterialModal } from '@material-ui/core'
import React, { FC } from 'react'
import ModalHeader from './ModalHeader'

type ModalProps = {
  // Modal is open
  open: boolean

  // Modal title
  title: string

  // On modal close
  onClose: () => void

  // Additional classname for modal content container
  className?: string
}

const Modal: FC<ModalProps> = (props) => {
  return (
    <MaterialModal
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={props.open} timeout={300}>
        <div className={`modal-dialog modal-dialog-centered ${props.className}`}>
          <div className="modal-content">
            <ModalHeader title={props.title} onClose={props.onClose} />

            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </Fade>
    </MaterialModal>
  )
}

export default Modal
