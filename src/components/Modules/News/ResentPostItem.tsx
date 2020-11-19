import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  title: string;
};

function ResentPostItem(props: Props): JSX.Element {
  return (
    <li className="resent-post-item">
      <Link href={props.href}>
        <a className="resent-post__link">{props.title}</a>
      </Link>
    </li>
  );
}

export default ResentPostItem;
