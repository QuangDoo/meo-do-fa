import React from 'react'

import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Head from '../components/Head'
import { Nav } from '../components/Nav'

export const HomeContainer = styled.div``

export const StyledHomeBody = styled.div`
  display: grid;
  justify-content: center;
  position: relative;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-gap: 10px;
`

function Home() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <StyledHomeBody>hello</StyledHomeBody>
      </Layout>
      <Footer />
    </>
  )
}

export default Home
