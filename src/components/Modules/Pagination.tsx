import clsx from 'clsx';
import React from 'react';

// Tất cả props dưới đây là cần thiết để sử dụng Pagination
type PaginationProps = {
  // Tổng số trang (có thể tính bằng cách chia tổng số sản phẩm cho pageSize tự định nghĩa)
  count: number;

  // Page hiện tại (tự control ở component phía trên)
  page: number;

  // Số nút chuyển page luôn hiển thị kế nút page hiện tại, default = 4
  // Ví dụ siblingCount = 4 và page hiện tại đang là 8
  //   => 1 ... 4 5 6 7 (8) 9 10 11 12 ... 50
  siblingCount?: number;

  // Hàm onChange này sẽ chạy khi click vào một nút chuyển page
  // Nút chuyển page sẽ truyền số trang của nó vào hàm onChange này
  // Ví dụ: <Pagination onChange={(page) => console.log(page)} ... />
  onChange: (page: number) => void;
};

type PageButtonProps = {
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const PageButton = (props: PageButtonProps) => (
  <button className={clsx('page', props.active && 'current')} onClick={props.onClick}>
    {props.children}
  </button>
);

const Pagination = (props: PaginationProps) => {
  const { page, count, siblingCount = 4, onChange } = props;

  const maxPagesBeforeShowingGap = siblingCount + 2;

  // Hide before gap
  const beforeGapHidden = page - 1 <= maxPagesBeforeShowingGap;

  // Hide after gap
  const afterGapHidden = count - page <= maxPagesBeforeShowingGap;

  // Siblings before current page
  const siblingsBefore = [];

  // Siblings after current page
  const siblingsAfter = [];

  // Populate siblings before current page
  for (let i = page - 1; i > 1; i--) {
    siblingsBefore.unshift(
      <PageButton key={i} active={i === page} onClick={() => props.onChange(i)}>
        {i}
      </PageButton>
    );

    if (!beforeGapHidden && siblingsBefore.length === siblingCount) break;
  }

  // Populate siblings after current page
  for (let i = page + 1; i < count; i++) {
    siblingsAfter.push(
      <PageButton key={i} active={i === page} onClick={() => props.onChange(i)}>
        {i}
      </PageButton>
    );

    if (!afterGapHidden && siblingsAfter.length === siblingCount) break;
  }

  return (
    count > 1 && (
      <div className="d-flex justify-content-center mb-3">
        <nav aria-label="pager" className="pagy-nav pagination" role="navigation">
          {/* Previous page button */}
          <button hidden={page === 1} className="page" onClick={() => onChange(page - 1)}>
            <i className="fas fa-arrow-left" />
          </button>

          {/* First page always shown */}
          <button className={clsx('page', page === 1 && 'current')} onClick={() => onChange(1)}>
            1
          </button>

          {/* Gap */}
          <span hidden={beforeGapHidden} className="page gap">
            …
          </span>

          {/* Sibling pages before current page */}
          {siblingsBefore}

          {/* Current page if not 1 or last */}
          {page > 1 && page < count && <PageButton active>{page}</PageButton>}

          {/* Sibling pages after current page */}
          {siblingsAfter}

          {/* Gap */}
          <span hidden={afterGapHidden} className="page gap">
            …
          </span>

          {/* Last page always shown */}
          <button
            className={clsx('page', page === count && 'current')}
            onClick={() => onChange(count)}>
            {count}
          </button>

          {/* Next page button */}
          <button hidden={page === count} className="page" onClick={() => onChange(page + 1)}>
            <i className="fas fa-arrow-right" />
          </button>
        </nav>
      </div>
    )
  );
};

export default Pagination;
