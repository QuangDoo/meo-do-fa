/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import useUpdateQuery from '../../../hooks/useUpdateQuery'

type Props = {
  page?: number
}

const PageButton = (props: Props) => {
  const { page } = props

  const router = useRouter()

  const updateQuery = useUpdateQuery()

  // This button is current if it has the same page as the current page query
  //  OR if it's the 1st page and the page query is undefined (first time loading route)
  const isCurrent = router.query.page === page?.toString() || (!router.query.page && page === 1)

  // Change page query on click
  const onClick = () => {
    if (isCurrent) return

    updateQuery({
      ...router.query, // Same queries
      page: page, // With new page
    })
  }

  return (
    <span className={clsx('page', isCurrent && 'current')} onClick={onClick}>
      {isCurrent ? page : <a href="#">{page}</a>}
    </span>
  )
}

export default PageButton
