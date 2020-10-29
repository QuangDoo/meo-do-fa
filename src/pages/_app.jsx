import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/scss/custom-styles.scss'

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { appWithTranslation } from '../../i18n'
import { theme } from '../theme'
import App from 'next/app'
import ToastContainer from '../components/ToastContainer'
import { ModalControlProvider } from '../contexts/ModalControl'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalControlProvider>
        <Component {...pageProps} />

        <ToastContainer />
      </ModalControlProvider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) })

export default appWithTranslation(MyApp)
