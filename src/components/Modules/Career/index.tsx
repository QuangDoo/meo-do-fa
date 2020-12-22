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
    imgUrl: 'https://loremflickr.com/320/240/dog',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://loremflickr.com/320/240/brazil,rio',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://loremflickr.com/320/240',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: 'https://loremflickr.com/g/320/240/paris,girl/all',
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
  const onFilter = (key) => {
    const temp = jobs.filter((job) => job.jobName.toLowerCase().indexOf(key?.toLowerCase()) !== -1);
    setTempJobs(temp);
  };
  const imgUrl = `/assets/images/drugstore2.jpg`;
  const rightImgUrl = `https://i.pinimg.com/236x/36/65/76/366576564c307ccd2e16fb08ea5b3493.jpg`;

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
            <a href="mailto:tranquochung6810@gmail.com" className="btn btn-primary">
              Email us now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Career;
