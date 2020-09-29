import React from 'react'
import styled from 'styled-components'

const StyledPartnerList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledPartner = styled.div`
  width: 180px;
  margin: 0 20px;
`

const partnerImgStyles = {
  width: '100%'
}

const Parner = () => {
  return (
    <section className="bg-white py-5 home__partner">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <h2 className="text-primary">Đối tác của thuocsi.vn</h2>
          </div>
          <div className="col-12" data-controller="sliders">
            <StyledPartnerList>
              <StyledPartner>
                <img style={partnerImgStyles} src="assets/images/partner1.jpg" />
              </StyledPartner>
              <StyledPartner>
                <img style={partnerImgStyles} src="assets/images/partner2.jpg" />
              </StyledPartner>
              <StyledPartner>
                <img style={partnerImgStyles} src="assets/images/partner3.jpg" />
              </StyledPartner>
            </StyledPartnerList>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Parner
