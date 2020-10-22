import React from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'
import ProductsPage from '../../components/Products'
import { withTranslation } from '../../../i18n'

function Products() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <ProductsPage />
      <Footer />
    </>
  )
}

export default withTranslation('')(Products)
