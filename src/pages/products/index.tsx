import { useQuery } from '@apollo/react-hooks';
import clsx from 'clsx';
import { withTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Dropdown from 'src/components/Form/Dropdown';
import Select from 'src/components/Form/Select';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import Pagination from 'src/components/Modules/Pagination';
import ProductCard from 'src/components/Modules/ProductCard';
import { GET_CATEGORIES } from 'src/graphql/category/category.query';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { mockSuppliers } from 'src/mockData/mockSuppliers';
import { mockTotalProducts } from 'src/mockData/mockTotalProducts';
import { Category } from 'src/types/Category';
import { Product } from 'src/types/Product';
import withApollo from 'src/utils/withApollo';

type GetCategoriesData = {
  getCategories: Category[];
};

type GetProductsData = {
  getProducts: Product[];
};

type GetProductsVars = {
  page: number;
  pageSize: number;
};

type Tag = {
  name: React.ReactNode;
  tab?: string;
};

type SortOption = {
  name: string;
  value: string;
};

const tags: Tag[] = [
  { name: 'Tất cả' },
  {
    name: (
      <>
        <i className="fas fa-bolt text-secondary mr-1" />
        Flash Sale
        <i className="fas fa-bolt text-secondary ml-1" />
      </>
    ),
    tab: 'flash_sale'
  },
  { name: 'SP Mới', tab: 'new_arrival' },
  { name: 'Giảm giá', tab: 'decreasing_price' },
  { name: 'Hóa đơn nhanh', tab: 'invoice_exportable' },
  { name: 'Tăng giá', tab: 'increasing_price' },
  { name: 'Cận date', tab: 'close_date' },
  { name: 'Chỉ có tại thuocsi', tab: 'only_thuocsi' },
  { name: 'Người Việt dùng hàng Việt', tab: 'use_vietnamese' }
];

const sortOptions: SortOption[] = [
  { name: 'Sản phẩm mới', value: 'new_arrival' },
  { name: 'Bán chạy nhất', value: 'best_sellers' },
  { name: 'Phù hợp nhất', value: 'best_match' },
  { name: 'Giá: Cao đến Thấp', value: 'highest_price' },
  { name: 'Giá: Thấp đến Cao', value: 'lowest_price' },
  { name: 'Tên: A-Z', value: 'alphabet_az' },
  { name: 'Tên: Z-A', value: 'alphabet_za' }
];

const totalProducts = mockTotalProducts;

const pageSize = 20;

function Products(): JSX.Element {
  const router = useRouter();

  // Current page
  const page = +router.query.page || 1;

  // Get categories on mount
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery<
    GetCategoriesData,
    undefined
  >(GET_CATEGORIES);

  // Lazy get products
  const { data: productsData, loading: productsLoading, error: productsError, refetch } = useQuery<
    GetProductsData,
    GetProductsVars
  >(GET_PRODUCTS, {
    variables: {
      page,
      pageSize
    }
  });

  // Refetch products when page changes
  useEffect(() => {
    if (!router.query.page) return;

    refetch({
      page: +router.query.page,
      pageSize
    });
  }, [router.query.page, refetch]);

  // Update router sort query on selecting sort
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: event.target.value
        }
      },
      undefined,
      { shallow: true }
    );
  };

  // Pagination component, reused at top and bottom of products list
  // Updates page query on change
  const CustomPagination = () => (
    <Pagination
      count={Math.ceil(totalProducts / pageSize)}
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
  );

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <div className="products container-fluid mobile-content my-3 my-sm-5">
        <div className="row flex-nowrap justify-content-between px-lg-5 px-sm-3">
          {/* Sidebar filter */}
          <div className="products__sidebar pr-4 d-none d-sm-block">
            <aside className="text-capitalize w-100">
              <header className="products__filters-header">
                <span className="text-muted icomoon icon-tune mr-3" />
                Bộ lọc tìm kiếm
              </header>

              <hr className="hr my-3" />

              {/* Sort */}
              <form className="form-inline justify-content-between">
                <div className="products__filter-header mb-2">Sắp xếp</div>

                <Select onBlur={handleSortChange}>
                  {sortOptions.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
              </form>

              <hr className="hr my-3" />

              {/* Filter category */}
              <Dropdown label="Nhóm thuốc">
                <div className="mb-2">
                  <Link href="/products">
                    <a
                      className={clsx(
                        'products__filter-category',
                        !router.query.category && 'active'
                      )}>
                      Tất cả
                    </a>
                  </Link>
                </div>

                {categoriesData?.getCategories.map(({ name, id }) => (
                  <div key={id} className="mb-2">
                    <Link href={`/products?category=${id}`}>
                      <a className={clsx('products__filter-category')}>{name}</a>
                    </Link>
                  </div>
                ))}
              </Dropdown>

              <hr className="hr my-3" />

              {/* Filter supplier */}
              <Dropdown label="Nhà sản xuất">
                <div className="mb-2">
                  <Link href="/products">
                    <a
                      className={clsx(
                        'products__filter-category',
                        !router.query.supplier && 'active'
                      )}>
                      Tất cả
                    </a>
                  </Link>
                </div>

                {mockSuppliers.map(({ name, id }) => (
                  <div key={id} className="mb-2">
                    <Link href={`/products?supplier=${id}`}>
                      <a
                        className={clsx(
                          'products__filter-category',
                          router.query.supplier === id && 'active'
                        )}>
                        {name}
                      </a>
                    </Link>
                  </div>
                ))}

                <div>
                  <Link href="/manufacturers">
                    <a className="products__filter-category">Xem thêm</a>
                  </Link>
                </div>
              </Dropdown>
            </aside>
          </div>

          {/* Content */}
          <div className="flex-grow-1">
            {/* Header with pagination info */}
            <div className="px-2 px-sm-0">
              <div className="mb-2">
                <h1 className="products__header text-capitalize mb-3">Tất cả sản phẩm</h1>

                {totalProducts > 0 ? (
                  <>
                    Hiển thị{' '}
                    <b>
                      {(page - 1) * pageSize + 1}&nbsp;-&nbsp;
                      {Math.min(page * pageSize, totalProducts)}
                    </b>{' '}
                    trên tổng số <b>{totalProducts}</b> sản Phẩm
                  </>
                ) : (
                  'Không có Sản Phẩm'
                )}
              </div>
            </div>

            {/* Filter tag */}
            <div className="d-none d-sm-block">
              <div className="d-flex justify-content-between flex-wrap align-items-end mb-4">
                <div className="products__filter-btns">
                  {tags.map(({ tab, name }, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          page: 1,
                          tab: tab
                        }
                      }}>
                      <a
                        className={clsx(
                          'btn products__filter-btn',
                          router.query.tab === tab && 'active'
                        )}>
                        {name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Products list */}
            <main className="products__products">
              <CustomPagination />

              <div className="products__cards mb-3">
                {productsData?.getProducts.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>

              <CustomPagination />
            </main>
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
