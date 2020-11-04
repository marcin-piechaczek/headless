import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADD_SIMPLE_PRODUCTS_TO_CART from '../../queries/cart/Add_Simple_Products_To_Cart.graphql';
import cart, { getCart } from '../../store/reducers/root/cart';
import { addSimpleProduct, cartTypes, createCartAction } from '../../store/actions/cart';
import { useApolloClient } from '@apollo/client';
import CREATE_CART from '../../queries/cart/CreateCart.graphql';
import { initializeApollo } from '../../lib/apollo';
import CART_ID from '../../queries/cart/CartId.graphql';
import useCreateCart from '../../hooks/useCreateCart';
import GET_CART_ITEMS from '../../queries/cart/CartItems.graphql';

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const [addSimpleProductsToCart, { data: sampleProduct }] = useMutation(
    ADD_SIMPLE_PRODUCTS_TO_CART
  );
  const { data } = useQuery(CART_ID);
  const [createCart] = useMutation(CREATE_CART);

  const addItemToCart = () => {
    // if (!data.CartId) {
    //   createCart().then((response) => {
    //     addSimpleProductsToCart({
    //       variables: {
    //         cartId: response.data.createEmptyCart,
    //         sku: product.sku,
    //         quantity: 1.0
    //       }
    //     });
    //   });
    // }
    dispatch({
      type: cartTypes.CART_ADD_ITEM,
      data: product
    });
  };

  return (
    <>
      <button
        onClick={addItemToCart}
        className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
        Add to Card
      </button>
    </>
  );
};

export default AddToCart;
