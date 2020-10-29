import React from 'react'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'
import ProductsPage from '../../components/Products'
import { withTranslation } from '../../../i18n'
import withApollo from '../../utils/withApollo'

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

const WithTranslation = withTranslation('')(Products)

export default withApollo({ ssr: true })(WithTranslation)
