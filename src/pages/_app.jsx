import 'react-toastify/dist/ReactToastify.css';
import 'src/assets/scss/custom-styles.scss';

import { appWithTranslation } from 'i18n';
import App from 'next/app';
import React, { useEffect } from 'react';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CartProvider } from 'src/contexts/Cart';
import { CityProvider } from 'src/contexts/City';
import { ModalControlProvider } from 'src/contexts/ModalControl';
import { UserProvider } from 'src/contexts/User';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <CityProvider>
            <ModalControlProvider>
              <Component {...pageProps} />

              <ToastContainer />
            </ModalControlProvider>
          </CityProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
