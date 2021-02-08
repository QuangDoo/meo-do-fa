import clsx from 'clsx';
import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';

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
  if (!visible) return null;

  return (
    <div className={clsx('newletter-popup engo-popup', open && 'active')}>
      {open && (
        <>
          <div className="overlay" />
          <div className="content">
            <button className="close_newletter closePopup" onClick={() => alertMessage()}></button>

            <div className="mypage">
              <p style={{ textAlign: 'justify' }}>
                <span>
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
          </div>
        </>
      )}
    </div>
  );
}
