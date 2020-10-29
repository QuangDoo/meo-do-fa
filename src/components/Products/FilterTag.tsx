import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  tab?: string; // The tab to change when this tag is clicked
  children: React.ReactNode; // Content inside tag
};

// products/?otherQueries?tab=[tab]
const FilterTag = (props: Props) => {
  const { tab, children } = props;

  const router = useRouter();

  // This tag is active if it's the current tab
  // Undefined means 'All products'
  const isActive = router.query.tab === tab;

  // Add tab to query
  const newQuery = {
    ...router.query,
    tab: tab
  };

  // If tab is undefined, remove it from query
  if (tab === undefined) delete newQuery.tab;

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: newQuery
      }}>
      <a className={clsx('btn products__filter-btn', isActive && 'active')}>{children}</a>
    </Link>
  );
};

export default FilterTag;
