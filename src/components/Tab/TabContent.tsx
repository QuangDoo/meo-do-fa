import React from 'react'
type PropsType = {
  data: string[]
}
export default function TabContent(props: PropsType) {
  
  return (
    <div className="tab-content">
      {props.data.map((item, index) => {
        return (
          <div className={index && `tab-pane fade active show`} id="description" key={index}>
            {item ? item : 'Dang cap nhat'}
          </div>
        )
      })}
    </div>
  )
}

{
  /* <div className="tab-pane fade" id="uses">
     Đang cập nhật...
   </div>
   <div className="tab-pane fade" id="direction">
     Đang cập nhật...
   </div>
   <div className="tab-pane fade" id="do_not_use">
     Đang cập nhật...
   </div>
   <div className="tab-pane fade" id="drug_interactions">
     Đang cập nhật...
   </div>
   <div className="tab-pane fade" id="storage">
     Đang cập nhật...
   </div>
   <div className="tab-pane fade" id="overdose">
     Đang cập nhật...
   </div> */
}
