/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'

interface FilterItem {
  name: string
  href: string
}

interface FilterProps {
  header: string
  data: FilterItem[]
}

const Filter: React.FC<FilterProps> = (props) => {
  const { header, data } = props
  const [show, setShow] = useState(false)

  function toggleShow() {
    setShow((show) => !show)
  }

  return (
    <div className="mb-3">
      <div
        onClick={toggleShow}
        className={`products__filter-header with-toggle  ${show ? '' : 'collapsed'}`}
      >
        {header}
        <i className="fas fa-chevron-right products__filter-expand" />
      </div>
      <div className={`products__filters collapse ${show ? 'show' : ''}`}>
        {data.map(({ name, href }) => (
          <div key={name} className="products__filter-item">
            <a className="products__filter-category" href={href}>
              {name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
