import React from 'react'
import Filter from './Filter'
import Sorter from './Sorter'

const drugGroupData = [
  { name: 'Tất cả sản phẩm', href: '#' },
  { name: 'Cơ Xương Khớp', href: '#' },
  { name: 'Da Liễu', href: '#' },
]

const producerData = [
  { name: 'Tất cả sản phẩm', href: '#' },
  { name: 'Domesco', href: '#' },
  { name: 'Vidipha', href: '#' },
]

const SideBar = () => {
  return (
    <aside className="text-capitalize w-100">
      <div className="mb-3">
        <header className="products__filters-header">
          <span className="text-muted icomoon icon-tune mr-3" />
          Bộ lọc tìm kiếm
        </header>
      </div>
      <hr className="hr mb-3" />
      <Sorter />
      <hr className="hr mb-3" />
      <Filter header="Nhóm thuốc" data={drugGroupData} />
      <hr className="hr mb-3" />
      <Filter header="Nhà sản xuất" data={producerData} />
    </aside>
  )
}

export default SideBar
