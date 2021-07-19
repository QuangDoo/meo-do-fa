import { useLazyQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
import {
  SEARCH_SUPPLIER,
  SearchSupplierData,
  SearchSupplierVars
} from 'src/graphql/search/searchSupplier';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

type SearchType = 'products' | 'manufacturers' | 'ingredients' | 'suppliers';

const SearchBar = () => {
  const { t } = useTranslation(['searchBar']);

  const router = useRouter();

  const [searchProducts, { data: productsData, loading: loadingProducts }] =
    useLazyQuery<SearchProductData, SearchProductVars>(SEARCH_PRODUCT);

  const [searchManufacturers, { data: manufacturersData, loading: loadingManufacturers }] =
    useLazyQuery<SearchManufacturerData, SearchManufacturerVars>(SEARCH_MANUFACTURER);

  const [searchIngredients, { data: ingredientsData, loading: loadingIngredients }] =
    useLazyQuery<SearchIngredientData, SearchIngredientVars>(SEARCH_INGREDIENT);

  const [searchSuppliers, { data: supplierData, loading: loadingSuppliers }] =
    useLazyQuery<SearchSupplierData, SearchSupplierVars>(SEARCH_SUPPLIER);

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
      case 'suppliers':
        searchSuppliers(options);
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

    setIsFocused(false);

    if (!value) return;
    switch (type) {
      case 'products':
        return router.push({
          pathname: '/products',
          query: {
            search: value
          }
        });

      case 'manufacturers':
        // eslint-disable-next-line no-case-declarations
        const manufacturers = manufacturersData?.searchManufactory;
        if (manufacturers?.length) {
          return router.push(getItemHref['manufacturers'](manufacturers[0]));
        }
        return;

      case 'ingredients':
        // eslint-disable-next-line no-case-declarations
        const searchIngredients = ingredientsData?.searchIngredients;
        if (searchIngredients?.length) {
          return router.push(getItemHref['ingredients'](searchIngredients[0]));
        }
        return;
      case 'suppliers':
        // eslint-disable-next-line no-case-declarations
        const searchSuppliers = supplierData?.getSuppliers;
        if (searchSuppliers?.length) {
          return router.push(getItemHref['suppliers'](searchSuppliers[0]));
        }
        return;
    }
  };

  const handleValueChange = (e) => {
    setIsFocused(true);
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

  const loading = loadingProducts || loadingManufacturers || loadingIngredients || loadingSuppliers;

  const showResultWindow =
    (loading || productsData || manufacturersData || ingredientsData || supplierData) &&
    previousValue &&
    isFocused;

  const items = {
    products: productsData?.searchProduct,
    manufacturers: manufacturersData?.searchManufactory,
    ingredients: ingredientsData?.searchIngredients,
    suppliers: supplierData?.getSuppliers
  };

  const getItemHref = {
    products: (product) => `/products/${product.slug}`,
    manufacturers: (manufacturer) => `/products?manufacturer=${manufacturer.id}`,
    ingredients: (ingredient) => `/products?ingredient=${ingredient.id}`,
    suppliers: (supplier) => `/products?supplier=${supplier.id}`
  };

  const allHref = {
    products: `/products?search=${value}`,
    manufacturers: `/products?search=${value}`,
    ingredients: `/ingredients?search=${value}`,
    suppliers: `/product?search=${value}`
  };

  return (
    <div className="d-flex justify-content-sm-center justify-content-start flex-grow-1 mr-lg-5 ml-lg-3">
      <ClickAwayListener onClickAway={handleBlur}>
        <div className="search">
          <form onSubmit={handleSubmit} autoComplete="off" acceptCharset="UTF-8">
            <div className="input-group form__input-group btn-border-rad">
              <input
                type="search"
                placeholder={t(`searchBar:placeholder_all`)}
                aria-label="search"
                className="form-control form-control-sm search-input hide-focus keep-border"
                value={value}
                onChange={handleValueChange}
                onFocus={handleFocus}
              />

              {/* <Select
                value={type}
                onChange={handleSearchTypeChange}
                className="search-type-select hide-focus search-sm">
                {['products', 'manufacturers', 'ingredients', 'suppliers'].map((type) => (
                  <option key={type} value={type}>
                    {t(`searchBar:search_by_${type}`)}
                  </option>
                ))}
              </Select> */}

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
