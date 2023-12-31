import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = (props) => {
  return <div className="container mt-5">{props.children}</div>;
};

export default PageLayout;
