import { TFunction } from 'next-i18next'
import React, { FC, useState } from 'react'
import { withTranslation } from '../../../i18n'
import Button from '../Button'
import Modal from '../Modal'
import RegisterForm from './RegisterForm'

type RegisterModalProps = {
  readonly t: TFunction
}

const Register: FC<RegisterModalProps> = (props) => {
  const { t } = props

  // Open modal or not
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)

  const closeModal = () => setOpen(false)

  return (
    <>
      {/* Register button to open modal */}
      <Button onClick={openModal} size="sm" variant="primary" className="mr-2">
        {t('header:register')}
      </Button>

      {/* Register modal */}
      <Modal
        open={open}
        title="Tạo Tài Khoản"
        onClose={closeModal}
        className="authentication signup"
      >
        <RegisterForm />
      </Modal>
    </>
  )
}

export default withTranslation('header')(Register)
