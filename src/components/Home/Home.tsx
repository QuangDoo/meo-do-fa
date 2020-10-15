import React from 'react'
import { productExample } from '../Products/ProductList/ProductList'
import { ProductsCarousel } from '../ProductsCarousel'
import { BestSelling } from './BestSelling'
import { Customer } from './Customer'
import { Login } from './Login'
import { Partner } from './Partner'
import { Question } from './Question'
import { Slider } from './Slider'
import { Social } from './Social'
import { Strength } from './Strength'

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <BestSelling />
      <Strength />
      <Login />
      <Question />
      <Partner />
      <Customer />
      <Social />
    </div>
  )
}

export default Home
