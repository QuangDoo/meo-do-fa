import Link from 'next/link';
import React from 'react';

type Props = {
  id?: string;
  title?: string;
  imgUrl?: string;
  description?: string;
  createAt?: string;
};

export default function CardView(props: Props): JSX.Element {
  return (
    <Link href={`/news/${props?.id}`}>
      <div className="post-item">
        <div className="post-item__img">
          <img className="post-item__img-item" alt={props?.title} src={props?.imgUrl}></img>
        </div>
        <div className="post-item__content">
          <div className="post-item__content-title">{props?.title}</div>
          <div className="post-item__content-divider"></div>
          <div className="post-item__content-description">{props?.description}</div>
        </div>

        <div className="post-item__badge">
          <div className="post-item__badge-wrapper">
            <div className="post-item__badge-day">22</div>
            <div className="post-item__badge-month">Jul</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
