import React from 'react';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import Tab from '../../components/Layout/Tab';
import { ProductsContainer } from '../../components/Modules/Home/ProductsContainer';
import { ProductsCarousel } from '../../components/Modules/ProductsCarousel';
import { mockProducts } from '../../mockData/mockProducts';

const tabContent = { thongTinChung: 'abc' };

const IngredientDetail = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
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
      </PageLayout>
      <Footer />
    </>
  );
};

export default IngredientDetail;
