import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Loading from 'src/components/Layout/Loading';
import Nav from 'src/components/Layout/Nav';
import FilterTags from 'src/components/Modules/FilterTags';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsDrawerFilter from 'src/components/Modules/ProductDrawerFilter/ProductsDrawerFilter';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import {
  Category,
  CategoryData,
  CategoryVar,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES_LEVEL,
  GET_CATEGORY,
  GetAllCategoriesData,
  GetCategoriesLevelData
} from 'src/graphql/category/category.query';
import {
  GET_MANUFACTURERS,
  GetManufacturersData,
  GetManufacturersVars
} from 'src/graphql/manufacturers/manufacturers.query';
import {
  GET_PRODUCTS,
  GetProductsData,
  GetProductsVars,
  ProductTag
} from 'src/graphql/product/getProducts';
import withApollo from 'src/utils/withApollo';

const pageSize = 20;

const defaultSortType = '07'; // Name ascending

function Products(): JSX.Element {
  const { t } = useTranslation(['products']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const search = router.query.search as string;

  // const { data: categoriesData } = useQuery<GetAllCategoriesData, undefined>(GET_ALL_CATEGORIES, {
  //   onError: () => null
  // });

  // const categories = categoriesData?.getCategoriesAll || [];

  const { data: categoriesLevelData } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );
  const categoriesLevel = categoriesLevelData?.getCategoriesLevel || [];

  const { data: manufacturersData } = useQuery<GetManufacturersData, GetManufacturersVars>(
    GET_MANUFACTURERS,
    {
      variables: {
        page: 1,
        pageSize: 20
      },
      onError: () => null
    }
  );

  const manufacturers = manufacturersData?.getManufactories || [];

  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize,
      type: router.query.tag as ProductTag,
      condition: {
        manufacturer_id: router.query.manufacturer as string,
        category_id: router.query.category as string,
        order_type: (router.query.sort as string) || defaultSortType,
        name: search
      }
    },
    onError: () => null
  });

  const products = productsData?.getProductByConditions?.Products || [];

  const total = productsData?.getProductByConditions?.total || 0;

  const { data: categoryData } = useQuery<CategoryData, CategoryVar>(GET_CATEGORY, {
    variables: {
      id: Number(router.query.category)
    },
    onError: () => null
  });

  const title = categoryData?.getCategory ? categoryData.getCategory.name : t('products:title');

  // const getNameById = (array, id) => {
  //   return _.find(array, { id })?.name;
  // };

  // const title = Number(router.query.category)
  //   ? getNameById(categories, Number(router.query.category))
  //   : t('products:title');

  useEffect(() => {
    if (productsLoading) {
      animateScroll.scrollToTop();
    }
  }, [productsLoading]);

  return (
    <>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

      <Header />

      <Nav />
      {categoriesLevel.length !== 0 ? (
        <div className="products container mobile-content my-3 my-sm-5">
          <div className="d-flex flex-nowrap justify-content-between">
            <div className="products__sidebar pr-4 d-none d-sm-block">
              <ProductsSidebarFilter categories={categoriesLevel} manufacturers={manufacturers} />
            </div>

            <div className="flex-grow-1">
              <div className="px-2 px-sm-0 mb-2">
                <div className="d-block d-sm-none mb-3">
                  <ProductsDrawerFilter
                    categories={categoriesLevel}
                    manufacturers={manufacturers}
                  />
                </div>

                <h1 className="products__header text-capitalize mb-3">{title}</h1>
                {productsLoading ? (
                  <b></b>
                ) : total > 0 ? (
                  <>
                    {t('products:show')}{' '}
                    <b>
                      {(page - 1) * pageSize + 1}&nbsp;-&nbsp;
                      {Math.min(page * pageSize, total)}
                    </b>{' '}
                    {t('products:on_of')}
                    <b>{`${total} `}</b>
                    {search ? (
                      <>
                        {t('products:key')} <b>{search}</b>
                      </>
                    ) : (
                      t('products:products')
                    )}
                  </>
                ) : (
                  <div>
                    {t('products:no_products')} <b>{search}</b>
                  </div>
                )}
              </div>

              <div className="d-none d-sm-block mb-4">
                <FilterTags />
              </div>

              <main className="products__products">
                {productsLoading ? (
                  <div className="container text-center pb-5 pt-5">
                    <Loading />
                  </div>
                ) : (
                  <div className="products__cards mb-3">
                    {products.map((product, index) => (
                      <ProductCard key={index} {...product} />
                    ))}
                  </div>
                )}

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
      ) : (
        <div></div>
      )}

      <Footer />
    </>
  );
}

Products.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default withApollo({ ssr: true })(Products);
