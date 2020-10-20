import { TFunction } from 'next-i18next'
import React, { FC, useState } from 'react'
import { withTranslation } from '../../../i18n'
import Button from '../Button'
import Modal from '../Modal'
import LoginForm from './LoginForm'
type LoginModalProps = {
    readonly t?: TFunction;
}
const Login: FC<LoginModalProps> = (props) => {
    const { t } = props
    console.log('props', props)
    const [open, setOpen] = useState(false)

    const openModal = () => setOpen(true)

    const closeModal = () => setOpen(false)
    return (
        <>
            <Button onClick={openModal} size="sm" variant="primary" className="mr-2">
                {t('header:login')}
                
            </Button>
            <Modal
                open={open}
                title="Tạo Tài Khoản"
                onClose={closeModal}
                className="authentication signup"
            >
                <LoginForm />
            </Modal>
        </>
    )
}
export default withTranslation('header')(Login)