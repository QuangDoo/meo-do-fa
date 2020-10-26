import React from 'react'

type Props = {
  children: React.ReactNode
  title: string
  hasRequired?: boolean
}

const InputCard = (props: Props) => {
  return (
    <div className="elevated p-3 p-md-4">
      <div className="d-flex justify-content-between flex-wrap mb-4">
        <h2 className="h6">{props.title}</h2>

        {props.hasRequired && (
          <small className="text-muted font-italic">
            <i className="fas fa-exclamation-circle mr-1"></i>
            Lưu ý: những ô có dấu <span className="required"></span> là thông tin bắt buộc
          </small>
        )}
      </div>

      {props.children}
    </div>
  )
}

export default InputCard
