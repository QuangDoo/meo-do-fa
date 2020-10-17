import React, { FC } from 'react'

type ProductsContainerProps = {
  deals?: boolean
  contentType?: 'carousel' | 'grid'
  seeMoreUrl: string
  title: string
}

export const ProductsContainer: FC<ProductsContainerProps> = ({
  contentType = 'carousel',
  ...props
}) => {
  const dealsClass = props.deals ? 'deals' : ''

  const gridClass = contentType === 'grid' ? 'px-0 px-sm-3' : ''

  const btnClass = props.deals
    ? 'btn-outline-light btn-transparent'
    : 'btn-outline-primary btn-white'

  return (
    <section className={`py-5 container-fluid ${dealsClass} ${gridClass}`}>
      <div className="home__container">
        <div className="text-center mb-4">
          <h2 className={props.deals && 'text-white'}>{props.title}</h2>
        </div>

        <div className="mb-4">{props.children}</div>

        <div className="text-center">
          <a className={`btn ${btnClass}`} href={props.seeMoreUrl}>
            Xem tất cả
          </a>
        </div>
      </div>
    </section>
  )
}
