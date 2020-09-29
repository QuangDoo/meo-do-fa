import React from 'react'
import 'antd/dist/antd.css'
import '../assets/scss/custom-styles.scss'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
