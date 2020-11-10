import { default as HeadNext } from 'next/head';
import React, { useEffect } from 'react';
// const tawkTo = require('tawkto-react')
import tawkTo from 'tawkto-react';
export default function Head(props) {
  const tawkToPropertyId = '5f97dbddaca01a16883609eb';
  useEffect(() => {
    tawkTo(tawkToPropertyId);
  }, []);
  return (
    <HeadNext>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Medofa</title>
      <link href="https://medofa.com/" rel="canonical" />
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
        content="https://assets.medofa.com/assets/defaults/quay-thuoc-share-fb-aeb70c68fa0a416a0f21d72004dade8eafb7275b7ccb723a046c108c9aa482b9.jpg"
        property="og:image"
      />
      <meta
        content="https://assets.medofa.com/assets/defaults/quay-thuoc-share-fb-aeb70c68fa0a416a0f21d72004dade8eafb7275b7ccb723a046c108c9aa482b9.jpg"
        property="og:image:secure_url"
      />
      <meta content="image/jpeg" property="og:image:type" />
      <meta content="600" property="og:image:width" />
      <meta content="399" property="og:image:height" />
      <meta content="medofa.com" property="og:image:alt" />
      <meta content="https://medofa.com/" property="og:url" />
      <meta content="medofa.com" property="og:site_name" />
      <meta name="csrf-param" content="authenticity_token" />

      {props.children}
    </HeadNext>
  );
}
