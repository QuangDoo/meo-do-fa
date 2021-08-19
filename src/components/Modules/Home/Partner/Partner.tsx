import { useTranslation } from 'i18n';
import React from 'react';
import Slider from 'react-slick';

import PartnerImg from './PartnerImg';

const examplePartners = [
  'assets/images/LogoEzin_700x350px.png',
  'assets/images/imexpharm.png',
  'assets/images/hasan.png',
  'assets/images/dhg.jpeg',
  'assets/images/DuocTraVinh.png',
  'assets/images/hmdpharma.png',
  'assets/images/daiuy.png',
  'assets/images/DuocMinhHai.png',
  'assets/images/hdpharma.png',
  'assets/images/thainakorn.jpeg',
  'assets/images/stella.png',
  'assets/images/spharm.jpeg',
  'assets/images/29.png',
  'assets/images/DuocVietHa.png',
  'assets/images/hadiphar.jpeg',
  'assets/images/davipharm.png',
  'assets/images/PhucVinh_Logo-01.png',
  'assets/images/SaoThaiDuong.jpeg',
  'assets/images/DuocTamHanh.jpeg',
  'assets/images/nic.jpeg',
  'assets/images/DuocTamBinh.png',
  'assets/images/logo-reliv-helthcare-01.png',
  'assets/images/stada.jpeg',
  'assets/images/stadipharm.png'
];
type ArrowButtonProps = {
  onClick?: () => void;
  type?: 'prev' | 'next';
};

const ArrowButton = ({ onClick, type = 'prev' }: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`slide-arrow ${type}-arrow slick-arrow`}
      aria-disabled="true">
      <i className={`fas fa-chevron-${type === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};
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
            <Slider
              slidesToShow={6}
              slidesToScroll={3}
              arrows={true}
              prevArrow={<ArrowButton />}
              nextArrow={<ArrowButton type="next" />}
              className="m-0 p-0 slider_products"
              responsive={[
                {
                  breakpoint: 1105,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 890,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 675,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 460,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                }
              ]}>
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
