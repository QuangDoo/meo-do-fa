import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  data: {
    id: number;
    name: string;
    short_name?: string;
  }[];
  getItemHref: (id: number, name: string) => string;
  getInfoHref?: (id: number) => string;
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
    <div className="filter-search container mobile-content py-sm-5">
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
        <em>{t('searchBar:showing_results_for', { count: data.length }) + ' '}</em>
        <b>{searchLabel}</b>
      </div>

      <div className="filter-search__list py-3">
        {data?.map((item) => (
          <div key={item.id} className="d-flex align-items--center">
            <Link href={props.getItemHref(item.id, item.name)}>
              <a title={item.name} className="filter-search__list-item mix all">
                {item.short_name || item.name}
              </a>
            </Link>
            {props.getInfoHref && (
              <Link href={props.getInfoHref(item.id)}>
                <a
                  title={t('searchBar:show_manufacturer_detail')}
                  className="filter-search__list-info">
                  <i className="fas fa-info-circle"></i>
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
