import React, { useState } from 'react';

import TabButtons from './TabButoons';

const TabContent = (props): JSX.Element => {
  return (
    <div className="tab-content">
      <div className="tab-pane fade show active" id="description">
        {props.children}
      </div>
    </div>
  );
};
export default TabContent;
