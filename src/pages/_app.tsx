import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import 'src/assets/css/icoFont.scss';
import 'src/assets/scss/custom-styles.scss';

import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import { useEffect } from 'react';
import ToastContainer from 'src/components/Layout/ToastContainer';
import { CartProvider } from 'src/contexts/Cart';
import { ModalControlProvider } from 'src/contexts/ModalControl';
import { TokenContext } from 'src/contexts/Token';
import { UserProvider } from 'src/contexts/User';
import { muiTheme } from 'src/theme';

import { appWithTranslation } from '../../i18n';

const MyApp = ({ Component, pageProps, token }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>
      <ThemeProvider theme={muiTheme}>
        <UserProvider>
          <CartProvider>
            <ModalControlProvider>
              <Component {...pageProps} />

              <ToastContainer />
            </ModalControlProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </TokenContext.Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  return { ...(await App.getInitialProps(appContext)), token: appContext.ctx.req.cookies.token };
};

export default appWithTranslation(MyApp);
