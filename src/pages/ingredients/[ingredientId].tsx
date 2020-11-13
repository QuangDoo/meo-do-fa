import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { GET_INGREDIENT } from 'src/graphql/ingredient/ingredient.query';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import PageLayout from '../../components/Layout/PageLayout';
import { ProductsContainer } from '../../components/Modules/Home/ProductsContainer';
import Tab from '../../components/Modules/ProductDetail/ProductInformation/Tab';
import { ProductsCarousel } from '../../components/Modules/ProductsCarousel';
import { mockProducts } from '../../mockData/mockProducts';

type TypeIngredient = {
  id: string;
  name: string;
  slug: string;
};
const tabContent = { thongTinChung: 'abc' };

function IngredientDetail(props:TypeIngredient): JSX.Element {
  const [Ingredient, setIngredient] = useState<TypeIngredient[]>([]);
  const { data: dataIngredient, loading: loadingIngredient, error: errorIngredient } = useQuery(
    GET_INGREDIENT,
    {
      variables: { page: 1, pageSize: 100 }
    }
  );

  useEffect(() => {
    if (!dataIngredient) return;
    setIngredient(dataIngredient.getIngredient);
  }, [dataIngredient]);
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
              <h1 className="mb-3">{dataIngredient?.getIngredient.name}Acetazolamid</h1>
            </div> 
            <Tab {...(dataIngredient?.getIngredient || [])} />
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

export default withApollo({ ssr: true })(IngredientDetail);
