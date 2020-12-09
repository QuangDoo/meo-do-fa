import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Tag = {
  name: React.ReactNode;
  tag?: string;
};

const FilterTags = () => {
  const { t } = useTranslation('filterTags');

  const tags: Tag[] = [
    { name: t('all') },
    { name: t('new'), tag: 'new' },
    { name: t('quick_invoice'), tag: 'invoice-exportagle' },
    { name: t('only_medofa'), tag: 'only-medofa' },
    { name: t('vn'), tag: 'use-vietnamese' }
  ];

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
