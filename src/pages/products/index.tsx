import { useQuery } from '@apollo/react-hooks';
import { withTranslation } from 'i18n';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import FilterTags from 'src/components/Modules/FilterTags';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import { GET_CATEGORIES, GetCategoriesData } from 'src/graphql/category/category.query';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { mockSuppliers } from 'src/mockData/mockSuppliers';
import { GetProductsData, GetProductsVars } from 'src/types/GetProducts';
import { Product } from 'src/types/Product';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

function Products(): JSX.Element {
  const router = useRouter();

  // Current page
  const page = +router.query.page || 1;

  // Get categories
  const { data: categoriesData } = useQuery<GetCategoriesData, undefined>(GET_CATEGORIES);

  // Get products
  const { data: productsData, loading: productsLoading, error: productsError, refetch } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize,
      type: router.query.tab,
      manufacturer_id: router.query.manufacturer,
      category_id: router.query.category,
      order_type: router.query.sort || '01'
    }
  });

  const [productList, setProductList] = useState<Product[]>();

  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (productsData) {
      setProductList(productsData.getProductByConditions.Products);
      setTotal(productsData.getProductByConditions.total);
    }
  }, [productsData]);

  // Refetch products when page changes
  useEffect(() => {
    if (!router.query) return;
    refetch({
      page: router.query.page ? +router.query.page : page,
      pageSize,
      type: router.query.tab,
      manufacturer_id: router.query.manufacturer,
      category_id: router.query.category,
      order_type: router.query.sort || '01'
    });
  }, [router.query, refetch]);

  const getNameById = (array, id) => {
    return _.find(array, { id })?.name;
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="products container-fluid mobile-content my-3 my-sm-5">
        <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
          <div className="products__sidebar pr-4 d-none d-sm-block">
            <ProductsSidebarFilter
              categories={categoriesData?.getCategories || []}
              suppliers={mockSuppliers}
            />
          </div>

          {/* Content */}
          <div className="flex-grow-1">
            {/* Header with pagination info */}
            <div className="px-2 px-sm-0 mb-2">
              <h1 className="products__header text-capitalize mb-3">
                {router.query.category
                  ? getNameById(categoriesData?.getCategories || [], router.query.category)
                  : 'Tất cả sản phẩm'}
              </h1>

              {total > 0 ? (
                <>
                  Hiển thị{' '}
                  <b>
                    {(page - 1) * pageSize + 1}&nbsp;-&nbsp;
                    {Math.min(page * pageSize, total)}
                  </b>{' '}
                  trên tổng số <b>{total}</b> sản phẩm
                </>
              ) : (
                'Không có Sản Phẩm'
              )}
            </div>

            {productList && (
              <div className="d-none d-sm-block mb-4">
                <FilterTags />
              </div>
            )}

            {/* Products list */}
            {productList && (
              <main className="products__products">
                <div className="products__cards mb-3">
                  {productList &&
                    productList.map((product, index) => <ProductCard key={index} {...product} />)}
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const PageWithTranslation = withTranslation('')(Products);

const PageWithApollo = withApollo({ ssr: true })(PageWithTranslation);

export default PageWithApollo;
