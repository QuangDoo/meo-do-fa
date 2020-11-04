import React from 'react';

import Footer from '../../components/Footer';
import Head from '../../components/Head';
import { Header } from '../../components/Header';
import { ProductsContainer } from '../../components/Home/ProductsContainer';
import Layout from '../../components/Layout/Layout';
import { Nav } from '../../components/Nav';
import { ProductsCarousel } from '../../components/ProductsCarousel';
import Tab from '../../components/Tab/Tab';
import { mockProducts } from '../../mockData/mockProducts';

const tabContent = { thongTinChung: 'abc' };

const IngredientDetail = (): JSX.Element => {
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
          <ProductsCarousel products={mockProducts} />
        </ProductsContainer>
      </Layout>
      <Footer />
    </>
  );
};

export default IngredientDetail;
