import React from 'react'
import CardView from '../../Layout/Card/CardView'

type Props = {
  news: any
}

export default function NewsList(props: Props): JSX.Element {
  return (
    <>
      {
        props.news.map((item,index)=>(
          <div key={index} className="col-lg-6 col-sm-12 position-relative mb-2">
            <CardView
              id={index}
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
              createAt={item.createAt}
          />
          </div>
        ))
      }
    </>
  )
}
