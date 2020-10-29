import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import CATEGORY_QUERY from '../../../queries/category/Category.graphql';
import Loader from '../../Loader/Loader';
import ProductLayout from '../Product/ProductLayout';

const CategoryLayout = ({ filters }) => {
  const { data, error, loading } = useQuery(CATEGORY_QUERY, {
    variables: { filters }
  });

  if (error) {
    return <div>💩 There was an error.</div>;
  }

  if (loading) {
    return <Loader />;
  }

  const category = data?.categoryList[0];

  const categoryUrlSuffix = data?.storeConfig.category_url_suffix ?? '';

  const backUrl =
    category?.breadcrumbs && category.breadcrumbs[0]?.category_url_path + categoryUrlSuffix;

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{category?.name}</h1>
      </div>
      {category?.children?.length > 0 && (
        <nav>
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
        </nav>
      )}
      <ProductLayout filters={{ category_id: { eq: category.id } }} />
    </>
  );
};

export default CategoryLayout;
