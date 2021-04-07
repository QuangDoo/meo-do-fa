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

function noAccentCompare(s1, s2) {
  const noAccent1 = removeAccents(s1.trim());
  const noAccent2 = removeAccents(s2.trim());
  return noAccent1.includes(noAccent2);
}

export default function CategoryFilter() {
  const { t } = useTranslation(['productsSidebar', 'searchBar']);

  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');

  const [filterValue, setFilterValue] = useState<string>('');

  // ALL CATEGORIES
  const [original, setOriginal] = useState<Category[]>([]);

  // GET ALL CATEGORIES
  useQuery<GetCategoriesLevelData, undefined>(GET_CATEGORIES_LEVEL, {
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: (data) => {
      const original = [];

      // SORT CHILDREN CATEGORIES ALPHABETICALLY IN EACH PARENT CATEGORY
      data.getCategoriesLevel.forEach((parent) => {
        original.push({
          id: parent.id,
          name: parent.name,
          priority: parent.priority,
          categorySub: parent.categorySub.slice().sort((a, b) => a.name.localeCompare(b.name))
        });
      });

      // SORT PARENT CATEGORIES ALPHABETICALLY AND SET TO ORIGINAL ARRAY
      setOriginal(original.sort((a, b) => a.name.localeCompare(b.name)));
    }
  });

  // DEBOUNCE CHANGE FILTER VALUE
  useDebouncedEffect(
    () => {
      setFilterValue(inputValue);
    },
    300,
    [inputValue]
  );

  // HREF FOR "ALL" LINK
  const getAllHref = () => {
    const newQuery = { ...router.query };

    delete newQuery.category;
    delete newQuery.page;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  // HREF FOR EACH CATEGORY LINK
  const getCategoryHref = (id) => {
    const newQuery = { ...router.query };

    delete newQuery.page;

    newQuery.category = id;

    return {
      pathname: router.pathname,
      query: newQuery
    };
  };

  // HIDE THIS COMPONENT IF THERE ARE NO CATEGORIES
  if (!original.length) {
    return null;
  }

  return (
    <Dropdown label={t('productsSidebar:category')}>
      <div className="input-group form__input-group has-icon mb-3">
        <i className="fas fa-search form__input-icon search-icon-input" />

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
            parent.categorySub.some((child) => noAccentCompare(child.name, filterValue))
        ) && (
          <React.Fragment>
            <div className="search__result--empty">
              {t('searchBar:no_category')} <b>{`"${filterValue}"`}</b>
            </div>

            <hr />
          </React.Fragment>
        )}

      {original.map((parent) => {
        const parentNameMatchesInput = noAccentCompare(parent.name, filterValue);

        const parentIdMatchesQuery = +router.query.category === parent.id;

        // Children whose name matches input value
        const childrenNamesMatchInput = parent.categorySub
          .map((child) => child.name)
          .filter((name) => noAccentCompare(name, filterValue));

        const childIdMatchesQuery = parent.categorySub.some(
          (child) => child.id === +router.query.category
        );

        return (
          <div
            hidden={!parentNameMatchesInput && !childrenNamesMatchInput.length}
            key={parent.id}
            className="mb-2">
            <Dropdown
              label={parent.name}
              show={!!filterValue || parentIdMatchesQuery || childIdMatchesQuery}>
              <div className="pl-3 mb-3">
                <div className="mb-1">
                  <Link href={getCategoryHref(parent.id)}>
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
                    <Link href={getCategoryHref(id)}>
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
