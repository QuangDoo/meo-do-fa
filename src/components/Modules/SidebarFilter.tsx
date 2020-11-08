import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Category } from 'src/types/Category';
import { Supplier } from 'src/types/Supplier';

import Dropdown from '../Form/Dropdown';
import Select from '../Form/Select';

type Props = {
  categories: Category[];
  suppliers: Supplier[];
};

type SortOption = {
  name: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { name: 'Sản phẩm mới', value: 'new_arrival' },
  { name: 'Bán chạy nhất', value: 'best_sellers' },
  { name: 'Phù hợp nhất', value: 'best_match' },
  { name: 'Giá: Cao đến Thấp', value: 'highest_price' },
  { name: 'Giá: Thấp đến Cao', value: 'lowest_price' },
  { name: 'Tên: A-Z', value: 'alphabet_az' },
  { name: 'Tên: Z-A', value: 'alphabet_za' }
];

const SidebarFilter = (props: Props) => {
  const { categories, suppliers } = props;

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
              <a className={clsx('products__filter-category')}>{name}</a>
            </Link>
          </div>
        ))}
      </Dropdown>

      <hr className="hr my-3" />

      {/* Filter supplier */}
      <Dropdown label="Nhà sản xuất">
        <div className="mb-2">
          <Link href="/products">
            <a className={clsx('products__filter-category', !router.query.supplier && 'active')}>
              Tất cả
            </a>
          </Link>
        </div>

        {suppliers.map(({ name, id }) => (
          <div key={id} className="mb-2">
            <Link href={`/products?supplier=${id}`}>
              <a
                className={clsx(
                  'products__filter-category',
                  router.query.supplier === id && 'active'
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

export default SidebarFilter;
