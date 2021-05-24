import { useTranslation } from 'i18n';
import React from 'react';

import InputSearch from '../News/InputSearch';

type Props = {
  keySearch?: (x) => void;
  onSubmit?: () => void;
  jobs?: any;
};

function Jobs(props: Props) {
  const { t } = useTranslation('career');
  const { jobs } = props;
  return (
    <>
      <div className="container mt-3">
        <div className="wrapper">
          <h4 className="about-us__title text-center">{`${t('career:job_title')}`}</h4>
          <div className="row">
            <div className="col-12">
              <div className="mb-3 mt-3">
                <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)} />
              </div>
            </div>
          </div>
          <div className="jobs">
            {jobs?.map((job, index) => (
              <a key={index} href={`/career/${job?.slug}`} className="job-item">
                <div className="jobs-item p-3 bg-white">
                  <div className="jobs-item__title mb-2">{job?.name}</div>
                  <div className="jobs-item__readmore text-small">
                    {`More Details `}
                    <span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;
