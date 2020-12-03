/* eslint-disable jsx-a11y/click-events-have-key-events */
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import React, { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const onSetShow = () => {
    if (!show && window.pageYOffset > 400) {
      setShow(true);
    } else if (show && window.pageYOffset < 400) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', onSetShow);
    return () => document.removeEventListener('scroll', onSetShow);
  });

  useEffect(() => {
    console.log(show);
  });

  const scrollTop = () => {
    // eslint-disable-next-line no-var
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={show ? 'back-to-top show' : 'back-to-top'} onClick={scrollTop}>
      <span>
        <ExpandLessIcon style={{ fontSize: '1rem' }} />
      </span>
      <div className="back-to-top__text">Top</div>
    </div>
  );
}
