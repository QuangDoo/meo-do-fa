import React from 'react'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import { Header } from '../components/Header'
import { HomePage } from '../components/Home'
import { Nav } from '../components/Nav'
import withApollo from '../utils/withApollo'


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

export default withApollo({ ssr: true })(Home)
