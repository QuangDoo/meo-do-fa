import React from 'react';
import { useCart } from 'src/contexts/Cart';
import { useToken } from 'src/contexts/Token';
import { useUser } from 'src/contexts/User';

import LoadingBackdrop from '../Layout/LoadingBackdrop';

export default function GlobalLoadingBackdrop() {
  const { loading: gettingCart } = useCart();

  const { loading: gettingUser } = useUser();

  const token = useToken();

  return token ? <LoadingBackdrop open={gettingCart || gettingUser} /> : null;
}
