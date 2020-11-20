import React from 'react'

function Sidebar (props): JSX.Element {
  return (
    <div className="wapper mb-5">
      <div className="news__title">{`Danh mục`}</div>
      <div className="news__divider"></div>
      <div className="list-unstyled">
        <li className="pb-2"><a href="/faq" className="faq-link">Câu hỏi về tài khoản</a></li>
        <li className="pb-2"><a href="/faq" className="faq-link">Câu hỏi về đơn hàng và đặt hàng</a></li>
        <li className="pb-2"><a href="/faq" className="faq-link">Câu hỏi về thanh toán</a></li>
        <li className="pb-2"><a href="/faq" className="faq-link">Câu hỏi về vận chuyển</a></li>
        <li className="pb-2"><a href="/faq" className="faq-link">Câu hỏi về đổi trả và hoàn tiền</a></li>
      </div>
    </div>  
  )
}

export default Sidebar