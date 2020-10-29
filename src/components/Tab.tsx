import React from 'react'

export default function Tab() {
  return (
    <div className="col-12 col-sm-9 product__details">
      <div className="nav tab no-scrollbar">
        <div className="tab__item active" data-toggle="description">
          Thông tin chung
        </div>
        <div className="tab__item" data-toggle="uses">
          Chỉ định
        </div>
        <div className="tab__item" data-toggle="tab">
          Liều lượng - Cách dùng
        </div>
        <div className="tab__item" data-toggle="tab">
          Chống chỉ định
        </div>
        <div className="tab__item" data-toggle="tab">
          Tương tác thuốc
        </div>
        <div className="tab__item" data-toggle="tab">
          Bảo quản
        </div>
        <div className="tab__item" data-toggle="tab">
          Quá liều
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="description">
          Đang cập nhật...
        </div>
        <div className="tab-pane fade" id="uses">
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
        </div>
      </div>
    </div>
  )
}
