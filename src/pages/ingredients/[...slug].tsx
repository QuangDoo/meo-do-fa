import { useQuery } from '@apollo/react-hooks';
import clsx from 'clsx';
import { withTranslation } from 'i18n';
import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import Tab from 'src/components/Modules/ProductDetail/ProductInformation/Tab';
import {
  GET_INGREDIENT_DETAILS,
  GetIngredientDetailsData,
  GetIngredientDetailsVars
} from 'src/graphql/ingredient/ingredient.query';
import {
  GET_PRODUCTS_BY_INGREDIENT,
  GetProductsByIngredientData,
  GetProductsByIngredientVars
} from 'src/graphql/product/getProductsByIngredient.query';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import { ProductsContainer } from '../../components/Modules/Home/ProductsContainer';
import { ProductsCarousel } from '../../components/Modules/ProductsCarousel';

const tabs = [
  'info',
  'indication',
  'direction',
  'contraindication',
  'interaction',
  'preservation',
  'overdose',
  'pharmacodynamics',
  'pharmacokinetics'
];

const IngredientDetail = ({ t }: WithTranslation): JSX.Element => {
  const router = useRouter();

  const ingredientId = router.query.slug[0];

  const { data: detailsData } = useQuery<GetIngredientDetailsData, GetIngredientDetailsVars>(
    GET_INGREDIENT_DETAILS,
    {
      variables: {
        id: +ingredientId
      }
    }
  );

  const { data: productsData } = useQuery<GetProductsByIngredientData, GetProductsByIngredientVars>(
    GET_PRODUCTS_BY_INGREDIENT,
    {
      variables: {
        page: 1,
        pageSize: 20,
        ingredientId: ingredientId
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

      <main className="ingredient container py-3 py-sm-5">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h1 className="mb-3">{detailsData?.getIngredient.name}</h1>
          </div>

          <Tab {...detailsData?.getIngredient} />
        </div>
      </main>

      <hr />

      <ProductsContainer title={'Danh sách các thuốc có ' + detailsData?.getIngredient.name}>
        <ProductsCarousel products={productsData?.getProductsByIngredient} />
      </ProductsContainer>

      <Footer />
    </>
  );
};

export default withTranslation('ingredientDetails')(IngredientDetail);
