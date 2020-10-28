import { useRouter } from 'next/router'
import React from 'react'

const Sorter = () => {
  const router = useRouter()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: event.currentTarget.value,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <form className="form-inline justify-content-between">
      <div className="products__filter-header mb-2">
        <label className="mr-2" htmlFor="sort">
          Sắp xếp
        </label>
      </div>

      <select id="sort" className="custom-select" onBlur={onChange}>
        <option value="new_arrival">Sản phẩm mới</option>
        <option value="best_sellers">Bán chạy nhất</option>
        <option value="best_match">Phù hợp nhất</option>
        <option value="highest_price">Giá: Cao đến Thấp</option>
        <option value="lowest_price">Giá: Thấp đến Cao</option>
        <option value="alphabet_az">Tên: A-Z</option>
        <option value="alphabet_za">Tên: Z-A</option>
      </select>
    </form>
  )
}

export default Sorter
