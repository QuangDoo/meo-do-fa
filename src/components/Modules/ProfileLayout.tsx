import React from 'react';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const ProfileLayout = (props: Props) => {
  return (
    <section className="py-4 order-list container">
      <div className="row">
        <div className="col-xl-3 d-xl-block d-none">
          <ProfileSidebar />
        </div>

        <div className="col-xl-9 col-sm-12">
          {props.title && <h1 className="h2 text-center mb-4 text-primary">{props.title}</h1>}
          {props.children}
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
