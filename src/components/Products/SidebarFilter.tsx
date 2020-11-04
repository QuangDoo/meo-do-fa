import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Dropdown from '../Form/Dropdown';
import Select from '../Form/Select';

const categories = [
  { name: 'Cơ Xương Khớp', id: 'co-xuong-khop' },
  { name: 'Da Liễu', id: 'da-lieu' }
];

const suppliers = [
  { name: 'Domesco', id: 'domesco' },
  { name: 'Vidipha', id: 'vidipha' }
];

const SideBar = (): JSX.Element => {
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

      <form className="form-inline justify-content-between">
        <div className="products__filter-header mb-2">Sắp xếp</div>

        <Select onBlur={handleSortChange}>
          <option value="new_arrival">Sản phẩm mới</option>
          <option value="best_sellers">Bán chạy nhất</option>
          <option value="best_match">Phù hợp nhất</option>
          <option value="highest_price">Giá: Cao đến Thấp</option>
          <option value="lowest_price">Giá: Thấp đến Cao</option>
          <option value="alphabet_az">Tên: A-Z</option>
          <option value="alphabet_za">Tên: Z-A</option>
        </Select>
      </form>

      <hr className="hr my-3" />

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

export default SideBar;
