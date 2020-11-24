import React, { ReactChild } from 'react'
import PageLayout from 'src/components/Layout/PageLayout'
import NewsSidebar from './NewsSidebar'

type Props = {
  children?: ReactChild
}

export default function News(props: Props) {
  return (
    <PageLayout>
      <div className="row">
        <div className="col-sm-12 col-lg-9">
          <div className="wrapper">
            <div className="row">
              {props.children}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-3 col-left__divider">
          <NewsSidebar />
        </div>
      </div>
    </PageLayout>
  )
}
