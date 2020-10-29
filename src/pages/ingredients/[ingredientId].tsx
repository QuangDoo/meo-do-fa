import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'

export default function IngredientDetail(props) {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <div>Component chi tiet hoạt chất ở đây</div>
      </Layout>
      <Footer />
    </>
  )
}
