import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Dropdown from 'src/components/Form/Dropdown';
import {
  Category,
  GET_CATEGORIES_LEVEL,
  GetCategoriesLevelData
} from 'src/graphql/category/getCategoriesLevel';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';
import removeAccents from 'src/utils/removeAccents';

export default function CategoryFilter() {
  const { t } = useTranslation(['productsSidebar', 'searchBar']);

  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');

  const [filterValue, setFilterValue] = useState<string>('');

  const [original, setOriginal] = useState<Category[]>([]);

  useQuery<GetCategoriesLevelData, undefined>(GET_CATEGORIES_LEVEL, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: (data) => {
      const original = [];

      data.getCategoriesLevel.forEach((parent) => {
        original.push({
          id: parent.id,
          name: parent.name,
          priority: parent.priority,
          categorySub: parent.categorySub.slice().sort((a, b) => a.name.localeCompare(b.name))
        });
      });

      setOriginal(original.sort((a, b) => a.name.localeCompare(b.name)));
    }
  });

  useDebouncedEffect(
    () => {
      setFilterValue(removeAccents(inputValue));
    },
    300,
    [inputValue]
  );

  const getAllHref = () => {
    const newQuery = { ...router.query };

    delete newQuery.category;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  return (
    <Dropdown label={t('productsSidebar:category')}>
      <div className="input-group form__input-group has-icon mb-3">
        <i className="fas fa-search form__input-icon" />

        <input
          type="search"
          className="form-control form-control-sm search-input"
          placeholder={t('searchBar:enter_name_category')}
          aria-label="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <Link href={getAllHref()}>
          <a className={clsx('products__filter-category', !router.query.category && 'active')}>
            {t('productsSidebar:all')}
          </a>
        </Link>
      </div>

      {filterValue &&
        !original.some(
          (parent) =>
            removeAccents(parent.name).includes(filterValue) ||
            parent.categorySub.some((child) => removeAccents(child.name).includes(filterValue))
        ) && (
          <React.Fragment>
            <div className="search__result--empty">
              {t('searchBar:no_category')} <b>{filterValue}</b>
            </div>

            <hr />
          </React.Fragment>
        )}

      {original.map((parent) => {
        const parentNameMatchesInput = removeAccents(parent.name).includes(filterValue);

        const parentIdMatchesQuery = +router.query.category === parent.id;

        const childrenNamesMatchInput = parent.categorySub
          .map((child) => child.name)
          .filter((name) => removeAccents(name).includes(filterValue));

        return (
          <div
            hidden={!parentNameMatchesInput && !childrenNamesMatchInput.length}
            key={parent.id}
            className="mb-2">
            <Dropdown
              label={parent.name}
              show={
                !!filterValue ||
                parentIdMatchesQuery ||
                parent.categorySub.some((child) => child.id === +router.query.category)
              }>
              <div className="pl-3 mb-3">
                <div className="mb-1">
                  <Link
                    href={{
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        category: parent.id
                      }
                    }}>
                    <a
                      className={clsx(
                        'products__filter-category',
                        parentIdMatchesQuery && 'active'
                      )}>
                      {t('productsSidebar:all')}
                    </a>
                  </Link>
                </div>

                {parent.categorySub.map(({ name, id }) => (
                  <div
                    hidden={!parentNameMatchesInput && !childrenNamesMatchInput.includes(name)}
                    key={id}
                    className="mb-1">
                    <Link
                      href={{
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          category: id
                        }
                      }}>
                      <a
                        className={clsx(
                          'products__filter-category',
                          router.query.category === id.toString() && 'active'
                        )}>
                        {name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      })}
    </Dropdown>
  );
}
