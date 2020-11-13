import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import FilterSearch from './FilterSearch';
import InputSearch from './InputSearch';
import ListName from './ListName';

type DataList = {
  id: string;
  name: string;
};
type Characters = {
  character: string;
  dataValue: string;
};
type PropsType = {
  dataList: DataList[];
  characters: Characters[];
};

export default function SearchScreen(props: PropsType): JSX.Element {
  const [cloneData, setCloneData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (!props.dataList) return;
    setCloneData(props.dataList);
  }, [props.dataList]);

  const filterByCharacter = (character) => {
    const newsManufactures = props.dataList.filter((item) => {
      if (character.character === '#') {
        return item.name;
      } else {
        return item.name.toLocaleLowerCase().substr(0, 1).includes(character.dataValue);
      }
    });
    setCloneData(newsManufactures);
  };
  const handleSearch = (key) => {
    console.log('key', key);

    const nameSearch = [...props.dataList];
    const newSearch = nameSearch.filter((product) => {
      console.log('product.name', product.name);
      return product.name.toLowerCase().includes(key);
    });
    console.log('newProducts', newSearch);
    setCloneData(newSearch);
  };

  return (
    <div className="filter-search container mobile-content " data-controller="filter-search">
      <InputSearch
        placeholder={router.pathname === 'ingredients' ? 'Nhập tên hoạt chất cần tìm' : ' Nhập tên nhà sản xuất cần tìm'}
        keySearch={handleSearch}
      />
      <div className="filter my-4">
        {props?.characters?.map((item, index) => {
          return <FilterSearch key={index} {...item} filter={() => filterByCharacter(item)} />;
        })}
      </div>
      <div className="count_result">
        <em>Hiển thị {cloneData?.length} kết quả tìm kiếm cho</em>
        <b>Tất cả</b>
      </div>
      <div
        className="filter-search__list py-3"
        data-target="filter-search.results"
        id="MixItUpC3DA20">
        {cloneData?.map((item, index) => {
          return <ListName key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
