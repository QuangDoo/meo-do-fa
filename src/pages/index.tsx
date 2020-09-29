import React from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HomePage } from '../components/Home'
import Head from '../components/Head'
import { Nav } from '../components/Nav'

function Home() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
