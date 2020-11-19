import React from 'react';
import Slider from 'react-slick';

import CustomerCard from './CustomerCard';

// Example testimonial object
const exampleTestimonial = {
  customerName: 'Anh Trường',
  customerLocation: 'Nhà thuốc tây số 2 - Vĩnh Long',
  customerComment: 'Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.'
};

// Example testimonials array
const testimonials = [...new Array(5)].map(() => ({ ...exampleTestimonial }));

const Customer = (): JSX.Element => {
  return (
    <section className="py-5 home__testimonials">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="text-primary">Khách hàng nói gì về medofa</h2>
          </div>
          <div className="col-12">
            <Slider
              arrows={false}
              slidesToShow={2}
              slidesToScroll={1}
              autoplay
              dots
              dotsClass="slick__dots slick-dots"
              className="slick-dotted">
              {testimonials.map((testimonial, index) => (
                <CustomerCard key={index} {...testimonial} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customer;
