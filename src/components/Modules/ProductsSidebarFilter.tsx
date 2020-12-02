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
  manufacturers: Manufacturer[];
};

const ProductsSidebarFilter = (props: Props) => {
  const { categories, manufacturers } = props;

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

      <div>
        <div className="products__filter-header mb-2">Sắp xếp</div>

        <Select onChange={handleSortChange}>
          {/* <option value="01">Sản phẩm mới</option> */}
          {/* <option value="02">Bán chạy nhất</option> */}
          {/* <option value="03">Phù hợp nhất</option> */}
          <option value="04">Giá: Cao - Thấp</option>
          <option value="05">Giá: Thấp - Cao</option>
          <option value="06">Tên: Z - A</option>
          <option value="07" selected>
            Tên: A - Z
          </option>
        </Select>
      </div>

      <hr className="hr my-3" />

      <Dropdown label="Nhóm thuốc">
        <div className="mb-2">
          <Link href="/products">
            <a className={clsx('products__filter-category', !router.query.category && 'active')}>
              Tất cả
            </a>
          </Link>
        </div>

        {categories
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, id }) => (
            <div key={id} className="mb-2">
              <Link href={`/products?category=${id}`}>
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
      </Dropdown>

      <hr className="hr my-3" />

      <Dropdown label="Nhà sản xuất">
        <div className="mb-2">
          <Link href="/products">
            <a
              className={clsx('products__filter-category', !router.query.manufacturer && 'active')}>
              Tất cả
            </a>
          </Link>
        </div>

        {manufacturers
          .slice()
          .sort((a, b) => a.short_name.localeCompare(b.short_name))
          .map(({ short_name, id }) => (
            <div key={id} className="mb-2">
              <Link href={`/products?manufacturer=${id}`}>
                <a
                  className={clsx(
                    'products__filter-category',
                    router.query.manufacturer === id.toString() && 'active'
                  )}>
                  {short_name}
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
