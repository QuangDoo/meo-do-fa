import React from 'react';

import ProfileSidebar from './ProfileSidebar';

type Props = {
  children: React.ReactNode;
};

const UserPageLayout = (props: Props) => {
  return (
    <section className="py-5 order-list container">
      <div className="row">
        <ProfileSidebar />

        {props.children}
      </div>
    </section>
  );
};

export default UserPageLayout;
