import { useTranslation } from 'i18n';
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
    imgUrl: '/assets/images/no-image.jpg',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: '/assets/images/no-image.jpg',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: '/assets/images/no-image.jpg',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  },
  {
    imgUrl: '/assets/images/no-image.jpg',
    title: 'life at Medofa',
    alt: 'life at Medofa'
  }
];

type Job = {
  id: number;
  href: string;
  jobName: string;
};

function Career(props) {
  const [tempJobs, setTempJobs] = useState<Job[]>(jobs);
  const onFilter = (key) => {
    const temp = jobs.filter((job) => job.jobName.toLowerCase().indexOf(key?.toLowerCase()) !== -1);
    setTempJobs(temp);
  };
  const imgUrl = `/assets/images/drugstore2.jpg`;
  const rightImgUrl = `/assets/images/no-image.jpg`;

  const { t } = useTranslation('career');

  return (
    <>
      {/* <Banner bannerImgUrl={imgUrl} rightImgUrl={rightImgUrl} /> */}

      <Jobs jobs={props.hrList} keySearch={(x) => onFilter(x)} />

      {/* <BoxImage images={images} /> */}

      {/* <MessageOurFounder /> */}

      <div className="container">
        <div className="row">
          <div className="col text-center m-5">
            <a href="mailto:tuyendung@medofa.com" className="btn btn-primary">
              {t('career:email_btn')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Career;
