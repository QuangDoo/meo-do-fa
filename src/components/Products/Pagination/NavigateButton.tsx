/* eslint-disable jsx-a11y/anchor-is-valid */

import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import useUpdateQuery from '../../../hooks/useUpdateQuery'

type Props = {
  type: 'prev' | 'next'
  hidden: boolean
}

const NavigateButton = (props: Props) => {
  const { type, hidden } = props

  const router = useRouter()

  const updateQuery = useUpdateQuery()

  const onClick = () => {
    const oldPage = +router.query.page || 1

    const newPage = type === 'next' ? oldPage + 1 : oldPage - 1

    updateQuery({
      ...router.query,
      page: newPage.toString(),
    })
  }

  return (
    <button hidden={hidden} className="page" onClick={onClick} style={{ border: 'none' }}>
      <a href="#">
        <i
          className={clsx('fas', {
            'fa-arrow-left': type === 'prev',
            'fa-arrow-right': type === 'next',
          })}
        />
      </a>
    </button>
  )
}

export default NavigateButton
