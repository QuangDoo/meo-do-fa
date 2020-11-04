import React from 'react';

import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import PageLayout from '../components/layout/PageLayout';
import LoginForm from '../components/Login/LoginForm';
import { Nav } from '../components/Nav';
function Login(): JSX.Element {
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <LoginForm />
      </PageLayout>

      <Footer />
    </>
  );
}
export default Login;
