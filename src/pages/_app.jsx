import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/custom-styles.scss';

import App from 'next/app';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { appWithTranslation } from '../../i18n';
import ToastContainer from '../components/Layout/ToastContainer';
import { CategoriesProvider } from '../contexts/Categories';
import { ModalControlProvider } from '../contexts/ModalControl';
import { theme } from '../theme';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ModalControlProvider>
        <CategoriesProvider>
          <Component {...pageProps} />
        </CategoriesProvider>

        <ToastContainer />
      </ModalControlProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
