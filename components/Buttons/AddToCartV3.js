import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADD_SIMPLE_PRODUCTS_TO_CART from '../../queries/cart/Add_Simple_Products_To_Cart.graphql';
import { getCart } from '../../store/reducers/root/cart';
import { addSimpleProduct, cartTypes, createCartAction } from '../../store/actions/cart';
import { useApolloClient } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo';
import CART_ID from '../../queries/cart/CartId.graphql';
import useCreateCart from '../../hooks/useCreateCart';
import GET_CART_ITEMS from '../../queries/cart/CartItems.graphql';
import CREATE_CART from '../../queries/cart/CreateCart.graphql';
import GET_CART_ID from '../../queries/cart/CartId.graphql';

const AddToCartV3 = ({ product }) => {
  const { data, loading } = useQuery(GET_CART_ID);
  // console.log(data, loading, error);
  const [createCart] = useMutation(CREATE_CART);
  const [addSimpleProductsToCart, { loading: disableButton }] = useMutation(
    ADD_SIMPLE_PRODUCTS_TO_CART
  );

  const addItemToCart = async () => {
    // console.log('Adding item...');
    // console.log('CartID:', data?.CartId);
    if (!data.CartId && !loading) {
      // console.log('Fetching CartID...');
      await createCart({
        update: (cache, { data }) => {
          const cartId = data?.id;
          addSimpleProductsToCart({
            variables: {
              cartId: cartId,
              sku: product.sku,
              quantity: 1.0
            }
          });
          cache.writeQuery({
            query: GET_CART_ID,
            data: { CartId: cartId }
          });
        }
      });
      // console.log('Fetched cartID:', newCartId.id);
    } else {
      console.log('else, mam id:', data.CartId);
      await addSimpleProductsToCart({
        variables: {
          cartId: data.CartId,
          sku: product.sku,
          quantity: 1.0
        }
      });
    }
  };

  return (
    <>
      <button
        onClick={addItemToCart}
        className={
          disableButton
            ? 'px-3 py-2 bg-red-800 text-white text-xs font-bold uppercase rounded'
            : 'px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded'
        }
        disabled={disableButton}>
        Add to Card v3
      </button>
    </>
  );
};

export default AddToCartV3;
