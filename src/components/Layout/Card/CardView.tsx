import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  id?: string;
  title?: string;
  imgUrl?: string;
  description?: string;
  createAt?: string;
  slug: string;
};

export default function CardView(props: Props) {
  return (
    <Link href={`/news/${props?.slug}`}>
      <div className="post-item">
        <div className="post-item__img">
          <Image
            className="post-item__img-item"
            alt={props?.title}
            layout="fill"
            objectFit={props?.imgUrl ? 'contain' : 'cover'}
            src={props?.imgUrl || '/assets/images/no_images.jpg'}
          />
        </div>
        <div className="post-item__content">
          <div className="post-item__content-title">{props?.title}</div>
          <div className="post-item__content-divider"></div>
          <div
            className="post-item__content-description"
            dangerouslySetInnerHTML={{
              __html: props?.description
            }}></div>
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
