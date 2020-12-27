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
      <link href="https://medofa.com/" rel="canonical" />
      <meta
        content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        name="description"
      />
      <meta content="index, follow" name="robots" />
      <meta content="website" property="og:type" />
      <meta content="vi_VN" property="og:locale" />
      <meta content="Medofa - Medicine, online, fast" property="og:title" />
      <meta
        content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
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
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-95PXEWD1KY"></script>
      {props.children}
    </HeadNext>
  );
}
