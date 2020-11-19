import Link from 'next/link';
import React from 'react';

type Props = {
  id?: string;
  title?: string;
  imgUrl?: string;
  description?: string;
  createAt?: string;
};

export default function PostItem(props: Props): JSX.Element {
  const data = {
    id: 8,
    title:
      'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing 
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
    PageMaker including versions of Lorem Ipsum.`,
    imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg'
  };

  return (
    <div className="col-lg-6 col-sm-12 position-relative mb-2">
      <Link href={`/news/${data.title}`}>
        <div className="post-item">
          <div className="post-item__img">
            <img className="post-item__img-item" alt={data.title} src={data.imgUrl}></img>
          </div>
          <div className="post-item__content">
            <div className="post-item__content-title">{data.title}</div>
            <div className="post-item__content-divider"></div>
            <div className="post-item__content-description">{data.description}</div>
          </div>

          <div className="post-item__badge">
            <div className="post-item__badge-wrapper">
              <div className="post-item__badge-day">22</div>
              <div className="post-item__badge-month">Jul</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
