import Link from 'next/link';
import React from 'react';

type ListType = {
  name: string;
};

function ListName(props: ListType) {
  return (
    <Link href={`/ingredients/${props.name}`}>
      <a className="filter-search__list-item mix all filter-z" data-filter="filter-z">
        {props.name}
      </a>
    </Link>
  );
}

export default ListName;
