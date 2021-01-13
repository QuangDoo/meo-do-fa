import React from 'react';
type Props = {
  title: string;
  bannerImgUrl: string;
};

function NewsBanner(props: Props) {
  return (
    <div className="news-banner mb-4">
      <div className="news__title">{props.title}</div>
      <div className="news__divider"></div>
      <img className="news-banner__img" src={props.bannerImgUrl} alt={props.title}></img>
    </div>
  );
}

export default NewsBanner;
