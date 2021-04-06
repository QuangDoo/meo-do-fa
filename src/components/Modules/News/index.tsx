import React, { ReactChild } from 'react';
import PageLayout from 'src/components/Layout/PageLayout';

import NewsSidebar from '../../Layout/SideBar/NewsSidebar';

type Props = {
  children?: ReactChild;
  bannerImgUrl?: string;
  links?: any;
};

export default function News(props: Props) {
  return (
    <PageLayout>
      <div className="row">
        <div className="col-12">
          <div className="wrapper">
            <div className="row">{props.children}</div>
          </div>
        </div>
        {/* <div className="col-sm-12 col-lg-3 col-left__divider">
          <NewsSidebar bannerImgUrl={props.bannerImgUrl} links={props.links} />
        </div> */}
      </div>
    </PageLayout>
  );
}
