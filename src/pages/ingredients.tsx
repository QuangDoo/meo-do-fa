import React from 'react'
import Layout from '../components/Layout/Layout'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import { Nav } from '../components/Nav'

function Ingredients() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <h1>Ingredients Component here !</h1>
      </Layout>
      <Footer />
    </>
  )
}

export default Ingredients
