import { default as HeadNext } from 'next/head';
import React, { useEffect } from 'react';
// const tawkTo = require('tawkto-react')
// import tawkTo from 'tawkto-react';
export default function Head(props) {
  // const tawkToPropertyId = '5f97dbddaca01a16883609eb';
  // useEffect(() => {
  //   tawkTo(tawkToPropertyId);
  // }, []);
  return (
    <HeadNext>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Medofa</title>
      <link href="https://web.medofa.bedigital.vn/" rel="canonical" />
      <meta
        content="Medofa là cổng thông tin hàng đầu giúp nhà thuốc, phòng khám, và bác sĩ tra cứu thuốc tây, hoạt chất, công dụng, giá thuốc, đặt thuốc nhanh và tiết kiệm nhất. Đây là chợ sỉ thuốc tây với đa dạng các loại thuốc từ các công ty dược phẩm tên tuổi và uy tín."
        name="description"
      />
      <meta content="index, follow" name="robots" />
      <meta content="website" property="og:type" />
      <meta content="vi_VN" property="og:locale" />
      <meta content="Tra cứu và đặt thuốc giá sỉ nhanh tại medofa.com" property="og:title" />
      <meta
        content="Medofa là cổng thông tin hàng đầu giúp nhà thuốc, phòng khám, và bác sĩ tra cứu thuốc tây, hoạt chất, công dụng, giá thuốc, đặt thuốc nhanh và tiết kiệm nhất. Đây là chợ sỉ thuốc tây với đa dạng các loại thuốc từ các công ty dược phẩm tên tuổi và uy tín."
        property="og:description"
      />

      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />

      <link rel="manifest" href="/manifest.json" />
      <link
        href="/icons/favicon-16x16-medofa-manifest-20129.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32-medofa-manifest-20129.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="/icons/apple-icon-120x120-medofa-manifest-20129.png"></link>
      <meta name="theme-color" content="#1476fb" />

      {props.children}
    </HeadNext>
  );
}
