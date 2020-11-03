import React from 'react';

type Props = {
  totalProducts: number;
  page: number;
  pageSize: number;
};

const Header = (props: Props): JSX.Element => {
  const { totalProducts, page, pageSize } = props;

  const start = (page - 1) * pageSize + 1;

  const end = Math.min(start + pageSize - 1, totalProducts);

  return (
    <div className="px-2 px-sm-0">
      <div className="mb-2">
        <h1 className="products__header text-capitalize mb-3">Tất cả sản phẩm</h1>

        {totalProducts > 0 ? (
          <>
            Hiển thị{' '}
            <b>
              {start}&nbsp;-&nbsp;{end}
            </b>{' '}
            trên tổng số <b>{totalProducts}</b> sản Phẩm
          </>
        ) : (
          'Không có Sản Phẩm'
        )}
      </div>
    </div>
  );
};

export default Header;
