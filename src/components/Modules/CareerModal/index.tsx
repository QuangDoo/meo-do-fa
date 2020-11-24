import React from 'react';
import Button from 'src/components/Form/Button';
import ModalWithHeader from 'src/components/Layout/Modal/ModalWithHeader';
import { useModalControlDispatch, useModalControlState } from 'src/contexts/ModalControl';

import CareerForm from './CareerForm';

const CareerModal = (): JSX.Element => {
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
        {'apply'}
      </Button>

      <ModalWithHeader
        open={loginIsOpen}
        title={'Apply for this position'}
        onClose={closeModal}
        className="authentication login">
        <CareerForm />
      </ModalWithHeader>
    </>
  );
};
export default CareerModal;
