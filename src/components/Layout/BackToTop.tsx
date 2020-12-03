/* eslint-disable jsx-a11y/no-static-element-interactions */
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';

function BackToTop() {
  const [show, setShow] = useState(false);

  const scroll = Scroll.animateScroll;

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

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={show ? 'back-to-top show' : 'back-to-top'} onClick={scrollToTop}>
      <span>
        <ExpandLessIcon style={{ fontSize: '1rem' }} />
      </span>
      <div className="back-to-top__text">Top</div>
    </div>
  );
}

export default BackToTop;
