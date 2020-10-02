import React from 'react'

interface HeaderProps {
  name: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const { name } = props
  return (
    <div className="px-2 px-sm-0">
      <div className="mb-2">
        <h1 className="products__header text-capitalize mb-3">{name}</h1>
      </div>
    </div>
  )
}

export default Header
