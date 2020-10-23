import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Head from '../../components/Head'
import { Nav } from '../../components/Nav'
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail'
import withApollo from '../../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { GET_PRODUCT } from '../../graphql/product/product.query'
import { useRouter } from 'next/router'


function ProductDetail() {
  const [product, setProduct] = useState({})
  const router = useRouter()
  const { productId } = router.query
  console.log('productId', productId)
  const { data: dataProduct, loading: loadingProduct, error: errorProduct } = useQuery(
    GET_PRODUCT,
    {
      variables: {
        id: productId,
      },
    }
  )
  useEffect(() => {
    if (dataProduct) {
      setProduct(dataProduct)
    }
  }, [dataProduct])
  console.log('errorProduct', errorProduct)


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

export default withApollo({ ssr: true })(ProductDetail)
