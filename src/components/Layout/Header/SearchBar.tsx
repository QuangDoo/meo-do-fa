import { useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import slugify from '@sindresorhus/slugify';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import Select from 'src/components/Form/Select';
import {
  SEARCH_INGREDIENT,
  SearchIngredientData,
  SearchIngredientVars
} from 'src/graphql/search/searchIngredients';
import {
  SEARCH_MANUFACTURER,
  SearchManufacturerData,
  SearchManufacturerVars
} from 'src/graphql/search/searchManufacturers';
import {
  SEARCH_PRODUCT,
  SearchProductData,
  SearchProductVars
} from 'src/graphql/search/searchProducts';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

type SearchType = 'products' | 'manufacturers' | 'ingredients';

const SearchBar = () => {
  const { t } = useTranslation(['searchBar']);

  const router = useRouter();

  const [searchProducts, { data: productsData, loading: loadingProducts }] = useLazyQuery<
    SearchProductData,
    SearchProductVars
  >(SEARCH_PRODUCT);

  const [
    searchManufacturers,
    { data: manufacturersData, loading: loadingManufacturers }
  ] = useLazyQuery<SearchManufacturerData, SearchManufacturerVars>(SEARCH_MANUFACTURER);

  const [searchIngredients, { data: ingredientsData, loading: loadingIngredients }] = useLazyQuery<
    SearchIngredientData,
    SearchIngredientVars
  >(SEARCH_INGREDIENT);

  const [value, setValue] = useState('');

  const [previousValue, setPreviousValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [type, setType] = useState<SearchType>('products');

  const runSearch = (type: SearchType) => {
    const options = {
      variables: {
        page: 1,
        pageSize: 15,
        name: value
      }
    };

    switch (type) {
      case 'products':
        searchProducts(options);
        break;

      case 'manufacturers':
        searchManufacturers(options);
        break;

      case 'ingredients':
        searchIngredients(options);
        break;
    }
  };

  // Search with debounce
  useDebouncedEffect(
    () => {
      setPreviousValue(value);

      runSearch(type);
    },
    200,
    [value]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) return;

    router.push({
      pathname: '/products',
      query: {
        search: value
      }
    });
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setType(e.target.value);
    runSearch(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const loading = loadingProducts || loadingManufacturers || loadingIngredients;

  const showResultWindow =
    (loading || productsData || manufacturersData || ingredientsData) && previousValue && isFocused;

  const items = {
    products: productsData?.searchProduct,
    manufacturers: manufacturersData?.searchManufactory,
    ingredients: ingredientsData?.searchIngredients
  };

  const getItemHref = {
    products: (product) => `/products/${product.slug}`,
    manufacturers: (manufacturer) => `/products?manufacturer=${manufacturer.id}`,
    ingredients: (ingredient) => `/ingredients/${ingredient.id}/${slugify(ingredient.name)}`
  };

  const allHref = {
    products: `/products?search=${value}`,
    manufacturers: `/products?search=${value}`,
    ingredients: `/ingredients?search=${value}`
  };

  return (
    <div className="d-flex justify-content-sm-center justify-content-start flex-grow-1 mr-lg-5 ml-lg-3">
      <ClickAwayListener onClickAway={handleBlur}>
        <div className="search">
          <form onSubmit={handleSubmit} autoComplete="off" acceptCharset="UTF-8">
            <div className="input-group form__input-group">
              <input
                type="search"
                placeholder={t('searchBar:input')}
                aria-label="search"
                className="form-control form-control-sm search-input"
                value={value}
                onChange={handleValueChange}
                onFocus={handleFocus}
              />

              <Select value={type} onChange={handleSearchTypeChange} className="search-type-select">
                {['products', 'manufacturers', 'ingredients'].map((type) => (
                  <option key={type} value={type}>
                    {t(`searchBar:search_by_${type}`)}
                  </option>
                ))}
              </Select>

              <div className="input-group-prepend">
                <Button type="submit" variant="primary">
                  {t('searchBar:submit_search')}
                </Button>
              </div>
            </div>
          </form>

          <div className={clsx('elevated search__results', showResultWindow && 'show')}>
            {loading && (
              <div className="search__result--empty text-center">
                <CircularProgress size={60} />
              </div>
            )}

            {items[type] &&
              (items[type].length === 0 ? (
                <div className="search__result--empty">
                  {t(`searchBar:no_${type}`)} <b>{previousValue}</b>
                </div>
              ) : (
                <React.Fragment>
                  <button className="w-100 text-left border-bottom p-3" onClick={handleBlur}>
                    <Link href={allHref[type]}>
                      <a>
                        <em>{previousValue}</em> {t('searchBar:in')}{' '}
                        <b className="text-primary">{t(`searchBar:all_${type}`)}</b>
                      </a>
                    </Link>
                  </button>

                  {items[type].map((item) => (
                    <button
                      className="w-100 text-left border-bottom"
                      key={item.id}
                      onClick={handleBlur}>
                      <Link href={getItemHref[type](item)}>
                        <a className="search__result">{item.name}</a>
                      </Link>
                    </button>
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBar;
