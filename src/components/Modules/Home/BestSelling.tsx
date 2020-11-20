import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { GetProductsByIngredientData, GetProductsByIngredientVars, GET_PRODUCTS_BY_INGREDIENT } from 'src/graphql/product/getProductsByIngredient.query';
import { GET_PRODUCTS } from 'src/graphql/product/product.query';
import { GetProductsData, GetProductsVars } from 'src/types/GetProducts';
import { Product } from 'src/types/Product';
import { mockProducts } from '../../../mockData/mockProducts';
import ProductCard from '../ProductCard';
import { ProductsCarousel } from '../ProductsCarousel';
import { ProductsContainer } from './ProductsContainer';

export const BestSelling = (): JSX.Element => {
  const router = useRouter();

  const { data: productsData } = useQuery<
  GetProductsData,
  GetProductsVars
>(GET_PRODUCTS,
    {
      variables: {
        page: 1,
        pageSize: 20,
        type: router.query.tab,
        manufacturer_id: router.query.manufacturer,
        category_id: router.query.category,
        order_type: router.query.sort || '01'      },
      
    }
  );
  const [productList, setProductList] = useState<Product[]>();

console.log('productList', productList)
  return (
    <ProductsContainer title="sp bán chạy" seeMoreUrl="/deals"  className="px-0 px-sm-3">
     {productList && (
              <main className="products__products">
                <div className="products__cards mb-3">
                  {productList &&
                    productList.map((product, index) => <ProductCard key={index} {...product} />)}
                </div>

                
              </main>
            )}
    </ProductsContainer>
  );
};
