import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import 'src/assets/css/icoFont.scss';
import 'src/assets/scss/custom-styles.scss';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import { useEffect } from 'react';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CartProvider } from 'src/contexts/Cart';
import { ModalControlProvider } from 'src/contexts/ModalControl';
import { UserProvider } from 'src/contexts/User';
import { muiTheme } from 'src/theme';

import { appWithTranslation } from '../../i18n';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <UserProvider>
        <CartProvider>
          <ModalControlProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </ModalControlProvider>
        </CartProvider>
      </UserProvider>
    </MuiThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  return { ...(await App.getInitialProps(appContext)) };
};

export default appWithTranslation(MyApp);
