import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import PRODUCTS_QUERY from '../../../queries/products/Products.graphql';
import { resolveImage } from '../../../lib/resolve-image';
import { Price } from '../../Price/Price';
import Loader from '../../Loader/Loader';
import { getCart } from '../../../store/reducers/root/cart';
import { cartTypes, createCartAction, grandTotal } from '../../../store/actions/cart';
import ADD_SIMPLE_PRODUCTS_TO_CART from '../../../queries/cart/Add_Simple_Products_To_Cart.graphql';
import AddToCartV2 from '../../Buttons/AddToCartV2';
import AddToCart from '../../Buttons/AddToCart';
import AddToCartV3 from '../../Buttons/AddToCartV3';

const ProductsLayout = ({ search, filters }) => {
  const { loading, data, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { search, filters },
    notifyOnNetworkStatusChange: true
  });

  const [addSimpleProductsToCart, { data: sampleProduct }] = useMutation(
    ADD_SIMPLE_PRODUCTS_TO_CART
  );

  const dispatch = useDispatch();
  const { cartId, loading: cartIsCreating } = useSelector(getCart);

  const addItemToCart = (product) => {
    // Create empty cart if doesn't exists
    if (!cartId && !cartIsCreating) {
      dispatch(createCartAction());
    }

    // dispatch new action, add item to state
    dispatch({
      type: cartTypes.CART_ADD_ITEM,
      data: product
    });
  };

  const page = data?.products.page_info;
  const products = data?.products.items || [];

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? '';

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto flex flex-wrap flex-row gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex">
            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-1/3">
                <Link
                  key={product.id}
                  href={{
                    pathname: '_url-resolver',
                    query: {
                      pathname: `/${product.url_key + productUrlSuffix}`,
                      type: 'PRODUCT'
                    }
                  }}
                  as={`/${product.url_key + productUrlSuffix}`}>
                  <a>
                    <Image
                      src={resolveImage(product.thumbnail.url)}
                      alt={product.thumbnail.label}
                      unsized
                    />
                  </a>
                </Link>
              </div>
              <div className="w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-2xl">
                  <Link
                    key={product.id}
                    href={{
                      pathname: '_url-resolver',
                      query: {
                        pathname: `/${product.url_key + productUrlSuffix}`,
                        type: 'PRODUCT'
                      }
                    }}
                    as={`/${product.url_key + productUrlSuffix}`}>
                    <a>{product.name}</a>
                  </Link>
                </h1>
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
                  {/*<AddToCart product={product} />*/}
                  <AddToCartV2 product={product} />
                  {/*<AddToCartV3 product={product} />*/}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsLayout;
