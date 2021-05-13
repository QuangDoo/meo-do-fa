import React from 'react';
import { CartProvider } from 'src/contexts/Cart';
import { NotifyProvider } from 'src/contexts/Notify';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';

import getToken from './getToken';
import protectRoute from './protectRoute';
import withApollo from './withApollo';

type Options = {
  ssr?: boolean;
  isProtected?: boolean;
};

export default function withToken({ ssr = false, isProtected = false }: Options) {
  return (Component) => {
    const withToken = (props) => {
      return (
        <TokenContext.Provider value={props.token}>
          <NotifyProvider>
            <UserProvider>
              <CartProvider>
                <Component {...props} />
              </CartProvider>
            </UserProvider>
          </NotifyProvider>
        </TokenContext.Provider>
      );
    };

    withToken.getInitialProps = async (ctx) => {
      isProtected && protectRoute(ctx);

      const token = getToken(ctx);

      return { token, ...(await Component.getInitialProps?.(ctx)) };
    };

    return withApollo({ ssr })(withToken);
  };
}
