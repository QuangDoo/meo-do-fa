import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail'

function ProductDetail() {
  const product = {
    imageUrl: 'https://images.thuocsi.vn/qefH9wdrY1UZzaa9MWJ9pJoi',
    titleImage: 'Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1',
    altImage: 'Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1',
    name: 'Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v)',
    description: 'Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v)',
    views: 1,
    totalOrders: 10,
    producer: 'Công Ty Cổ Phần Dược Phẩm OPC',
    category: 'Thực Phẩm Chức Năng',
    ingredients: [
      { name: 'Thục đại', content: 265 },
      { name: 'Hoài sơn', content: 265 },
      { name: 'Sơn thù', content: 265 },
    ],
  }
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <ProductDetailComponent {...product} />
      </Layout>
      <Footer />
    </>
  )
}

export default ProductDetail
