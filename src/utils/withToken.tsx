import React from 'react';
import { CartProvider } from 'src/contexts/Cart';
import { NotifyProvider } from 'src/contexts/Notify';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';
import { GET_CART } from 'src/graphql/cart/getCart';
import { GET_NOTI } from 'src/graphql/notification/notify.query';
import { GET_USER } from 'src/graphql/user/getUser';

import asyncQuery from './asyncQuery';
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

      if (token) {
        await Promise.all([
          // Get user
          asyncQuery({
            ctx,
            query: GET_USER,
            fetchPolicy: 'network-only',
            auth: true
          }),
          // Get cart
          asyncQuery({
            ctx,
            query: GET_CART,
            fetchPolicy: 'network-only',
            auth: true
          }),
          // Get notifications
          asyncQuery({
            ctx,
            query: GET_NOTI,
            variables: {
              page: 1,
              pageSize: 5
            },
            fetchPolicy: 'network-only',
            auth: true
          })
        ]).catch((err) => {
          console.log('Error:', err);
        });
      }

      return { token, ...(await Component.getInitialProps?.(ctx)) };
    };

    return withApollo({ ssr })(withToken);
  };
}
