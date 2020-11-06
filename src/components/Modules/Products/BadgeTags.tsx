import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const FlashSaleContent = (
  <>
    <i className="fas fa-bolt text-secondary mr-1" />
    Flash Sale
    <i className="fas fa-bolt text-secondary ml-1" />
  </>
);

type BadgeTagType = {
  name: React.ReactNode;
  tab?: string;
};

const badgeTags: BadgeTagType[] = [
  { name: 'Tất cả' },
  { name: FlashSaleContent, tab: 'flash_sale' },
  { name: 'SP Mới', tab: 'new_arrival' },
  { name: 'Giảm giá', tab: 'decreasing_price' },
  { name: 'Hóa đơn nhanh', tab: 'invoice_exportable' },
  { name: 'Tăng giá', tab: 'increasing_price' },
  { name: 'Cận date', tab: 'close_date' },
  { name: 'Chỉ có tại thuocsi', tab: 'only_thuocsi' },
  { name: 'Người Việt dùng hàng Việt', tab: 'use_vietnamese' }
];

const FilterTags = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className="d-none d-sm-block">
      <div className="d-flex justify-content-between flex-wrap align-items-end mb-4">
        <div className="products__filter-btns">
          {badgeTags.map(({ tab, name }, index) => (
            <Link
              key={index}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  page: 1,
                  tab: tab
                }
              }}>
              <a className={clsx('btn products__filter-btn', router.query.tab === tab && 'active')}>
                {name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTags;
