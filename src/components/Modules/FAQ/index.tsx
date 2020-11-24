import React, { ReactChild } from 'react'
import Contact from './Contact'
import FAQSidebar from '../../Layout/SideBar/FAQSidebar'
import InputSearch from '../News/InputSearch'

type Props = {
  children?: ReactChild
  questions?: {}
  title?: string
  categories?: any
}
export default function FAQ(props: Props): JSX.Element {
  const categories = [
    { href: "/account", title:"Câu hỏi về tài khoản"},
    { href: "/checkout", title:"Câu hỏi về thanh toán"},
    { href: "/account", title:"Câu hỏi về vận chuyển"},
    { href: "/account", title:"Câu hỏi về đổi trả và hoàn tiền"},
    { href: "/account", title:"Câu hỏi về đơn hàng và đặt hàng"},
    { href: "/account", title:"Câu hỏi về tài khoản"}
  ]

  return (
    <>
      <div className="container help">
        <div className="row">
          <div className="col-12">
            <div className="wrapper">
              <div className="mb-3 mt-3">
                <InputSearch placeholder="Search..." keySearch={(x) => console.log(x)} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-9 col-left__divider order-lg-2">
            <div className="wrapper">
              <h3 className="news__title">{props.title}</h3>
              {props.children}
            </div>
          </div>

          <div className="col-sm-12 col-lg-3 order-lg-1">
            <div className="wrapper mb-5">
              <FAQSidebar categories={categories} />
            </div>
          </div>
        </div>
      </div>

      <Contact />
    </>
  )
}
