import React from 'react'
import Layout from '../components/Layout/Layout'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import Head from '../components/Head'
import { Nav } from '../components/Nav'
import { ManufacturesComponent } from '../components/Manufactures'

function Manufactures() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <ManufacturesComponent />
      </Layout>
      <Footer />
    </>
  )
}

export default Manufactures
