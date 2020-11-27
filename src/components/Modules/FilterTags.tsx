import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Tag = {
  name: React.ReactNode;
  tag?: string;
};

const tags: Tag[] = [
  { name: 'Tất cả' },
  { name: 'Mới', tag: 'new' },
  { name: 'Hóa đơn nhanh', tag: 'invoice-exportagle' },
  { name: 'Chỉ có tại medofa', tag: 'only-medofa' },
  { name: 'Người Việt dùng hàng Việt', tag: 'use-vietnamese' }
];

const FilterTags = () => {
  const router = useRouter();

  const getHref = (tag) => {
    if (tag) {
      return {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          tag
        }
      };
    }

    const oldQuery = { ...router.query };

    delete oldQuery.tag;

    return {
      pathname: router.pathname,
      query: {
        ...oldQuery,
        page: 1
      }
    };
  };

  return (
    <>
      {tags.map(({ tag, name }) => (
        <Link key={tag} href={getHref(tag)}>
          <a className={clsx('btn products__filter-btn', router.query.tag === tag && 'active')}>
            {name}
          </a>
        </Link>
      ))}
    </>
  );
};

export default FilterTags;
