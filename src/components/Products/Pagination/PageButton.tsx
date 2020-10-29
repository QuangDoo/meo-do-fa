import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  page?: any;
};

const PageButton = (props: Props) => {
  const { page } = props;

  const router = useRouter();

  // This button is current if it has the same page as the current page query
  //  OR if it's the 1st page and the page query is undefined (first time loading route)
  const isCurrent = router.query.page === page?.toString() || (!router.query.page && page === 1);

  const newQuery = {
    ...router.query,
    page
  };

  if (!page) delete newQuery.page;

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: newQuery
      }}>
      <span className={clsx('page', isCurrent && 'current')}>
        {isCurrent ? page : <a>{page}</a>}
      </span>
    </Link>
  );
};

export default PageButton;
