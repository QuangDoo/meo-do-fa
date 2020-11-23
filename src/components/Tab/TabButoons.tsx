import React, { useState } from 'react';

const TabButtons = ({ buttons, changeTab, activeTab }): JSX.Element => {
  return (
    <div className="nav tab tab-header no-scrollbar">
      {buttons.map((button, index) => {
        return (
          <span
            className={button === activeTab ? 'tab__item active' : 'tab__item'}
            onClick={() => changeTab(button)}
            key={index}
            aria-hidden="true">
            {button}
          </span>
        );
      })}
    </div>
  );
};

export default TabButtons;
