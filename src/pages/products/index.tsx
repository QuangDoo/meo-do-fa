import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
// import SimpleBreadcrumbs from 'src/components/Modules/BreadCrum/BreadCrum';
import FilterTags from 'src/components/Modules/FilterTags';
import MainLayout from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsDrawerFilter from 'src/components/Modules/ProductDrawerFilter/ProductsDrawerFilter';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import {
  // Category,
  CategoryData,
  CategoryVar,
  // GET_ALL_CATEGORIES,
  GET_CATEGORIES_LEVEL,
  GET_CATEGORY,
  // GetAllCategoriesData,
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
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

const PAGE_SIZE = 20;

const DEFAULT_SORT_TYPE = '07'; // Name ascending

Products.getInitialProps = async (ctx) => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge', 'products'],
  token: getToken(ctx)
});

function Products(props) {
  const { t } = useTranslation(['products']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const search = router.query.search as string;

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
      pageSize: PAGE_SIZE,
      type: router.query.tag as ProductTag,
      condition: {
        manufacturer_id: router.query.manufacturer as string,
        category_id: router.query.category as string,
        name: search,
        order_type: (router.query.sort as string) || DEFAULT_SORT_TYPE,
        min_price: Number(router.query.priceFrom) || 1,
        max_price: Number(router.query.priceTo) || 10000000
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

  useEffect(() => {
    if (productsLoading) {
      animateScroll.scrollToTop();
    }
  }, [productsLoading]);

  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa - {title}</title>
      </Head>

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
                      {(page - 1) * PAGE_SIZE + 1}&nbsp;-&nbsp;
                      {Math.min(page * PAGE_SIZE, total)}
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
                  count={Math.ceil(total / PAGE_SIZE)}
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
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(Products);
