import Link from 'next/link';
import React from 'react';

type question = {
  id: number;
  name: string;
  content: string;
  link: string;
  slug: string;
};
type Props = {
  questionList: question[];
};
function Sidebar(props: Props) {
  return (
    <>
      <h3 className="news__title">{`Danh mục`}</h3>
      <div className="news__divider"></div>
      <ul className="list-unstyled">
        {props?.questionList?.map((question, index) => (
          <li key={index} className="pb-2">
            <Link href={`/help/${question.id}`}>
              <a className="faq-link">{question.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Sidebar;
