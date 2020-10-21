import React from 'react'
import PageButton from './PageButton'

const Pagination = () => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <nav aria-label="pager" className="pagy-nav pagination" role="navigation">
        <span className="page prev disabled">
          <i className="fas fa-arrow-left" />{' '}
        </span>

        <span className="page current">1 </span>

        <span className="page">
          <a href="https://thuocsi.vn/products?current_tab=new_arrival&page=2" rel="next">
            2
          </a>
        </span>

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
        <span className="page next">
          <a
            href="https://thuocsi.vn/products?current_tab=new_arrival&page=2"
            rel="next"
            aria-label="next"
          >
            <i className="fas fa-arrow-right" />
          </a>
        </span>
      </nav>
    </div>
  )
}

export default Pagination
