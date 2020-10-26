import Link from 'next/link'
import React, { forwardRef } from 'react'
import StickyHeader from './StickyHeader'

const StickySidebar = (props, ref) => {
  return (
    <div className="checkout__sticky">
      <StickyHeader />
    </div>
  )
}

export default forwardRef(StickySidebar)
