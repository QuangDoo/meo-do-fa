import React from 'react'
import CheckoutPage from '../components/Checkout'
import Footer from '../components/Footer'
import Head from '../components/Head'
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>

      <Header />

      <Nav />

      <CheckoutPage />

      <Footer />
    </>
  )
}

export default Checkout
