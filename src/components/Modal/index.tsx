import { Backdrop, Fade, Modal as MaterialModal } from '@material-ui/core'
import React, { FC } from 'react'
import ModalHeader from './ModalHeader'

type ModalProps = {
  open: boolean
  title: string
  closeModal: () => void
  className?: string
}

const Modal: FC<ModalProps> = (props) => {
  return (
    <MaterialModal
      open={props.open}
      onClose={props.closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={props.open} timeout={300}>
        <div className={`modal-dialog modal-dialog-centered ${props.className}`}>
          <div className="modal-content">
            <ModalHeader title={props.title} closeModal={props.closeModal} />

            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </Fade>
    </MaterialModal>
  )
}

export default Modal
