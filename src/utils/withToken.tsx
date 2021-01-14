import React from 'react';
import { CartProvider } from 'src/contexts/Cart';
import { TokenContext } from 'src/contexts/Token';
import { NotifyProvider } from 'src/contexts/useNotifyProvider';
import { UserProvider } from 'src/contexts/User';

import getToken from './getToken';
import protectRoute from './protectRoute';
import withApollo from './withApollo';

type Options = {
  ssr?: boolean;
  isProtected?: boolean;
};

// export default function withToken(Component, options: Options = {}) {
//   const { ssr = false, isProtected = false } = options;

//   const withToken = (props) => {
//     return (
//       <TokenContext.Provider value={props.token}>
//         <UserProvider>
//           <CartProvider>
//             <Component {...props} />
//           </CartProvider>
//         </UserProvider>
//       </TokenContext.Provider>
//     );
//   };

//   withToken.getInitialProps = async (ctx) => {
//     isProtected && protectRoute(ctx);

//     return { token: getToken(ctx), ...(await Component.getInitialProps?.(ctx)) };
//   };

//   // return withToken;
//   return withApollo({ ssr })(withToken);
// }

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

      return { token: getToken(ctx), ...(await Component.getInitialProps?.(ctx)) };
    };

    return withApollo({ ssr })(withToken);
  };
}
