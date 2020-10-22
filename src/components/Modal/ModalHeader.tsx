import React, { FC } from 'react'

type ModalHeaderProps = {
  onClose: () => void
  title: string
}

const ModalHeader: FC<ModalHeaderProps> = (props) => {
  return (
    <div className="modal-header">
      <header className="modal-title text-capitalize">{props.title}</header>
      <button onClick={props.onClose} aria-label="Close" className="close" type="button">
        <span aria-hidden="true">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  )
}

export default ModalHeader
