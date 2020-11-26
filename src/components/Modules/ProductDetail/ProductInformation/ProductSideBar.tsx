import Link from 'next/link';
import React from 'react';

import NewsBanner from '../../News/NewsBanner';

const imgUrl = 'https://news.thuocsi.vn/wp-content/uploads/2020/05/160x600.png';
const links = [
  { href: '', title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị' },
  { href: '', title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị' },
  { href: '', title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị' }
];

function ProductSidebar(): JSX.Element {
  return (
    <>
      <table className="table table-bordered table-sm ">
        <tbody>
          <tr>
            <th className="text-center py-2">CAM KẾT</th>
          </tr>
          <tr>
            <td>
              {links.map((item, index) => {
                return (
                  <>
                    <Link href="/">
                      <a className="notification__dropdown-item unread bg-white">
                        <div className="notification__icon">
                          <i className="status-icon status-notice"></i>
                        </div>
                        <div className="notification__content">
                          <small className="notification__content-title">{item.title}</small>
                        </div>
                      </a>
                    </Link>
                  </>
                );
              })}
            </td>
          </tr>
        </tbody>
        <div className="card-footer text-muted text-center">Xem thêm</div>
      </table>

      {/* <NewsBanner bannerImgUrl={imgUrl} title="Trải nghiệm MEDOFA"></NewsBanner> */}
    </>
  );
}

export default ProductSidebar;
