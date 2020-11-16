import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

type Props = {
  data: {
    id: string;
    name: string;
  }[];
};

const filterChars = [...'abcdefghijklmnopqrstuvwxyz#'.split('')];

export default function SearchScreen(props: Props): JSX.Element {
  const [searchChar, setSearchChar] = useState('#');

  const [data, setData] = useState(props.data);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!props.data) return;
    setData(props.data);
  }, [props.data]);

  const filterByChar = (searchChar: string) => {
    setSearchChar(searchChar);
    setData(
      props.data.filter(
        (item) => searchChar === '#' || item.name.toLowerCase().startsWith(searchChar)
      )
    );
  };

  useDebouncedEffect(
    () => {
      setData(
        props.data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    },
    150,
    [searchValue]
  );

  return (
    <div className="filter-search container mobile-content ">
      <div className="filter-search__search text-right mb-4">
        <input
          className="search "
          placeholder="Nhập tên hoạt chất"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button className="btn-search">
          <i className="fa fa-search" />
        </button>
      </div>

      <div className="filter my-4">
        {filterChars.map((char) => (
          <div
            key={char}
            className={clsx('alphabet mix', searchChar === char && 'active')}
            onClick={() => filterByChar(char)}
            aria-hidden="true">
            {char.toUpperCase()}
          </div>
        ))}
      </div>

      <div className="count_result">
        <em>Hiển thị {data.length} kết quả tìm kiếm cho </em>
        <b>{searchValue || ' Tất cả'}</b>
      </div>

      <div className="filter-search__list py-3">
        {data?.map((item) => (
          <Link key={item.id} href={`ingredients/${item.name}-${item.id}`}>
            <a className="filter-search__list-item mix all">{item.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
