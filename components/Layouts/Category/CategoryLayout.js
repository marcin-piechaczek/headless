import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import CATEGORY_QUERY from '../../../queries/category/Category.graphql';
import Loader from '../../Loader/Loader';
import ProductsLayout from '../Products/ProductsLayout';

const CategoryLayout = ({ filters }) => {
  const { data, error, loading } = useQuery(CATEGORY_QUERY, {
    variables: { filters }
  });

  if (error) {
    return <div>💩 There was an error.</div>;
  }

  const category = data?.categoryList[0];

  const categoryUrlSuffix = data?.storeConfig.category_url_suffix ?? '';

  const backUrl =
    category?.breadcrumbs && category.breadcrumbs[0]?.category_url_path + categoryUrlSuffix;

  return (
    <>
      <Head>
        <title>{category?.name}</title>
      </Head>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{category?.name}</h1>
      </div>
      {backUrl && (
        <Link key={backUrl} href={backUrl}>
          <a>⬅</a>
        </Link>
      )}
      {/*{/PRODUCTS/.test(category?.display_mode) && (*/}
      <CategoryWrapperStyled>
        {category?.children?.length > 0 && (
          <aside className="container mx-auto flex flex-wrap flex-row gap-4">
            <ul>
              {category.children.map((category) => (
                <li key={category.id}>
                  <Link
                    href={{
                      pathname: '_url-resolver',
                      query: {
                        pathname: `/${category.url_key + categoryUrlSuffix}`,
                        type: 'CATEGORY'
                      }
                    }}
                    as={`${category.url_path + categoryUrlSuffix}`}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <ProductsLayout filters={{ category_id: { eq: category?.id } }} />
      </CategoryWrapperStyled>
      {/*)}*/}
    </>
  );
};

const CategoryWrapperStyled = styled.div`
  //display: flex;
`;

const CategoryAsideStyled = styled.aside`
  //padding: 20px;
`;
export default CategoryLayout;
