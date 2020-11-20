import React from 'react';
import { BestSelling } from './BestSelling';
import { Customer } from './Customer';
import { DealOfTheDay } from './DealOfTheDay';
import { FlashSale } from './FlashSale';
import { Login } from './Login';
import { NewProducts } from './NewProducts';
import { Partner } from './Partner';
import { Promotion } from './Promotion';
import { Question } from './Question';
import { Slider } from './Slider';
import { Social } from './Social';
import { Strength } from './Strength';

const Home: React.FC = () => {
  return (
    <div>
      <Slider />

      <DealOfTheDay/>

      <BestSelling />

      {/* <FlashSale /> */}

      <NewProducts />

      <Promotion />

      <Strength />

      <Login />

      <Question />

      <Partner />

      <Customer />

      <Social />
    </div>
  );
};

export default Home;
