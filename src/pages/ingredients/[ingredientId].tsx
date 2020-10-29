import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'
import Tab from '../../components/Tab/Tab'
import { ProductsContainer } from '../../components/Home/ProductsContainer'
import { ProductsCarousel } from '../../components/ProductsCarousel'
import { exampleProducts } from '../../components/Products'

export default function IngredientDetail(props) {
  const tabContent = { thongTinChung: 'abc' }
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <main className="ingredient container py-3 py-sm-5">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <h1 className="mb-3">Acetazolamid</h1>
            </div>
            <Tab {...tabContent} />
          </div>
        </main>
        <hr />
        <ProductsContainer title="Danh sách các thuốc có Acetazolamid" seeMoreUrl="#">
          <ProductsCarousel products={exampleProducts} />
        </ProductsContainer>
      </Layout>
      <Footer />
    </>
  )
}
