import React from 'react'
import 'antd/dist/antd.css'
import '../assets/scss/custom-styles.scss'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
