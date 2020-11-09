import { useLazyQuery } from '@apollo/react-hooks';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SEARCH_MANUFACTURERS_BY_NAME } from 'src/graphql/search/search.manufacturer.query';
import { SEARCH_PRODUCTS_BY_NAME } from 'src/graphql/search/search.products.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

const SearchBar = (): JSX.Element => {
  const router = useRouter();

  const [searchProducts, { data: pData, loading: pLoading }] = useLazyQuery(
    SEARCH_PRODUCTS_BY_NAME
  );

  const [searchManufacturers, { data: mData, loading: mLoading }] = useLazyQuery(
    SEARCH_MANUFACTURERS_BY_NAME
  );

  const [value, setValue] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  // Search with debounce
  useDebouncedEffect(
    () => {
      searchProducts({
        variables: {
          page: 1,
          pageSize: 15,
          name: value
        }
      });
    },
    200,
    [value]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    router.push({
      pathname: '/products',
      query: {
        sort: 'best_match',
        search: value
      }
    });

    event.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center flex-grow-1 mr-3">
      <div className="search">
        <form onSubmit={handleSubmit} autoComplete="off" acceptCharset="UTF-8">
          <div className="input-group form__input-group">
            <i className="fas fa-search form__input-icon" />

            <input
              type="search"
              className="form-control form-control-sm search-input"
              placeholder="Nhập tên thuốc, hoạt chất cần tìm..."
              aria-label="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </form>

        <div
          className={clsx(
            'elevated search__results',
            isFocused && value && (pData || mData) && 'show'
          )}>
          {pData?.products.length > 0 ? (
            <>
              <Link href={`/products?sort=best_match&search=${value}`}>
                <a className="search__result">
                  <em>{value}</em> trong <b className="text-primary">tất cả sản phẩm</b>
                </a>
              </Link>

              {pData.products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <a className="search__result">{product.name}</a>
                </Link>
              ))}
            </>
          ) : (
            <div className="search__result--empty">Không có sản phẩm với từ khóa {value}</div>
          )}

          <hr />

          {mData?.manufacturers.length > 0 ? (
            <>
              <Link href={`/manufacturers?sort=best_match&search=${value}`}>
                <a className="search__result pt-0">
                  <em>{value}</em> trong <b className="text-primary">tất cả nhà sản xuất</b>
                </a>
              </Link>

              {mData.manufacturers.map((manufacturer) => (
                <Link key={manufacturer.id} href={`/manufacturers/${manufacturer.id}`}>
                  <a className="search__result">{manufacturer.name}</a>
                </Link>
              ))}
            </>
          ) : (
            <div className="search__result--empty">Không có nhà sản xuất với từ khóa {value}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
