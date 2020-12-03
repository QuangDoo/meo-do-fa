import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import FilterTags from 'src/components/Modules/FilterTags';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import { GET_ALL_CATEGORIES, GetAllCategoriesData } from 'src/graphql/category/category.query';
import {
  GET_MANUFACTURERS,
  GetManufacturersData,
  GetManufacturersVars
} from 'src/graphql/manufacturers/manufacturers.query';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { GetProductsData, GetProductsVars } from 'src/types/GetProducts';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

const defaultSortType = '07';

function Products(): JSX.Element {
  const { t } = useTranslation(['products']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const { data: categoriesData } = useQuery<GetAllCategoriesData, undefined>(GET_ALL_CATEGORIES, {
    onError: (error) => {
      console.log('Get all categories error:', error);
    }
  });

  const categories = categoriesData?.getCategoriesAll || [];

  const { data: manufacturersData } = useQuery<GetManufacturersData, GetManufacturersVars>(
    GET_MANUFACTURERS,
    {
      variables: {
        page: 1,
        pageSize: 20
      },
      onError: (error) => {
        console.log('Get manufacturers error:', error);
      }
    }
  );

  const manufacturers = manufacturersData?.getManufactories || [];

  const { data: productsData } = useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS, {
    variables: {
      page,
      pageSize,
      type: router.query.tag as string,
      manufacturer_id: router.query.manufacturer as string,
      category_id: router.query.category as string,
      order_type: (router.query.sort as string) || defaultSortType
    },
    onError: () => null
  });

  const products = productsData?.getProductByConditions?.Products || [];

  const total = productsData?.getProductByConditions?.total || 0;

  const getNameById = (array, id) => {
    return _.find(array, { id })?.name;
  };

  const title = Number(router.query.category)
    ? getNameById(categories, Number(router.query.category))
    : t('products:title');

  return (
    <>
      <Head>
        <title>{title} - Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="products container-fluid mobile-content my-3 my-sm-5">
        <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
          <div className="products__sidebar pr-4 d-none d-sm-block">
            <ProductsSidebarFilter categories={categories} manufacturers={manufacturers} />
          </div>

          <div className="flex-grow-1">
            <div className="px-2 px-sm-0 mb-2">
              <h1 className="products__header text-capitalize mb-3">{title}</h1>

              {total > 0 ? (
                <>
                  {t('products:show')}{' '}
                  <b>
                    {(page - 1) * pageSize + 1}&nbsp;-&nbsp;
                    {Math.min(page * pageSize, total)}
                  </b>{' '}
                  {t('products:on_of')}
                  <b>{total}</b> {t('products:products')}
                </>
              ) : (
                t('products:no_products')
              )}
            </div>

            <div className="d-none d-sm-block mb-4">
              <FilterTags />
            </div>

            <main className="products__products">
              <div className="products__cards mb-3">
                {products.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>

              <Pagination
                count={Math.ceil(total / pageSize)}
                page={page}
                siblingCount={4}
                onChange={(page) =>
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      page: page
                    }
                  })
                }
              />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

Products.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: true })(Products);
