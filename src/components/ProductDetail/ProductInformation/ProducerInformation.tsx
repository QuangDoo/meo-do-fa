import React from 'react';

import Tab from '../../Tab/Tab';

const ProducerInformation = (props) => {
  return (
    <div className="row">
      <div className="col-12 col-sm-3">
        <div className="mb-3">
          <div className="product__info-label">Nhà sản xuất</div>
          <div className="text-capitalize">
            <a href="/">Công ty Cổ phần Dược phẩm OPC</a>
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
      <Tab />
    </div>
  );
};
export default ProducerInformation;
