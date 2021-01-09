import React from 'react';
import { useCart } from 'src/contexts/Cart';
import { useUser } from 'src/contexts/User';

import LoadingBackdrop from '../Layout/LoadingBackdrop';

export default function GlobalLoadingBackdrop() {
  const { loading: gettingCart } = useCart();

  const { loading: gettingUser } = useUser();

  return <LoadingBackdrop open={gettingCart || gettingUser} />;
}
