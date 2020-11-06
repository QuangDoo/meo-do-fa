import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type ListType = {
  name: string;
};

function ListName(props: ListType) {
  const router = useRouter();
  console.log('router');
  return (
    <Link href={`${router.pathname}/${props.name}`}>
      <a className="filter-search__list-item mix all filter-z" data-filter="filter-z">
        {props.name}
      </a>
    </Link>
  );
}

export default ListName;
