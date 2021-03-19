import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import ModalBase from 'src/components/Layout/Modal/ModalBase';

import Button from '../Form/Button';

export default function TermPopup(): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);

  const [visible, setVisible] = useState<boolean>(false);

  const { t } = useTranslation('termPopup');

  const alertMessage = () => {
    return alert(`${t('termPopup:message')}`);
  };

  const handleClick = () => {
    sessionStorage.setItem('pop_status', '1');
    setOpen(false);
  };

  useEffect(() => {
    const pop_status = sessionStorage.getItem('pop_status');
    if (!pop_status) {
      setVisible(true);
    }
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      disableBackdropClick
      disableEscapeKeyDown
      onBackdropClick={alertMessage}>
      <>
        {/* <button className="close_newletter closePopup" onClick={() => alertMessage()}></button> */}

        <div className="mypage">
          <p className="mypage-block">
            <span className="mypage-block__content">
              {t('termPopup:trading_floor')} MEDOFA.COM (“
              <strong>{t('termPopup:exchanges')}</strong>”) {t('termPopup:content')}
            </span>
          </p>
        </div>
        <div className="text-center">
          <Button variant="primary" className="accept" onClick={handleClick}>
            {t('termPopup:agree')}
          </Button>
        </div>
        <div className="text-center py-2">
          <Button variant="secondary" className="no-accept" onClick={() => alertMessage()}>
            {t('termPopup:no_agree')}
          </Button>
        </div>
      </>
    </ModalBase>
  );
}
