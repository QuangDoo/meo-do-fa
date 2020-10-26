import clsx from 'clsx'
import React from 'react'

type Props = {
  children: React.ReactNode
  title: string
  titleChildren?: React.ReactNode
  hasRequired?: boolean
}

const InputCard = (props: Props) => {
  return (
    <div className="elevated p-3 p-md-4">
      <div
        className={clsx('mb-4', props.hasRequired && 'd-flex justify-content-between flex-wrap')}
      >
        <h2 className="h6">{props.title}</h2>

        {props.hasRequired && (
          <small className="text-muted font-italic">
            <i className="fas fa-exclamation-circle mr-1"></i>
            Lưu ý: những ô có dấu <span className="required"></span> là thông tin bắt buộc
          </small>
        )}

        {props.titleChildren}
      </div>

      {props.children}
    </div>
  )
}

export default InputCard
