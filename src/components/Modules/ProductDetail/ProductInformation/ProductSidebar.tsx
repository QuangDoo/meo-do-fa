import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';

const links = [
  {
    itemImgUrl: '/assets/images/shopping-cart.png',
    title: 'Cam kết giao hàng nhanh đúng thời điểm, đúng hàng đã đặt'
  },
  {
    itemImgUrl: '/assets/images/return.png',
    title: 'Cam kết đổi trả hàng miễn phí'
  },
  {
    itemImgUrl: '/assets/images/refund.png',
    title: 'Cam kết nguồn gốc sản phẩm chất lượng, uy tín. số hotline 1900232436'
  },
  {
    itemImgUrl: '/assets/images/hotline.png',
    title: 'Số hotline 1900232436'
  }
];

function ProductSidebar(): JSX.Element {
  const { t } = useTranslation(['productDetail']);

  return (
    <>
      <table className="table table-bordered table-sm ">
        <tbody>
          <tr>
            <th className="text-center py-2">{t('commitment')}</th>
          </tr>
          <tr>
            <td>
              {links.map((item) => {
                return (
                  <>
                    <Link href="/">
                      <div className="pledge ">
                        <img className="pledge_item" src={item.itemImgUrl} alt=""></img>
                        <div className="pledge_content px-1">{item.title}</div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>

      {/* <NewsBanner itemImgUrl={imgUrl} title="Trải nghiệm MEDOFA"></NewsBanner> */}
    </>
  );
}

export default ProductSidebar;
