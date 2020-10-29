import React from 'react';
import { useQuery } from '@apollo/client';
import PRODUCTS_QUERY from '../../../queries/products/Products.graphql';
import styled from 'styled-components';
import Link from 'next';
import { resolveImage } from '../../../lib/resolve-image';
import Image from 'next/image';
import { Price } from '../../Price/Price';

const ProductLayout = ({ search, filters }) => {
  const { loading, data, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { search, filters },
    notifyOnNetworkStatusChange: true
  });

  const page = data?.products.page_info;
  const products = data?.products.items || [];

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? '';

  return (
    <>
      <div className="container mx-auto flex flex-wrap flex-row gap-4">
        {products.map((product) => (
          <div className="flex">
            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src={resolveImage(product.thumbnail.url)}
                // src={product.thumbnail.url}
                alt={product.thumbnail.label}
                width={150}
                height={213}
              />
              <div className="w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-2xl">{product.name}</h1>
                <p className="mt-2 text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit In odit exercitationem
                  fuga id nam quia
                </p>
                <div className="flex item-center mt-2">
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <div className="flex item-center justify-between mt-3">
                  <h1 className="text-gray-700 font-bold text-xl">
                    <Price {...product.price_range} />
                  </h1>
                  <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                    Add to Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductLayout;
