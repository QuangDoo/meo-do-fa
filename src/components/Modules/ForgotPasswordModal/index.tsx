import { useTranslation } from 'i18n';
import React from 'react';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import ResetPassForm from './ResetPassForm';

const ForgotPasswordModal = () => {
  const { t } = useTranslation(['password']);

  const dispatch = useModalControlDispatch();

  const closeResetPassModal = () => dispatch({ type: 'CLOSE_RESETPASS_MODAL' });

  const { resetPassIsOpen } = useModalControlState();

  return (
    <ModalWithHeader
      open={resetPassIsOpen}
      onClose={closeResetPassModal}
      title={t('password:reset_password')}
      className="authentication signup">
      <ResetPassForm />
    </ModalWithHeader>
  );
};

export default ForgotPasswordModal;
