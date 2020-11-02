import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  type: 'prev' | 'next';
  hidden: boolean;
};

const NavigateButton = (props: Props): JSX.Element => {
  const { type, hidden } = props;

  const router = useRouter();

  const currentPage = +router.query.page || 1;

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: {
          ...router.query,
          page: type === 'next' ? currentPage + 1 : currentPage - 1
        }
      }}>
      <button hidden={hidden} className="page" style={{ border: 'none' }}>
        <a>
          <i
            className={clsx('fas', {
              'fa-arrow-left': type === 'prev',
              'fa-arrow-right': type === 'next'
            })}
          />
        </a>
      </button>
    </Link>
  );
};

export default NavigateButton;
