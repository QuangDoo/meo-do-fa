import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { SEARCH_MANUFACTURERS_BY_NAME } from 'src/graphql/search/search.manufacturer.query';
import { SEARCH_PRODUCTS_BY_NAME } from 'src/graphql/search/search.products.query';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

const SearchBar = (): JSX.Element => {
  const [searchProducts, { data: pData, loading: pLoading }] = useLazyQuery(
    SEARCH_PRODUCTS_BY_NAME
  );

  const [searchManufacturers, { data: mData, loading: mLoading }] = useLazyQuery(
    SEARCH_MANUFACTURERS_BY_NAME
  );

  const [value, setValue] = useState('');

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

  return (
    <div className="d-flex justify-content-center flex-grow-1 mr-3">
      <div className="search">
        <form autoComplete="off" acceptCharset="UTF-8">
          <div className="input-group form__input-group">
            <i className="fas fa-search form__input-icon" />

            <input
              type="search"
              className="form-control form-control-sm search-input"
              placeholder="Nhập tên thuốc, hoạt chất cần tìm..."
              aria-label="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </form>

        <div className="elevated search__results">
          {pData?.products.length > 0 ? (
            <>
              <Link href={`/products?sort=best_match&search=${value}`}>
                <em>{value}</em> trong <b className="text-primary">tất cả sản phẩm</b>
              </Link>

              {pData.products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              ))}
            </>
          ) : (
            `Không có sản phẩm với từ khóa ${value}`
          )}

          <hr />

          {mData?.manufacturers.length > 0 ? (
            <>
              <Link href={`/manufacturers?sort=best_match&search=${value}`}>
                <em>{value}</em> trong <b className="text-primary">tất cả nhà sản xuất</b>
              </Link>

              {mData.manufacturers.map((manufacturer) => (
                <Link key={manufacturer.id} href={`/manufacturers/${manufacturer.id}`}>
                  {manufacturer.name}
                </Link>
              ))}
            </>
          ) : (
            `Không có nhà sản xuất với từ khóa ${value}`
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
