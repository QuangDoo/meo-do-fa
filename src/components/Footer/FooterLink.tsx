import Link from 'next/link';
import React from 'react';

export type Props = {
  text: string;
  href: string;
};

const FooterLink = (props: Props) => {
  return (
    <Link href={props.href}>
      <a className="footer__link">{props.text}</a>
    </Link>
  );
};

export default FooterLink;
