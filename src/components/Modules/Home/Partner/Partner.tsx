import { useTranslation } from 'i18n';
import React from 'react';
import Slider from 'react-slick';

import PartnerImg from './PartnerImg';

const examplePartners = [
  'assets/images/DuocVietHa.png',
  'assets/images/hadiphar.jpeg',
  'assets/images/logo-reliv-helthcare-01.png',
  'assets/images/nic.jpeg',
  'assets/images/PhucVinh_Logo-01.png',
  'assets/images/SaoThaiDuong.jpeg',
  'assets/images/agimex.jpeg',
  'assets/images/davipharm.png',
  'assets/images/DuocMinhHai.png',
  'assets/images/DuocTamBinh.png',
  'assets/images/DuocTamHanh.jpeg',
  'assets/images/DuocTraVinh.png',
  'assets/images/stada.jpeg',
  'assets/images/stadipharm.png'
];

const Parner = () => {
  const { t } = useTranslation(['partner']);
  return (
    <section className="bg-white py-5 home__partner">
      <div className="container">
        <div>
          <div className="text-center mb-3">
            <h2>{t('partner:partner')}</h2>
          </div>
          <div className="mt-5">
            <Slider slidesToShow={6} slidesToScroll={3} arrows={false}>
              {examplePartners.map((url, index) => (
                <PartnerImg key={index} imgUrl={url} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parner;
