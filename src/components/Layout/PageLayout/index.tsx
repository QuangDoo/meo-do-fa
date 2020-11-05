import React from 'react';

import { StyledLayout } from './styled';

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default PageLayout;
