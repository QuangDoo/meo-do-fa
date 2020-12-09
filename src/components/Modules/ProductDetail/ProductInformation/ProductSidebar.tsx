import { useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';

import NewsBanner from '../../News/NewsBanner';

type Props = {
  title: string;
  itemImgUrl: string;
  links?: any;
};

function ProductSidebar(props: Props): JSX.Element {
  const { t } = useTranslation(['productDetail']);
  const imgUrl = 'https://news.thuocsi.vn/wp-content/uploads/2020/05/160x600.png';
  const links = [
    {
      itemImgUrl: 'https://hasaki.vn/images/graphics/img_quality_3.png',
      title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị'
    },
    {
      itemImgUrl: 'https://hasaki.vn/images/graphics/img_quality_4.png',
      title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị'
    },
    {
      itemImgUrl: 'https://hasaki.vn/images/graphics/img_quality_3.png',
      title: 'Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị'
    }
  ];

  return (
    <>
      <table className="table table-bordered table-sm ">
        <tbody>
          <tr>
            <th className="text-center py-2">{t('commitment')}</th>
          </tr>
          <tr>
            <td>
              {links.map((item, index) => {
                return (
                  <>
                    <Link href="/">
                      <a className="pledge ">
                        <img className="pledge_item" src={item.itemImgUrl} alt=""></img>
                        <div className="pledge_content">
                          <p className="px-1">{item.title}</p>
                        </div>
                      </a>
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
