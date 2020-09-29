import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'

const StyledBanner = styled.div`
  width: 100%;
`

const StyledSlider = styled.div`
  width: 100%;
  padding: 0;
`

const imgStyles = {
  margin: '0 auto',
  height: 500,
}

const Slider: React.FC = () => {
  return (
    <StyledSlider>
      <Carousel autoplay>
        <StyledBanner>
          <img style={imgStyles} src="assets/images/slider1.png" />
        </StyledBanner>
        <StyledBanner>
          <img style={imgStyles} src="assets/images/slider2.png" />
        </StyledBanner>
        <StyledBanner>
          <img style={imgStyles} src="assets/images/slider3.png" />
        </StyledBanner>
      </Carousel>
    </StyledSlider>
  )
}

export default Slider
