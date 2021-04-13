import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductTag } from 'src/graphql/product/getProducts';

const tags: ProductTag[] = ['new', 'invoice-exportable', 'only-medofa', 'best-seller'];

const FilterTags = () => {
  const { t } = useTranslation('filterTags');

  const router = useRouter();

  const removeTag = () => {
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
      <Link key={'all'} href={removeTag()}>
        <a
          className={clsx('btn products__filter-btn ', router.query.tag === undefined && 'active')}>
          {t('filterTags:all')}
        </a>
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag}
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              page: 1,
              tag
            }
          }}>
          <a className={clsx('btn products__filter-btn  ', router.query.tag === tag && 'active')}>
            {t('filterTags:' + tag)}
          </a>
        </Link>
      ))}
    </>
  );
};

export default FilterTags;
