import React from 'react'
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
