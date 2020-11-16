import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import {
  GET_PRODUCTS_BY_INGREDIENT,
  GetProductsByIngredientData,
  GetProductsByIngredientVars
} from 'src/graphql/product/getProductsByIngredient.query';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import { ProductsContainer } from '../../components/Modules/Home/ProductsContainer';
import Tab from '../../components/Modules/ProductDetail/ProductInformation/Tab';
import { ProductsCarousel } from '../../components/Modules/ProductsCarousel';

const tabContent = { thongTinChung: 'abc' };

const IngredientDetail = (): JSX.Element => {
  const router = useRouter();

  console.log('Ingredient ID:', router.query.slug[0]);

  const { data } = useQuery<GetProductsByIngredientData, GetProductsByIngredientVars>(
    GET_PRODUCTS_BY_INGREDIENT,
    {
      variables: {
        page: 1,
        pageSize: 20,
        ingredientId: router.query.slug[0]
      },
      onError: (error) => {
        console.log('Get products by ingredient error:', { error });
        toast.error('Get products by ingredient error:' + error);
      }
    }
  );

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
          <ProductsCarousel products={data?.getProductsByIngredient} />
        </ProductsContainer>
      </PageLayout>
      <Footer />
    </>
  );
};

export default IngredientDetail;
