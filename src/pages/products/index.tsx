import { useQuery } from '@apollo/client';
import { ContactsOutlined } from '@material-ui/icons';
import { Trans, useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import queryString from 'querystring';
import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import Loading from 'src/components/Layout/Loading';
import FilterTags from 'src/components/Modules/FilterTags';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import ProductsDrawerFilter from 'src/components/Modules/ProductDrawerFilter/ProductsDrawerFilter';
import ProductsSidebarFilter from 'src/components/Modules/ProductsSidebarFilter';
import {
  GET_CATEGORIES_LEVEL,
  GetCategoriesLevelData
} from 'src/graphql/category/getCategoriesLevel';
import { CategorySubData, CategoryVar, GET_CATEGORY } from 'src/graphql/category/getCategory';
import {
  GET_PATHOLOGY,
  GetPathologyData,
  GetPathologyVars
} from 'src/graphql/pathology/getPathology';
import {
  GET_PRODUCTS,
  GetProductsData,
  GetProductsVars,
  ProductTag,
  TagType
} from 'src/graphql/product/getProducts';
import asyncQuery from 'src/utils/asyncQuery';

const PAGE_SIZE = 24;

const NAME_ASCENDING = '00'; // Name ascending

import withToken from 'src/utils/withToken';

Products.getInitialProps = async (ctx) => {
  await asyncQuery({
    ctx,
    query: GET_CATEGORIES_LEVEL
  });

  await asyncQuery<GetProductsData, GetProductsVars>({
    ctx,
    query: GET_PRODUCTS,
    variables: {
      page: +ctx.query.page || 1,
      pageSize: PAGE_SIZE,
      type: ctx.query.tag as ProductTag,
      condition: {
        manufacturer_id: (ctx.query.manufacturer as string) || null,
        category_id: (ctx.query.category as string) || null,
        name: (ctx.query.search as string) || null,
        order_type: ctx.query.sort || NAME_ASCENDING,
        min_price: +ctx.query.priceFrom || 1,
        max_price: +ctx.query.priceTo || 10000000,
        pathology_id: (ctx.query.pathology as string) || null,
        supplier_id: (ctx.query.supplier as string) || null
      }
    },
    fetchPolicy: 'network-only'
    // notifyOnNetworkStatusChange: true
  });

  return {
    namespacesRequired: [
      ...mainLayoutNamespacesRequired,
      'products',
      'productCard',
      'productBadge',
      'productsSidebar',
      'filterTags'
    ]
  };
};

function Products() {
  const { t, i18n } = useTranslation(['products', 'errors']);

  const router = useRouter();
  useEffect(() => {
    const changePathname = () => {
      if (router) {
        i18n.off('languageChanged');
        i18n.on('languageChanged', (lang) => {
          const requestQuery = queryString.stringify(router?.query);
          setTimeout(() => {
            if (lang === 'en') {
              router.push(`/products${requestQuery ? '?' + requestQuery : ''}`, undefined, {
                shallow: true
              });
            } else if (lang === 'vi') {
              router.push(`/san-pham${requestQuery ? '?' + requestQuery : ''}`, undefined, {
                shallow: true
              });
            }
          });
        });
      }
    };
    changePathname();
    return () => {
      changePathname();
      i18n.off('languageChanged');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const page = +router.query.page || 1;

  const search = router.query.search as string;

  const tag = router.query.searchtag as string;

  const tag_id = +router.query.tag_id;

  // ["product", "manufacturer", "ingredient", "supplier"]

  const searchTag =
    tag === 'supplier'
      ? TagType.SUPPLIER
      : tag === 'manufacturer'
      ? TagType.MANUFATURE
      : tag === 'ingredient'
      ? TagType.INGREDIENT
      : TagType.PRODUCT;

  // GET ALL CATEGORIES FOR SIDEBAR FILTER
  const { data: categoriesLevelData } = useQuery<GetCategoriesLevelData, undefined>(
    GET_CATEGORIES_LEVEL,
    {
      onError: (error) => {
        toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  // ALL CATEGORIES DATA
  const categoriesLevel = categoriesLevelData?.getCategoriesLevel;

  // GET PRODUCTS
  const { data: productsData, loading: productsLoading } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize: PAGE_SIZE,
      type: router.query.tag as ProductTag,
      condition: {
        manufacturer_id: (router.query.manufacturer as string) || null,
        category_id: (router.query.category as string) || null,
        name: search,
        order_type: (router.query.sort as string) || NAME_ASCENDING,
        min_price: Number(router.query.priceFrom) || 1,
        max_price: Number(router.query.priceTo) || 10000000,
        pathology_id: (router.query.pathology as string) || null,
        supplier_id: (router.query.supplier as string) || null,
        search_tag: searchTag,
        tag_id: tag_id || null
      }
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  console.log(`router.query.sort`, router.query.sort);

  // PRODUCTS DATA
  const products = productsData?.getProductByConditions?.Products || [];

  // TOTAL AMOUNT OF PRODUCTS, USED TO CALCULATE PAGE COUNT
  const total = productsData?.getProductByConditions?.total || 0;

  // GET FILTERED CATEGORY DATA
  const { data: categoryData } = useQuery<CategorySubData, CategoryVar>(GET_CATEGORY, {
    variables: {
      id: +router.query.category
    },
    onError: () => null,
    skip: !router.query.category
  });

  // CATEGORY DATA
  const category = categoryData?.getCategory;

  // GET PATHOLOGIES
  const { data: pathologyData } = useQuery<GetPathologyData, GetPathologyVars>(GET_PATHOLOGY, {
    variables: {
      id: Number(router.query.pathology)
    },
    skip: !router.query.pathology
  });

  // PATHOLOGIES DATA
  const pathology = pathologyData?.getPathology;

  // PARENT CATEGORY OF THE FILTERED CATEGORY
  const categoryParent = categoriesLevel
    ?.filter((category) => category.id === Number(router.query.category))
    ?.shift();

  // TITLE OF THE PAGE WHEN FILTERED CATEGORY
  // TODO: GET CATEGORY DETAILS WITH FILTERED CATEGORY ID AND GET THE NAME (NEEDS FIX FROM BACKEND)
  //       REMOVE GET CATEGORY LEVELS
  const categoryTitle = category?.name || categoryParent?.name;

  // TITLE OF THE PAGE WHEN FILTERED PATHOLOGY
  const pathologyTitle = categoryTitle || pathology?.name;

  // TITLE OF THE PRODUCTS PAGE
  // CATEGORY NAME WHEN FILTERED BY CATEGORY
  // PATHOLOGY NAME WHEN FILTERED BY PATHOLOGY
  // ELSE NORMAL TITLE
  const title = pathologyTitle || t('products:title');

  // SCROLL TO TOP WHEN LOADING PRODUCTS
  useEffect(() => {
    if (productsLoading) {
      animateScroll.scrollToTop();
    }
  }, [productsLoading]);

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {title}</title>
        <meta property="og:title" content="Products" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <div className="products container mobile-content my-3 my-sm-5">
        <div className="d-flex flex-nowrap justify-content-between">
          <div className="products__sidebar pr-4 d-none d-sm-block">
            <ProductsSidebarFilter />
          </div>

          <div className="flex-grow-1 w-100">
            <div className="px-2 px-sm-0 mb-2">
              <div className="row d-flex flex-row justify-content-between align-items-center">
                <h1 className="products__header text-capitalize col-9 pr-0 custom-header">
                  {title}
                </h1>
                <div className="d-block d-sm-none mb-3 col-3 pl-0 pr-0">
                  <ProductsDrawerFilter />
                </div>
              </div>

              {!productsLoading &&
                (total > 0 ? (
                  <div>
                    <Trans
                      i18nKey={search ? 'products:results_with_keyword' : 'products:results'}
                      values={{
                        start: (page - 1) * PAGE_SIZE + 1,
                        end: Math.min(page * PAGE_SIZE, total),
                        total: total,
                        keyword: search
                      }}
                      components={{ bold: <b /> }}
                    />
                  </div>
                ) : (
                  <div>
                    <Trans
                      i18nKey={
                        search ? 'products:no_products_with_keyword' : 'products:no_products'
                      }
                      values={{
                        keyword: search
                      }}
                      components={{ bold: <b /> }}
                    />
                  </div>
                ))}
            </div>

            <div hidden={products?.length === 0} className="d-none d-sm-block mb-4">
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

              {!productsLoading && (
                <Pagination
                  count={Math.ceil(total / PAGE_SIZE)}
                  page={page}
                  siblingCount={4}
                  onChange={(page) =>
                    router.push({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        page
                      }
                    })
                  }
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Products);
