import React from 'react';

import CardView from '../../Layout/Card/CardView';

type Props = {
  news: any;
};

export default function NewsList(props: Props) {
  return (
    <>
      {props?.news &&
        props?.news.map((item, index) => (
          <div key={index} className="col-lg-6 col-sm-12 position-relative mb-2">
            <CardView
              id={item.id}
              title={item.name}
              description={item.content}
              imgUrl={item.link}
              createAt={item.createAt}
              slug={item.slug}
            />
          </div>
        ))}
    </>
  );
}
