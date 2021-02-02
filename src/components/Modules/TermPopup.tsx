import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function TermPopup() {
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
                <span style={{ fontSize: 12 }}>
                  {t('termPopup:trading_floor')} MEDOFA.vn (“
                  <strong>{t('termPopup:exchanges')}</strong>”) {t('termPopup:content')}
                </span>
              </p>
            </div>
            <div className="accept">
              <button onClick={handleClick} className="accept">
                {t('termPopup:agree')}
              </button>
            </div>
            <div className="no-accept">
              <button className="no-accept" onClick={() => alertMessage()}>
                {t('termPopup:no_agree')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
