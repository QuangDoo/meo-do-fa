import React from 'react'
import Link from 'next/link'

const questions = [
  {id: 1, href: "1", title: "Hủy đơn hàng và khóa tài khoản" },
  {id: 2, href: "1", title: "Tại sao tôi đăng nhập bị lỗi?" },
  {id: 3, href: "1", title: "Tại sao tôi không đăng nhập được tài khoản?" },
  {id: 4, href: "1", title: "Quên mật khẩu đăng nhập" },
  {id: 5, href: "1", title: "Medofa bán những sản phẩm gì" },
  {id: 5, href: "1", title: "Medofa bán những sản phẩm gì" },
  {id: 5, href: "1", title: "Medofa bán những sản phẩm gì" },
  {id: 5, href: "1", title: "Medofa bán những sản phẩm gì" },
]

type Props = {
  questions?: any
}

function Questions (props: Props):JSX.Element {
  return (
    <div className="wapper">
           
      <div className="list-unstyled mb-3">
        {
          questions.map((question, index) => (
            <li key={index} className="faq-question">
              <Link href={`/help/${question.href}`}>
                <a className="faq-link">{question.title}</a>
              </Link>
            </li>
          ))
        }
      </div> 
    </div>
  )
} 

export default Questions