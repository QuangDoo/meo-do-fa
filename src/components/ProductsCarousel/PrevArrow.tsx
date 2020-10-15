import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-feature-settings: 'tnum';
  padding: 0;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  touch-action: manipulation;
  color: inherit;
  border-radius: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
  text-transform: none;
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 999;
  left: 15px;
  margin-left: -15px;

  i {
    color: white;
  }
`

export const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <button onClick={onClick} className={className} aria-disabled="true" style={{ ...style }}>
      <i className="fas fa-chevron-left"></i>
    </button>
  )
}
