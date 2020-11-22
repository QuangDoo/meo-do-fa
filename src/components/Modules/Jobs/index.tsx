import React from 'react'
import InputSearch from '../News/InputSearch'

const jobs = [
  {id: 1, href: "/", jobName: "Senior Accountant"},
  {id: 2, href: "/", jobName: "Branding Specialist"},
  {id: 3, href: "/", jobName: "Content Specialist"},
  {id: 4, href: "/", jobName: "Mobile Developer (React Native, Java)"},
  {id: 5, href: "/", jobName: "Data Analyst"},
  {id: 6, href: "/", jobName: "Product Owner"},
  {id: 7, href: "/", jobName: "Accounting Assistant"},
  {id: 8, href: "/", jobName: "Golang Developer"},
  {id: 9, href: "/", jobName: "Frontend Developer"},
  {id: 10, href: "/", jobName: "Nhân Viên Mua Hàng (Dược) / Purchaser"},
]


function Jobs (props): JSX.Element {
  return (<>
    <div className="container mt-3 jobs">
      <div className="wapper">
        <h4 className="about-us__title text-center">Find Your Passion</h4>
        
        <InputSearch placeholder={`Seach Jobs...`} keySearch={(key) => console.log(key)}/>

        <div className="row">
          {
            jobs.map((job,index) => (
              <a key={index} href={`/jobs/${job.id}`} className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="jobs-item p-3 bg-white">
                  <div className="jobs-item__title mb-2">{job.jobName}</div>
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