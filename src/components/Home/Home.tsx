import React from 'react'
import { productExample } from '../Products/ProductList/ProductList'
import { ProductsCarousel } from '../ProductsCarousel'
import { Customer } from './Customer'
import { Login } from './Login'
import { Partner } from './Partner'
import { Question } from './Question'
import { Slider } from './Slider'
import { Social } from './Social'
import { Strength } from './Strength'

const products = [...new Array(10)].map(() => ({ ...productExample }))

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <ProductsCarousel products={products} />
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
