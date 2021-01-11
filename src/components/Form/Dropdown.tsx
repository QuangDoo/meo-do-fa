import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  label: string;
  children: React.ReactNode;
  initialShow?: boolean;
}

const Dropdown = (props: Props) => {
  const { label: header } = props;
  const { initialShow = true } = props;
  const [show, setShow] = useState(initialShow);

  function toggleShow() {
    setShow((show) => !show);
  }

  return (
    <>
      <div
        onClick={toggleShow}
        onKeyPress={toggleShow}
        className={clsx('products__filter-header with-toggle', !show && 'collapsed')}
        role="button"
        tabIndex={0}>
        {header}
        <i className="fas fa-chevron-right products__filter-expand" />
      </div>

      <div className={clsx('products__filters collapse', show && 'show')}>{props.children}</div>
    </>
  );
};

export default Dropdown;
