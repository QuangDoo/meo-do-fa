import React from 'react';

import InputSearch from './InputSearch';
import NewsBanner from './NewsBanner';
import ResentPostItem from './ResentPostItem';

const imgUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c596bb11090425.560f16f7207b1.jpg';
const links = [
  { href: '', title: 'Contrary  Lorem Ipsum is not simply random text' },
  { href: '', title: 'Contrary to text Contrary to populartext Contrary to populartext' },
  { href: '', title: 'Contrary to popular belief, Lorem random text Contrary to populartext' },
  { href: '', title: 'Contrary Ipsum is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary to to populartext Contrary to populartext Contrary to populartext' }
];

function NewsSidebar(): JSX.Element {
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
        <ul className="list-unstyled">{renderPost(links)}</ul>
      </div>

      <NewsBanner bannerImgUrl={imgUrl} title="Trải nghiệm MEDOFA"></NewsBanner>
    </>
  );
}

export default NewsSidebar;
