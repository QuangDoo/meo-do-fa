import { useTranslation } from 'i18n';
import React from 'react';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import ResetPassForm from './ResetPassForm';

const ForgotPasswordModal = () => {
  const { t } = useTranslation(['password']);

  const { closeModal } = useModalControlDispatch();

  const { resetPassIsOpen } = useModalControlState();

  return (
    <ModalWithHeader
      open={resetPassIsOpen}
      onClose={closeModal}
      title={t('password:reset_password')}
      className="authentication signup">
      <ResetPassForm />
    </ModalWithHeader>
  );
};

export default ForgotPasswordModal;
