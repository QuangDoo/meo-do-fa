import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  tab?: string // The tab to change when this tag is clicked

  children: React.ReactNode
}

// products/?otherQueries?tab=[tab]
const FilterTag = (props: Props) => {
  const { tab, children } = props

  const router = useRouter()

  // This tag is active if it's the current tab
  const isActive = router.query.tab === tab

  // Change tab query when clicked
  const onClick = () => {
    const newQuery = { ...router.query }

    if (!tab) {
      delete newQuery.tab
    } else {
      newQuery.tab = tab
    }

    router.push(
      {
        pathname: router.pathname, // Still the same page
        query: newQuery,
      },
      undefined, // Decorator for the url, we don't want any so leave it undefined
      { shallow: true } // Use shallow routing to not reload the whole page, only reload products when queries change
    )
  }

  return (
    <button className={clsx('btn products__filter-btn', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}

export default FilterTag
