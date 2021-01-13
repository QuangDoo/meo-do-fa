import React from 'react';

import InputSearch from '../../Modules/News/InputSearch';
import NewsBanner from '../../Modules/News/NewsBanner';
import ResentPostItem from '../../Modules/News/ResentPostItem';

type Props = {
  bannerImgUrl?: string;
  links?: any;
};

function FAQSidebar(props: Props) {
  function renderPost(links): JSX.IntrinsicElements {
    return links.map((item, index) => (
      <ResentPostItem key={index} href={item.href} title={item.title} />
    ));
  }

  return (
    <>
      <div className="mb-3">
        <InputSearch placeholder="Search ..." keySearch={(x) => console.log(x)}></InputSearch>
      </div>

      <div className="recent-post mb-4">
        <div className="news__title">{`BÀI VIẾT MỚI NHẤT`}</div>
        <div className="news__divider"></div>
        <ul className="list-unstyled">{renderPost(props.links)}</ul>
      </div>

      <NewsBanner bannerImgUrl={props.bannerImgUrl} title="Trải nghiệm MEDOFA"></NewsBanner>
    </>
  );
}

export default FAQSidebar;
