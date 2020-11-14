import Link from 'next/link';
import React from 'react';

import Tab from './Tab';

type Display_name = {
  display_name: string;
};

type PropsType = {
  manufacturers: string[];
  categories: Display_name[];
  ingredients: Display_name[];
  info?: string;
  indication?: string;
  contraindication?: string;
  direction?: string;
  interaction?: string;
  preservation?: string;
  overdose?: string;
};

const ProducerInformation = (props: PropsType): JSX.Element => {
  return (
    <div className="row">
      <div className="col-12 col-sm-3">
        <div className="mb-3">
          <div className="product__info-label">Nhà sản xuất</div>
          <div className="text-capitalize">
            <a href="/">
              {props?.manufacturers?.filter((item, index) => {
                if (index === 1) {
                  return item;
                }
              })}
            </a>
          </div>
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nước sản xuất</div>
          <div className="text-capitalize" />
        </div>
        <div className="mb-3">
          <div className="product__info-label">Nhóm thuốc</div>
          {props?.categories?.map((item, index) => {
            return (
              <a className="text-capitalize" href="/categories/thuc-pham-chuc-nang" key={index}>
                {item.display_name}
              </a>
            );
          })}
        </div>
        <div className="mb-3">
          <div className="product__info-label">Thành phần</div>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>Tên</th>
                <th>Hàm lượng</th>
              </tr>
              {props.ingredients?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link href="/ingredients/thuc-dia">
                        <a>{item.display_name}</a>
                      </Link>
                    </td>
                    <td>262.5mg</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Tab
        info={props.info}
        indication={props.indication}
        contraindication={props.contraindication}
        direction={props.direction}
        interaction={props.interaction}
        preservation={props.preservation}
        overdose={props.overdose}
      />
    </div>
  );
};
export default ProducerInformation;
