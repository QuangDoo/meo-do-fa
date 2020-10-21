import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PageButton from './PageButton'
import PrevNextButton from './PrevNextButton'

const Pagination = () => {
  const router = useRouter()

  const [maxPage, setMaxPage] = useState(10)

  return (
    <div className="d-flex justify-content-center mb-3">
      <nav aria-label="pager" className="pagy-nav pagination" role="navigation">
        <PrevNextButton type="prev" hidden={!router.query.page || router.query.page === '1'} />

        <PageButton page={1} />

        <PageButton page={2} />

        <span className="page">
          <a href="https://thuocsi.vn/products?current_tab=new_arrival&page=3">3</a>{' '}
        </span>
        <span className="page">
          <a href="https://thuocsi.vn/products?current_tab=new_arrival&page=4">4</a>{' '}
        </span>
        <span className="page">
          <a href="https://thuocsi.vn/products?current_tab=new_arrival&page=5">5</a>{' '}
        </span>
        <span className="page gap">… </span>
        <span className="page">
          <a href="https://thuocsi.vn/products?current_tab=new_arrival&page=52">52</a>
        </span>

        {/* <span className="page next">
          <a
            href="https://thuocsi.vn/products?current_tab=new_arrival&page=2"
            rel="next"
            aria-label="next"
          >
            <i className="fas fa-arrow-right" />
          </a>
        </span> */}

        <PrevNextButton type="next" hidden={router.query.page === maxPage.toString()} />
      </nav>
    </div>
  )
}

export default Pagination
