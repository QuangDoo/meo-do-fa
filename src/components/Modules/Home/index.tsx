import React from 'react';
import withApollo from 'src/utils/withApollo';

import { BestSelling } from './BestSelling';
import { Customer } from './Customer';
import { DealsOfTheDay } from './DealsOfTheDay';
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

      <DealsOfTheDay />

      <BestSelling />

      <NewProducts />

      <Promotion />

      <Strength />

      <Login />

      <Question />

      <Partner />

      {/* <Customer /> */}

      {/* <Social /> */}
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
