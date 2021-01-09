import React from 'react';
import { CartProvider } from 'src/contexts/Cart';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';

import getToken from './getToken';
import protectRoute from './protectRoute';

type Options = {
  protected?: boolean;
};

export default function withToken(Component, options: Options = {}) {
  const withToken = (props) => {
    return (
      <TokenContext.Provider value={props.token}>
        <UserProvider>
          <CartProvider>
            <Component {...props} />
          </CartProvider>
        </UserProvider>
      </TokenContext.Provider>
    );
  };

  withToken.getInitialProps = async (ctx) => {
    options.protected && protectRoute(ctx);

    return { token: getToken(ctx), ...(await Component.getInitialProps?.(ctx)) };
  };

  return withToken;
}
