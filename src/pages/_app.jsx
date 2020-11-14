import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/custom-styles.scss';

import { appWithTranslation } from 'i18n';
import App from 'next/app';
import React, { useEffect } from 'react';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CategoriesProvider } from 'src/contexts/Categories';
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
      <CityProvider>
        <ModalControlProvider>
          <CategoriesProvider>
            <Component {...pageProps} />
          </CategoriesProvider>
          <ToastContainer />
        </ModalControlProvider>
      </CityProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
