import React from 'react'
import Slider from 'react-slick'
import PartnerImg from './PartnerImg'

const examplePartners = [
  'assets/images/partner1.jpg',
  'assets/images/partner2.jpg',
  'assets/images/partner3.jpg',
  'assets/images/partner1.jpg',
  'assets/images/partner2.jpg',
  'assets/images/partner3.jpg',
  'assets/images/partner1.jpg',
  'assets/images/partner2.jpg',
  'assets/images/partner3.jpg',
]

const Parner = () => {
  return (
    <section className="bg-white py-5 home__partner">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <h2 className="text-primary">Đối tác của thuocsi.vn</h2>
          </div>
          <div className="col-12">
            <Slider slidesToShow={6} slidesToScroll={3} arrows={false}>
              {examplePartners.map((url, index) => (
                <PartnerImg key={index} imgUrl={url} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Parner
