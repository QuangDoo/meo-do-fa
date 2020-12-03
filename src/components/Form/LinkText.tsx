import Link from 'next/link';
import React from 'react';

const LinkText = ({ href, children, ...props }) => {
  return (
    <Link href={href || ''}>
      <a>{children}</a>
    </Link>
  );
};

export default LinkText;
