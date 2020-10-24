import React from 'react'
import Footer from '../components/Footer'
import Head from '../components/Head'
import { Header } from '../components/Header'
import Layout from '../components/Layout/Layout'
import LoginForm from '../components/Login/LoginForm'
import { Nav } from '../components/Nav'
function Login() {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <Layout>
        <LoginForm />
      </Layout>

      <Footer />
    </>
  )
}
export default Login
