import Link from 'next/link';
import React from 'react';

type category = {
  href: string;
  title: string;
};
type Props = {
  categories: category[];
};
function Sidebar(props: Props): JSX.Element {
  return (
    <>
      <h3 className="news__title">{`Danh mục`}</h3>
      <div className="news__divider"></div>
      <ul className="list-unstyled">
        {props?.categories?.map((category, index) => (
          <li key={index} className="pb-2">
            <Link href={category.href}>
              <a className="faq-link">{category.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sidebar;
