import React from 'react';
import useWebsitePost from 'src/hooks/useWebsitePost';

import FAQSidebar from '../../Layout/SideBar/FAQSidebar';

type Props = {
  children?: React.ReactNode;
  questions?: any;
  categories?: any;
};

export default function FAQ(props: Props) {
  const questionList = useWebsitePost('FAQ');

  return (
    <>
      <div className="container help">
        {/* <div className="row">
          <div className="col-12">
            <div className="wrapper">
              <div className="mb-3 mt-3">
                <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)} />
              </div>
            </div>
          </div>
        </div> */}

        <div className="row my-5">
          <div className="col-sm-12 col-lg-9 col-left__divider order-lg-2">
            <div className="wrapper">{props.children}</div>
          </div>

          <div className="col-sm-12 col-lg-3 order-lg-1">
            <div className="wrapper mb-5">
              <FAQSidebar questionList={questionList} />
            </div>
          </div>
        </div>
      </div>

      {/* <Contact /> */}
    </>
  );
}
