import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import useUpdateQuery from '../../../hooks/useUpdateQuery'

type Props = {
  tab?: string // The tab to change when this tag is clicked
  children: React.ReactNode // Content inside tag
}

// products/?otherQueries?tab=[tab]
const FilterTag = (props: Props) => {
  const { tab, children } = props

  const router = useRouter()

  const updateQuery = useUpdateQuery()

  // This tag is active if it's the current tab
  // Undefined tab means all products tab
  const isActive = router.query.tab === tab

  // Change tab query when clicked
  const onClick = () => {
    const newQuery = { ...router.query }

    // Delete tab query if clicking "All products" tab
    if (!tab) {
      delete newQuery.tab
    } else {
      newQuery.tab = tab
    }

    updateQuery(newQuery)
  }

  return (
    <button className={clsx('btn products__filter-btn', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}

export default FilterTag
