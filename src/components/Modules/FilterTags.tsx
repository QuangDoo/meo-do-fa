import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Tag = {
  name: React.ReactNode;
  tab?: string;
};

const tags: Tag[] = [
  { name: 'Tất cả' },
  { name: 'Mới', tab: 'new' },
  { name: 'Hóa đơn nhanh', tab: 'invoice-exportable' },
  { name: 'Chỉ có tại medofa', tab: 'only-medofa' },
  { name: 'Người Việt dùng hàng Việt', tab: 'use-vietnamese' }
];

const FilterTags = () => {
  const router = useRouter();

  return (
    <>
      {tags.map(({ tab, name }) => (
        <Link
          key={tab}
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              page: 1,
              tab
            }
          }}>
          <a className={clsx('btn products__filter-btn', router.query.tab === tab && 'active')}>
            {name}
          </a>
        </Link>
      ))}
    </>
  );
};

export default FilterTags;
