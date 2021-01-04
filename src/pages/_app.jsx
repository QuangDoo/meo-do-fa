import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import 'src/assets/css/icoFont.scss';
import 'src/assets/scss/custom-styles.scss';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import ServerCookies from 'cookies';
import ClientCookies from 'js-cookie';
import App from 'next/app';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CartProvider } from 'src/contexts/Cart';
import { ModalControlProvider } from 'src/contexts/ModalControl';
import { UserProvider } from 'src/contexts/User';
import { muiTheme, theme } from 'src/theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { appWithTranslation } from '../../i18n';

const MyApp = ({ Component, pageProps }) => {
  return (
    <StyledThemeProvider theme={theme}>
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
    </StyledThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  return { ...(await App.getInitialProps(appContext)) };
};

export default appWithTranslation(MyApp);
