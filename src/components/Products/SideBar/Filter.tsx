/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import styled from 'styled-components'

interface FilterItem {
  name: string
  href: string
}

interface FilterProps {
  header: string
  data: FilterItem[]
}

const StyledFilterWrap = styled.div`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                      supported by Chrome, Edge, Opera and Firefox */
  margin-bottom: 1rem;
`

const Filter: React.FC<FilterProps> = (props) => {
  const { header, data } = props
  const [show, setShow] = useState(true)

  function toggleShow() {
    setShow((show) => !show)
  }

  return (
    <StyledFilterWrap>
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
    </StyledFilterWrap>
  )
}

export default Filter
