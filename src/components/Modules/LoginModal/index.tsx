import { withTranslation } from 'i18n';
import { TFunction } from 'next-i18next';
import React from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import LoginForm from './LoginForm';

type LoginModalProps = {
  readonly t?: TFunction;
};

const Login = ({ t }: LoginModalProps): JSX.Element => {
  // Modal is open or not
  const { loginIsOpen } = useModalControlState();

  const { openModal, closeModal } = useModalControlDispatch();

  return (
    <>
      <Button onClick={() => openModal('LOGIN')} size="sm" variant="secondary" className="mr-2">
        {t('header:login')}
      </Button>

      <ModalWithHeader
        open={loginIsOpen}
        title={t('login:modal_title')}
        onClose={closeModal}
        className="authentication login">
        <LoginForm />
      </ModalWithHeader>
    </>
  );
};
export default withTranslation(['header', 'login'])(Login);
