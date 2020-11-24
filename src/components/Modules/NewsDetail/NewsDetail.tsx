import Link from 'next/link';
import React from 'react';



type Props = {
  categories?: any;
  title?: string;
  description?: string;
  createAt?: string;
  author?: string;
  imgUrl?: string
};
function NewsDetail(props: Props) {
  function createMarkup() {
    return { __html: props.description };
  }
  return (
    <>
      <div className="news-detail">
        <div className="news-header">
          <div className="news-header__category">
            {props.categories.map((category, index) => (
              <span key={index}>
                <Link href={category.href}>
                  <a className="news-header__link text-small">{category.title}</a>
                </Link>
              </span>
            ))}
          </div>
          <h1 className="news-header__title">{props.title}</h1>
          <div className="post-item__content-divider"></div>
          <div className="news-header__poston text-small">
            {`post on `}
            <Link href="/news">
              <a href="/news" className="news-header__link text-small">
                SEPTEMBER 14,2020
              </a>
            </Link>
            {`,by `}
            <Link href="/news">
              <a href="/news" className="news-header__link text-small">
                {props.author}
              </a>
            </Link>
          </div>
        </div>
        <div className="post-item__img">
          <img className="post-item__img-item" alt={props.title} src={props.imgUrl}></img>
        </div>
        <div className="news-detail__content">
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
    </>
  );
}

export default NewsDetail;
