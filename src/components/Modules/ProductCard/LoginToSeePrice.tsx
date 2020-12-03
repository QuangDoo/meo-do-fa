import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import React from 'react';
import { useModalControlDispatch } from 'src/contexts/ModalControl';

const LoginToSeePrice = ({ t }: WithTranslation): JSX.Element => {
  const { openModal } = useModalControlDispatch();

  const openLoginModal = () => openModal('LOGIN');

  return (
    <button onClick={openLoginModal} className="btn btn-block btn-sm btn-outline-primary">
      {t('productCard:loginToSeePrice')}
    </button>
  );
};

export default withTranslation('productCard')(LoginToSeePrice);
