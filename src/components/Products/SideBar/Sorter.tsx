import { useRouter } from 'next/router'
import React from 'react'
import useUpdateQuery from '../../../hooks/useUpdateQuery'

const Sorter = () => {
  const router = useRouter()

  const updateQuery = useUpdateQuery()

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuery({
      ...router.query,
      sort: event.currentTarget.value,
    })
  }

  return (
    <div className="mb-3">
      <form
        action="https://thuocsi.vn/products"
        className="form-inline justify-content-between"
        method="get"
      >
        <input type="hidden" name="current_tab" id="current_tab" defaultValue="new_arrival" />
        <div className="products__filter-header mb-2">
          <label className="mr-2" htmlFor="sort">
            Sắp xếp
          </label>
        </div>
        <select name="sort" className="custom-select" style={{ width: '100%' }} onChange={onChange}>
          <option value="new_arrival">Sản phẩm mới</option>
          <option value="bestsellers">Bán chạy nhất</option>
          <option value="best_match">Phù hợp nhất</option>
          <option value="highestprice">Giá: Cao đến Thấp</option>
          <option value="lowestprice">Giá: Thấp đến Cao</option>
          <option value="alphabet_az">Tên: A-Z</option>
          <option value="alphabet_za">Tên: Z-A</option>
        </select>
      </form>
    </div>
  )
}

export default Sorter
