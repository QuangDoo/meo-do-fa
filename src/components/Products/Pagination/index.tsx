import { useRouter } from 'next/router'
import React, { useState } from 'react'
import PageButton from './PageButton'
import PageGap from './PageGap'
import NavigateButton from './NavigateButton'

type Props = {
  totalProducts: number
}

// 20 products each page - decided on front end
const pageSize = 20

// Maximum sibling pages allowed next to current page before gap appears
// x pages - current - x pages
const maxPagesBeforeShowingGap = 6

// The number of sibling pages allowed next to current page when there is gap
const siblingCount = 4

const Pagination = ({ totalProducts }: Props) => {
  const router = useRouter()

  // Maximum amount of pages
  const lastPage = Math.ceil(totalProducts / pageSize)

  // Current page (1 if current page query is undefined)
  const currentPage = +(router.query.page as string) || 1

  // Hide before gap
  const beforeGapHidden = currentPage - 1 <= maxPagesBeforeShowingGap

  // Hide after gap
  const afterGapHidden = lastPage - currentPage <= maxPagesBeforeShowingGap

  // Siblings before current page
  const siblingsBefore = []

  // Siblings after current page
  const siblingsAfter = []

  // Populate siblings before current page
  for (let i = currentPage - 1; i > 1; i--) {
    siblingsBefore.unshift(<PageButton key={i} page={i} />)

    if (!beforeGapHidden && siblingsBefore.length === siblingCount) break
  }

  // Populate siblings after current page
  for (let i = currentPage + 1; i < lastPage; i++) {
    siblingsAfter.push(<PageButton key={i} page={i} />)

    if (!afterGapHidden && siblingsAfter.length === siblingCount) break
  }

  return (
    <div className="d-flex justify-content-center mb-3">
      <nav aria-label="pager" className="pagy-nav pagination" role="navigation">
        {/* Previous page button */}
        <NavigateButton type="prev" hidden={!router.query.page || router.query.page === '1'} />

        {/* First page always shown */}
        <PageButton page={1} />

        <PageGap hidden={beforeGapHidden} />

        {/* Sibling pages before current page */}
        {siblingsBefore}

        {/* Current page if not 1 or last */}
        {currentPage > 1 && currentPage < lastPage && <PageButton page={currentPage} />}

        {/* Sibling pages after current page */}
        {siblingsAfter}

        <PageGap hidden={afterGapHidden} />

        {/* Last page always shown */}
        <PageButton page={lastPage} />

        {/* Next page button */}
        <NavigateButton type="next" hidden={router.query.page === lastPage.toString()} />
      </nav>
    </div>
  )
}

export default Pagination
