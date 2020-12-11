import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDebouncedEffect } from 'src/hooks/useDebouncedEffect';

type Props = {
  data: {
    id: string;
    name: string;
  }[];
  getItemHref: (id: string, name: string) => string;
};

const filterChars = 'abcdefghijklmnopqrstuvwxyz#'.split('');

export default function SearchScreen(props: Props) {
  const [searchChar, setSearchChar] = useState('#');

  const [data, setData] = useState(props.data);

  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation(['searchBar']);

  useEffect(() => {
    if (!props.data) return;
    setData(props.data);
  }, [props.data]);

  const filterByChar = (searchChar: string) => {
    setSearchChar(searchChar);
    setData(
      props.data.filter(
        (item) =>
          (searchChar === '#' || item.name.toLowerCase().startsWith(searchChar)) &&
          item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  useDebouncedEffect(
    () =>
      setData(
        props.data.filter(
          (item) =>
            (searchChar === '#' || item.name.toLowerCase().startsWith(searchChar)) &&
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    150,
    [searchValue]
  );

  const router = useRouter();

  console.log('current path:', router.pathname);

  return (
    <div className="filter-search container mobile-content py-3 py-sm-5">
      <div className="filter-search__search text-right mb-4">
        <input
          className="search "
          placeholder={t(`searchBar:enter_name_${router.pathname.substring(1)}`)}
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
        <em>
          {t('searchBar:show')} {data.length} {t('searchBar:result')}{' '}
        </em>
        <b>{searchValue || t('searchBar:all')}</b>
      </div>

      <div className="filter-search__list py-3">
        {data?.map((item) => (
          <Link key={item.id} href={props.getItemHref(item.id.toString(), item.name)}>
            <a className="filter-search__list-item mix all">{item.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
