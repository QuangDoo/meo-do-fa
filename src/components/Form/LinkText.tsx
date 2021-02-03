import Link from 'next/link';
import React from 'react';

const LinkText = ({ href, target = '_self', children, ...props }) => {
  return (
    <Link href={href || ''}>
      <a target={target}>{children}</a>
    </Link>
  );
};

export default LinkText;
