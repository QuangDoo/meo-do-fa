import React from 'react'

type Props = {}

const ProducerInformation = (props: Props) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-3">
        <div className="mb-3">
          <div className="product__info-label">Nhà sản xuất</div>
          <div className="text-capitalize">
            <a href="">Công ty Cổ phần Dược phẩm OPC</a>
          </div>
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nước sản xuất</div>
          <div className="text-capitalize" />
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nhóm thuốc</div>
          <a className="text-capitalize" href="/categories/thuc-pham-chuc-nang">
            thực phẩm chức năng
          </a>
        </div>
        <div className="mb-3">
          <div className="product__info-label">Thành phần</div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>Tên</th>
                <th>Hàm lượng</th>
              </tr>
              <tr>
                <td>
                  <a href="/ingredients/thuc-dia">Thục địa</a>
                </td>
                <td>262.5mg</td>
              </tr>
              <tr>
                <td>
                  <a href="/ingredients/hoai-son">Hoài sơn</a>
                </td>
                <td>189.82mg</td>
              </tr>
              <tr>
                <td>
                  <a href="/ingredients/son-thu">sơn thù</a>
                </td>
                <td>220mg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
    </div>
  )
}
export default ProducerInformation
