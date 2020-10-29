import React, { useState } from 'react'
import FilterSearch from './FilterSearch'
import InputSearch from './InputSearch'
import ListName from './ListName'

type DataList = {
  name: string
}
type Characters = {
  character: string
  dataValue: string
}
type PropsType = {
  dataList: DataList[]
  characters: Characters[]
}

export default function SearchScreen(props: PropsType) {
  const [cloneData, setCloneData] = useState(props.dataList)

  const filterByCharacter = (character) => {
    const newsManufactures = props.dataList.filter((item) =>
      item.name.toLocaleLowerCase().substr(0, 1).includes(character.dataValue)
    )
    setCloneData(newsManufactures)
  }
  return (
    <div className="filter-search container mobile-content " data-controller="filter-search">
      {/* <div className="filter-search__search text-right mb-4"> */}
      <InputSearch placeholder="Nhập tên hoạt chất" />

      <div className="filter my-4">
        {props?.characters?.map((item, index) => {
          return <FilterSearch key={index} {...item} filter={() => filterByCharacter(item)} />
        })}
      </div>
      {/* </div> */}
      <div className="count_result">
        <em>Hiển thị {cloneData?.length} kết quả tìm kiếm cho</em>
        <b>Tất cả</b>
      </div>
      <div
        className="filter-search__list py-3"
        data-target="filter-search.results"
        id="MixItUpC3DA20"
      >
        {cloneData?.map((item, index) => {
          return <ListName key={index} {...item} />
        })}
      </div>
    </div>
  )
}
