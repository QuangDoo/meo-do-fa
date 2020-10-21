import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  page?: number
  type?: 'prev' | 'next' | 'gap'
}

const PageButton = (props: Props) => {
  const { page, type } = props

  const router = useRouter()

  // This button is current if it has the same page as the current page query
  //  OR if it's the 1st page and the page query is undefined
  const isCurrent = router.query.page === page.toString() || (!router.query.page && page === 1)

  // Change page query on click
  const onClick = () => {
    router.push({
      pathname: router.pathname, // Same page
      query: {
        ...router.query, // Same queries
        page: page, // With new pagination
      },
    })
  }

  // Content to render inside the button
  const content = () => {
    if (!type) return page
    else if (type === 'gap') return '...'
    else
      return (
        <i
          className={clsx('fas', {
            'fa-arrow-left': type === 'prev',
            'fa-arrow-right': type === 'next',
          })}
        />
      )
  }

  return (
    <span
      className={clsx('page', {
        prev: type === 'prev',
        next: type === 'next',
        gap: type === 'gap',
        current: isCurrent,
      })}
      onClick={onClick}
    >
      {content()}
    </span>
  )
}

export default PageButton
