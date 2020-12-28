import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import 'src/assets/css/icoFont.scss';
import 'src/assets/scss/custom-styles.scss';

import App from 'next/app';
import Head from 'next/head';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CartProvider } from 'src/contexts/Cart';
import { CityProvider } from 'src/contexts/City';
import { CountCartProvider } from 'src/contexts/CountCart';
import { ModalControlProvider } from 'src/contexts/ModalControl';
import { UserProvider } from 'src/contexts/User';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

import { appWithTranslation } from '../../i18n';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CountCartProvider>
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
      </CountCartProvider>
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
