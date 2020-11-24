import React, { useState } from 'react';

import Banner from './Banner';
import BoxImage from './BoxImage';
import Jobs from './Jobs';
import MessageOurFounder from './MessageOurFounder';

const jobs = [
  { id: 1, href: '/', jobName: 'Senior Accountant' },
  { id: 2, href: '/', jobName: 'Branding Specialist' },
  { id: 3, href: '/', jobName: 'Content Specialist' },
  { id: 4, href: '/', jobName: 'Mobile Developer (React Native, Java)' },
  { id: 5, href: '/', jobName: 'Data Analyst' },
  { id: 6, href: '/', jobName: 'Product Owner' },
  { id: 7, href: '/', jobName: 'Accounting Assistant' },
  { id: 8, href: '/', jobName: 'Golang Developer' },
  { id: 9, href: '/', jobName: 'Frontend Developer' },
  { id: 10, href: '/', jobName: 'Nhân Viên Mua Hàng (Dược) / Purchaser' }
];

const images = [
  {
    imgUrl: 'https://career.thuocsi.vn/wp-content/uploads/2020/05/s4-300x225.png',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://career.thuocsi.vn/wp-content/uploads/2020/05/s3-300x225.png',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://career.thuocsi.vn/wp-content/uploads/2020/05/s2-300x225.png',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://career.thuocsi.vn/wp-content/uploads/2020/05/s1-300x225.png',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  }
];

type Job = {
  id: number;
  href: string;
  jobName: string;
};

function Career(props): JSX.Element {
  const [tempJobs, setTempJobs] = useState<Job[]>(jobs);
  console.log(tempJobs);
  const onFilter = (key) => {
    const temp = jobs.filter((job) => job.jobName.toLowerCase().indexOf(key?.toLowerCase()) !== -1);
    setTempJobs(temp);
  };
  const imgUrl = `https://career.thuocsi.vn/wp-content/uploads/2020/05/coverbanner.png`;
  const rightImgUrl = `https://career.thuocsi.vn/wp-content/uploads/2020/04/thuocsi_example1-1-1024x683.jpg`;

  return (
    <>
      <Banner bannerImgUrl={imgUrl} rightImgUrl={rightImgUrl} />

      <Jobs jobs={tempJobs} keySearch={(x) => onFilter(x)} />

      <BoxImage images={images} />

      <MessageOurFounder />

      <div className="container">
        <div className="row">
          <div className="col text-center m-5">
            <h3 className="text-primary">Interested?</h3>
            <a href="mailto:recruitment@thuocsi.vn" className="btn btn-primary">
              Email us now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Career;
