import React from 'react';

import AnotherPromoCodes from './AnotherPromoCodes';
import PromoCodes from './PromoCodes';
import SpecialPromoCodes from './SpecialPromoCodes';

export default function index() {
  return (
    <>
      <PromoCodes />

      <SpecialPromoCodes />

      <AnotherPromoCodes />
    </>
  );
}
