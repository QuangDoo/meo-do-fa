import { Carousel } from 'antd'
import React from 'react'
import styled from 'styled-components'

const StyledCustomer = styled.div`
  width: 50%;
`

const StyledCustomerBlock = styled.div`
  display: flex !important;
`

const Customer = () => {
  return (
    <section className="py-5 home__testimonials">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="text-primary">Khách hàng nói gì về thuocsi</h2>
          </div>
          <div className="col-12">
            <Carousel autoplay className="home-customer-carousel">
              <StyledCustomerBlock>
                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>

                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>
              </StyledCustomerBlock>

              <StyledCustomerBlock>
                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>

                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>
              </StyledCustomerBlock>

              <StyledCustomerBlock>
                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>

                <StyledCustomer>
                  <div className="testimonial d-flex mb-3">
                    <img
                      alt="Anh Trường"
                      className="img-fluid lozad testimonial__avatar"
                      src="assets/images/customer1.jpg"
                    />
                    <div className="testimonial__content px-3">
                      <div className="testimonial__customer">Anh Trường</div>
                      <div className="testimonial__title">Nhà thuốc tây số 2 - Vĩnh Long</div>
                      <div className="testimonial__comment quote">
                        Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.
                      </div>
                    </div>
                  </div>
                </StyledCustomer>
              </StyledCustomerBlock>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Customer
