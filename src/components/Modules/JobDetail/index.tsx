import React from 'react';

import CareerModal from '../CareerModal';

type Props = {
  name?: string;
  requirements?: string[];
  jobDescription?: string[];
  description?: string;
  location?: string;
  department?: string;
  level?: string;
};

export default function JobDetail(props: Props): JSX.Element {
  return (
    <div className="container">
      <div className="job-detail__wrapper">
        <div className="row border-bottom job-detail text-center">
          <h1 className="mb-3 text-primary">{props.name}</h1>
          <div className="job-department-info">
            <div className="mr-3">
              <strong className="job-label text-primary text-small">Bộ phận:</strong>
              <span className="text-small">People, Legal and Finance</span>
            </div>
            <div className="mr-3">
              <strong className="job-label text-primary text-small">Cấp bậc:</strong>
              <span className="text-small">Experienced</span>
            </div>
            <div className="mr-3">
              <strong className="job-label text-primary text-small">Địa điểm làm việc:</strong>
              <span className="text-small">Việt Nam - TP. Hồ Chí Minh</span>
            </div>
          </div>
          <div className="job-department-desc text-small">{props.description}</div>
        </div>

        <div className="row job-detail">
          <strong className="text-primary">Job description:</strong>
          <ul className="ml-5">
            {props?.jobDescription.map((description, index) => (
              <li className="text-small" key={index}>
                {description}
              </li>
            ))}
          </ul>
          <strong className="text-primary">Requirements:</strong>
          <ul className="ml-5">
            {props?.requirements.map((requirement, index) => (
              <li className="text-small" key={index}>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <div className="row job-detail">
          <CareerModal />
        </div>
      </div>
    </div>
  );
}
