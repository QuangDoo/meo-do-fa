import Link from 'next/link';
import React from 'react';
import Tab from 'src/components/Tab/Tab';

// import Tab from '../../../Tab/Tab';

type Display_name = {
  name: string;
  id: number;
  amount: string;
};

type PropsType = {
  manufacturers: Display_name;
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
    <div className="ml-3 mt-3 ">
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
                    <Link href={`/ingredients/${item.id}`}>
                      <a>{item.name}</a>
                    </Link>
                  </td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Tab
          info={props.info}
          indication={props.indication}
          contraindication={props.contraindication}
          direction={props.direction}
          interaction={props.interaction}
          preservation={props.preservation}
          overdose={props.overdose}
          labelInfo="Thông tin chung"
          labelIndication="Chỉ định"
          labelContraindion="Chống chỉ định"
          labelDirection="Hướng dẫn sử dụng"
          labelInteraction="Tương tác thuốc"
          labelPreservation="Bảo quản"
          labelOverdose="Quá liều"
          labelPharmacodynamics="Dược lực học"
          labelPharmacokinetics="Dược động học"
        />
      </div>
    </div>
  );
};
export default ProducerInformation;
