import { TFunction } from 'next-i18next';
import React from 'react';

import { withTranslation } from '../../../i18n';
import { useModalControlDispatch, useModalControlState } from '../../contexts/ModalControl';
import Button from '../Form/Button';
import Modal from '../Modal';
import LoginForm from './LoginForm';

type LoginModalProps = {
  readonly t?: TFunction;
};

const Login = ({ t }: LoginModalProps): JSX.Element => {
  // Modal is open or not
  const { loginIsOpen } = useModalControlState();

  // Dispatch to update ModalControl context
  const dispatch = useModalControlDispatch();

  const openModal = () => {
    dispatch({
      type: 'OPEN_LOGIN_MODAL'
    });
  };

  const closeModal = () =>
    dispatch({
      type: 'CLOSE_LOGIN_MODAL'
    });

  return (
    <>
      <Button onClick={openModal} size="sm" variant="secondary" className="mr-2">
        {t('header:login')}
      </Button>

      <Modal
        open={loginIsOpen}
        title="Đăng Nhập Thành Viên"
        onClose={closeModal}
        className="authentication login">
        <LoginForm />
      </Modal>
    </>
  );
};
export default withTranslation('header')(Login);
