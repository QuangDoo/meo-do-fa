import debounce from 'lodash.debounce';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

const SearchBar = (): JSX.Element => {
  const [productResults, setProductResults] = useState([]);

  const [manufacturerResults, setManufacturerResults] = useState([]);

  const [value, setValue] = useState('');

  const loadResults = () => {
    // Get search results here
  };

  const debounceLoadResults = useMemo(() => debounce(loadResults, 200), []);

  const handleChange = () => {
    setValue(value);
    debounceLoadResults();
  };

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
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="elevated search__results">
          {productResults.length > 0 ? (
            <>
              <Link href={`/products?sort=best_match&search=${value}`}>
                <em>{value}</em> trong <b className="text-primary">tất cả sản phẩm</b>
              </Link>

              {productResults.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              ))}
            </>
          ) : (
            `Không có sản phẩm với từ khóa ${value}`
          )}

          <hr />

          {manufacturerResults.length > 0 ? (
            <>
              <Link href={`/manufacturers?sort=best_match&search=${value}`}>
                <em>{value}</em> trong <b className="text-primary">tất cả nhà sản xuất</b>
              </Link>

              {manufacturerResults.map((manufacturer) => (
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
