import clsx from 'clsx'
import React, { useState } from 'react'

interface FilterItem {
  name: string
  href: string
}

interface FilterProps {
  header: string
  data: FilterItem[]
}

const Filter = (props: FilterProps) => {
  const { header, data } = props
  const [show, setShow] = useState(true)

  function toggleShow() {
    setShow((show) => !show)
  }

  return (
    <>
      <div
        onClick={toggleShow}
        onKeyPress={toggleShow}
        className={clsx('products__filter-header with-toggle', !show && 'collapsed')}
        role="button"
        tabIndex={0}
      >
        {header}
        <i className="fas fa-chevron-right products__filter-expand" />
      </div>
      <div className={clsx('products__filters collapse', show && 'show')}>
        {data.map(({ name, href }) => (
          <div key={name} className="products__filter-item">
            <a className="products__filter-category" href={href}>
              {name}
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default Filter
