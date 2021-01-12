import { Trans, useTranslation } from 'i18n';
import Link from 'next/link';
import React from 'react';

function ProductSidebar() {
  const { t } = useTranslation(['productDetail']);

  const links = [
    {
      itemImgUrl: '/assets/images/shopping-cart.png',
      title: 'productDetail:commitment_1'
    },
    {
      itemImgUrl: '/assets/images/return.png',
      title: 'productDetail:commitment_2'
    },
    {
      itemImgUrl: '/assets/images/refund.png',
      title: 'productDetail:commitment_3'
    },
    {
      itemImgUrl: '/assets/images/hotline.png',
      title: 'productDetail:commitment_4'
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
              {links.map((item) => {
                return (
                  <>
                    <div>
                      <div className="pledge ">
                        <img className="pledge_item" src={item.itemImgUrl} alt=""></img>
                        <div className="pledge_content px-1">
                          <Trans
                            i18nKey={item.title}
                            components={{
                              a: (
                                <a href="tel:1900232436" className="text-danger">
                                  1900232436
                                </a>
                              )
                            }}
                          />
                        </div>
                        {/* <div className="pledge_content px-1">{item.title}</div> */}
                      </div>
                    </div>
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
