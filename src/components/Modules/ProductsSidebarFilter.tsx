import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Category } from 'src/types/Category';
import { Manufacturer } from 'src/types/Manufacturer';

import Dropdown from '../Form/Dropdown';
import Select from '../Form/Select';

type Props = {
  categories: Category[];
  manufacturer: Manufacturer[];
};

type SortOption = {
  name: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { name: 'Sản phẩm mới', value: '00' },
  { name: 'Bán chạy nhất', value: '01' },
  { name: 'Phù hợp nhất', value: '02' },
  { name: 'Giá: Cao đến Thấp', value: '04' },
  { name: 'Giá: Thấp đến Cao', value: '05' },
  { name: 'Tên: A-Z', value: '07' },
  { name: 'Tên: Z-A', value: '06' }
];

const ProductsSidebarFilter = (props: Props) => {
  const { categories, manufacturer } = props;

  const router = useRouter();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: event.target.value
        }
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <aside className="text-capitalize w-100">
      <header className="products__filters-header">
        <span className="text-muted icomoon icon-tune mr-3" />
        Bộ lọc tìm kiếm
      </header>

      <hr className="hr my-3" />

      {/* Sort */}
      <form className="form-inline justify-content-between">
        <div className="products__filter-header mb-2">Sắp xếp</div>

        <Select onBlur={handleSortChange}>
          {sortOptions.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </form>

      <hr className="hr my-3" />

      {/* Filter category */}
      <Dropdown label="Nhóm thuốc">
        <div className="mb-2">
          <Link href="/products">
            <a className={clsx('products__filter-category', !router.query.category && 'active')}>
              Tất cả
            </a>
          </Link>
        </div>

        {categories.map(({ name, id }) => (
          <div key={id} className="mb-2">
            <Link href={`/products?category=${id}`}>
              <a
                className={clsx(
                  'products__filter-category',
                  router.query.category === id && 'active'
                )}>
                {name}
              </a>
            </Link>
          </div>
        ))}
      </Dropdown>

      <hr className="hr my-3" />

      {/* Filter supplier */}
      <Dropdown label="Nhà sản xuất">
        <div className="mb-2">
          <Link href="/products">
            <a
              className={clsx('products__filter-category', !router.query.manufacturer && 'active')}>
              Tất cả
            </a>
          </Link>
        </div>

        {manufacturer.map(({ name, id }) => (
          <div key={id} className="mb-2">
            <Link href={`/products?manufacturer=${id}`}>
              <a
                className={clsx(
                  'products__filter-category',
                  router.query.manufacturer === id && 'active'
                )}>
                {name}
              </a>
            </Link>
          </div>
        ))}

        <div>
          <Link href="/manufacturers">
            <a className="products__filter-category">Xem thêm</a>
          </Link>
        </div>
      </Dropdown>
    </aside>
  );
};

export default ProductsSidebarFilter;
