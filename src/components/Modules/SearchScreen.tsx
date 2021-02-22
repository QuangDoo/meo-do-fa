import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  data: {
    id: string;
    name: string;
    short_name?: string;
  }[];
  getItemHref: (id: string, name: string) => string;
};

const filterChars = 'abcdefghijklmnopqrstuvwxyz#'.split('');

export default function SearchScreen(props: Props) {
  const [searchChar, setSearchChar] = useState('#');

  const [data, setData] = useState(props.data);

  const { t } = useTranslation(['searchBar']);

  const { register, handleSubmit, setValue } = useForm();

  const [searchLabel, setSearchLabel] = useState<string>(t('searchBar:all'));

  useEffect(() => {
    if (!props.data) return;
    setData(props.data);
  }, [props.data]);

  const filterByChar = (searchChar: string) => {
    setSearchChar(searchChar);

    setValue('search', '');

    setSearchLabel(t('searchBar:all'));

    setData(
      searchChar === '#'
        ? props.data
        : props.data.filter((item) => item.name?.toLowerCase().startsWith(searchChar))
    );
  };

  const onSubmit = handleSubmit((data) => {
    if (data.search === '') {
      setSearchChar('#');
      setSearchLabel(t('searchBar:all'));
      setData(props.data);

      return;
    }

    setSearchChar('');
    setSearchLabel(data.search);
    setData(
      props.data.filter((item) => item.name.toLowerCase().includes(data.search.toLowerCase()))
    );
  });

  const router = useRouter();

  return (
    <div className="filter-search container mobile-content py-3 py-sm-5">
      <div className="filter-search__search text-right mb-4">
        <form onSubmit={onSubmit}>
          <input
            ref={register}
            className="search"
            name="search"
            placeholder={t(`searchBar:enter_name_${router.pathname.substring(1)}`)}
            onBlur={onSubmit}
          />

          <button type="submit" className="btn-search">
            <i className="fa fa-search" />
          </button>
        </form>
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
        <b>{searchLabel}</b>
      </div>

      <div className="filter-search__list py-3">
        {data?.map((item) => (
          <Link key={item.id} href={props.getItemHref(item.id.toString(), item.name)}>
            <a title={item.name} className="filter-search__list-item mix all">
              {item.short_name || item.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
