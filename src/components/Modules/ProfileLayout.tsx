import React from 'react';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = (props: Props) => {
  return (
    <section className="py-5 order-list container">
      <div className="row">
        <div className="col-xl-3 d-xl-block d-none">
          <ProfileSidebar />
        </div>

        <div className="col-xl-9 col-sm-12">{props.children}</div>
      </div>
    </section>
  );
};

export default ProfileLayout;
