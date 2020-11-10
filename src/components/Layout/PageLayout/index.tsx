import React from 'react';

import { StyledLayout } from './styled';

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = (props) => {
  return <div className="container mt-5">{props.children}</div>;
};

export default PageLayout;
