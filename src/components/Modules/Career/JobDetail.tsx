import { useTranslation } from 'i18n';
import React, { useState } from 'react';

import ConfirmApplyJob from './ConfirmApplyJob';

type Props = {
  name?: string;
  requirements?: string[];
  jobDescription?: string[];
  description?: string;
  location?: string;
  department?: string;
  level?: string;
};

export default function JobDetail(props: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('jobDetail');

  return (
    <div className="container">
      <div className="job-detail__wrapper">
        <div className="row border-bottom job-detail text-center">
          <h1 className="mb-3 text-primary">{props.name}</h1>
          <div className="job-department-info">
            <div className="mr-3">
              <strong className="job-label text-primary text-small">
                {`${t('jobDetail:department')} :`}
              </strong>
              <span className="text-small">People, Legal and Finance</span>
            </div>
            <div className="mr-3">
              <strong className="job-label text-primary text-small">
                {`${t('jobDetail:level')} :`}
              </strong>
              <span className="text-small">Experienced</span>
            </div>
            <div className="mr-3">
              <strong className="job-label text-primary text-small">
                {`${t('jobDetail:location')} :`}
              </strong>
              <span className="text-small">Việt Nam - TP. Hồ Chí Minh</span>
            </div>
          </div>
          <div className="job-department-desc text-small">{props.description}</div>
        </div>

        <div className="row job-detail">
          <strong className="text-primary">{`${t('jobDetail:job_descriptions')} :`}</strong>
          <ul className="ml-5">
            {props?.jobDescription.map((description, index) => (
              <li className="text-small" key={index}>
                {description}
              </li>
            ))}
          </ul>
          <strong className="text-primary">{`${t('jobDetail:requirements')} :`}</strong>
          <ul className="ml-5">
            {props?.requirements.map((requirement, index) => (
              <li className="text-small" key={index}>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-block text-center w-100 mb-3">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          {t('jobDetail:button_title')}
        </button>
        <ConfirmApplyJob open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
