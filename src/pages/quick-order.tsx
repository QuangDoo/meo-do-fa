import React from 'react'
import Layout from '../components/Layout/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import { Nav } from '../components/Nav'

function QuickOrder() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <h1>PromotionCode Component here !</h1>
      </Layout>
      <Footer />
    </>
  )
}

export default QuickOrder
