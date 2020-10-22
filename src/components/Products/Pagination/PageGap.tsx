import React from 'react'

type Props = {
  hidden: boolean
}

const PageGap = ({ hidden }: Props) => {
  return (
    <span
      hidden={hidden}
      className="page gap"
      style={{
        userSelect: 'none',
      }}
    >
      …
    </span>
  )
}

export default PageGap
