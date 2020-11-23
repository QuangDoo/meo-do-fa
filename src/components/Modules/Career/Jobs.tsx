import React from 'react'
import InputSearch from '../News/InputSearch'

type Props = {
  keySearch?: (x)=> void
  onSubmit?: () => void
  jobs?: any

}

function Jobs (props: Props): JSX.Element {
  const { jobs } = props;
  return (<>
    <div className="container mt-3">
      <div className="wapper">
        <h4 className="about-us__title text-center">Find Your Passion</h4>
        
        <InputSearch placeholder={`Seach Jobs...`} keySearch={(key) => props.keySearch(key)}/>

        <div className="row jobs">
          {
            jobs?.map((job,index) => (
              // <a key={index} href={`/jobs/${job?.id}`} className="col-12 col-sm-6 col-md-6 col-lg-6">
              //   <div className="mb-2">
              //     <div className="jobs-item p-3 bg-white">
              //       <div className="jobs-item__title mb-2">{job?.jobName}</div>
              //       <div className="jobs-item__readmore text-small">
              //         {`More Details `}
              //         <span><i className="fas fa-long-arrow-alt-right"></i></span>
              //       </div>
              //     </div>
              //   </div>
              // </a>

              <a key={index} href={`/career/jobs/${job?.id}`} className="job-item">
                <div className="jobs-item p-3 bg-white">
                  <div className="jobs-item__title mb-2">{job?.jobName}</div>
                  <div className="jobs-item__readmore text-small">
                    {`More Details `}
                    <span><i className="fas fa-long-arrow-alt-right"></i></span>
                  </div>
                </div>
             </a>
            ))
          }
        </div>
      </div>
    </div>
  </>)
}

export default Jobs