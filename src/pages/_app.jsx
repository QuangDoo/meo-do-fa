import 'antd/dist/antd.css'
import React from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { ThemeProvider } from 'styled-components'
import { appWithTranslation } from '../../i18n'
import '../assets/scss/custom-styles.scss'
import { theme } from '../theme'
import App from 'next/app'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async (appContext) => ({ ...(await App.getInitialProps(appContext)) })

export default appWithTranslation(MyApp)
