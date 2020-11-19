import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Tag = {
  name: React.ReactNode;
  tab?: string;
};

const tags: Tag[] = [
  { name: 'Tất cả' },
  // {
  //   name: (
  //     <>
  //       <i className="fas fa-bolt text-secondary mr-1" />
  //       Flash Sale
  //       <i className="fas fa-bolt text-secondary ml-1" />
  //     </>
  //   ),
  //   tab: 'flash_sale'
  // },
  { name: 'SP Mới', tab: 'new_arrival' },
  { name: 'Giảm giá', tab: 'decreasing_price' },
  { name: 'Hóa đơn nhanh', tab: 'invoice_exportable' },
  { name: 'Tăng giá', tab: 'increasing_price' },
  { name: 'Cận date', tab: 'close_date' },
  { name: 'Chỉ có tại medofa', tab: 'only_medofa' }
  // { name: 'Người Việt dùng hàng Việt', tab: 'use_vietnamese' }
];

const FilterTags = () => {
  const router = useRouter();

  return (
    <>
      {tags.map(({ tab, name }) => (
        <Link
          key={tab}
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              page: 1,
              tab
            }
          }}>
          <a className={clsx('btn products__filter-btn', router.query.tab === tab && 'active')}>
            {name}
          </a>
        </Link>
      ))}
    </>
  );
};

export default FilterTags;
