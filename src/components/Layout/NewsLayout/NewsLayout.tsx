import React from 'react';

import { StyledPostSidebar } from './NewsLayout.styled';
import RecentPost from './RecentPost';
import Search from './Search';

const imgUrl = 'https://news.thuocsi.vn/wp-content/uploads/2020/05/160x600.png';
const links = [
  { href: '', title: 'Contrary  Lorem Ipsum is not simply random text' },
  { href: '', title: 'Contrary to text Contrary to populartext Contrary to populartext' },
  { href: '', title: 'Contrary to popular belief, Lorem random text Contrary to populartext' },
  { href: '', title: 'Contrary Ipsum is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary to to populartext Contrary to populartext Contrary to populartext' }
];

interface IProps {
  children?: React.ReactNode;
  links?: any;
  imgUrl?: string;
}

export default function NewsLayout(props: IProps): JSX.Element {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 col-lg-9">{props.children}</div>
        <div className="col-sm-12 col-lg-3">
          <StyledPostSidebar>
            <Search placeholder={'Search...'}></Search>
            <RecentPost links={links} title="BÀI VIẾT MỚI NHẤT"></RecentPost>
            <RecentPost imgUrl={imgUrl} title="Trải nghiệm thuocsi.vn"></RecentPost>
          </StyledPostSidebar>
        </div>
      </div>
    </div>
  );
}
