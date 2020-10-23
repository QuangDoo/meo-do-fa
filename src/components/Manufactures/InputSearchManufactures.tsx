import React from 'react'

function InputSearchManufactures() {
    return (
        <div className="filter-search__search text-right mb-4">
            <input
                type="search"
                name="search"
                id="search"
                className="search "
                placeholder="Nhập tên nhà sản xuất cần tìm"
                data-action="keyup->filter-search#doSearch"
                data-target="filter-search.search"
                data-value
            />
            <button className="btn-search">
                <i className="fa fa-search" />
            </button>
        </div>
    )
}
export default InputSearchManufactures