import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import GET_CART_ID from '../../../queries/cart/CartId.graphql';
import GET_CART_ITEMS from '../../../queries/cart/CartItems.graphql';
import ShippingInformationForm from './shippingInformation/ShippingInformationForm';
import GET_COUNTRIES from '../../../queries/checkout/Countries.graphql';
import ShippingInformationFormSummary from './shippingInformation/ShippingInformationFormSummary';
import ShippingMethodsForm from './shippingMethods/ShippingMethodsForm';
import Loader from '../../Loader/Loader';
import ShippingMethodsFormSummary from './shippingMethods/ShippingMethodsFormSummary';
import PaymentMethodsForm from './paymentMethods/PaymentMethodsForm';
import PaymentMethodFormSummary from './paymentMethods/PaymentMethodsFormSummary';
import PLACE_ORDER from '../../../queries/checkout/placeOrder.graphql';
import OrderThankYou from './OrderThankYou';

const CheckoutLayout = () => {
  const { data } = useQuery(GET_CART_ID);
  const { data: countriesList, loading: fetchingCountries } = useQuery(GET_COUNTRIES);
  const [placeOrder, { data: order }] = useMutation(PLACE_ORDER);

  const cartId = data?.CartId;
  const { countries } = countriesList || [];

  const { data: products, loading } = useQuery(GET_CART_ITEMS, {
    variables: {
      cartId
    },
    skip: !cartId
  });

  if (loading) {
    return <Loader />;
  }

  const items = products?.cart.items;

  if (!items || items.length === 0) {
    return <p>Cart is empty</p>;
  }

  const handleOrder = () => {
    placeOrder({
      variables: {
        cartId
      }
    });
  };

  const price = products?.cart.prices.grand_total;
  const stepShippingInformation = products?.cart.shipping_addresses;
  const stepShippingMethods = stepShippingInformation[0]?.available_shipping_methods || [];
  const selectedShippingMethods = stepShippingInformation[0]?.selected_shipping_method || [];

  const stepPaymentMethods = products?.cart.available_payment_methods || [];
  const selectedPaymentMethods = products?.cart.selected_payment_method.title;

  const orderNumber = order?.placeOrder.order.order_number;

  return (
    <>
      <CheckoutWrapperStyled>
        {order && orderNumber ? (
          <OrderThankYou orderNumber={orderNumber} />
        ) : (
          <CheckoutContentStyled>
            <CheckoutFormStyled>
              {stepShippingInformation && stepShippingInformation.length ? (
                <ShippingInformationFormSummary
                  cartId={cartId}
                  customer={stepShippingInformation[0]}
                />
              ) : (
                <ShippingInformationForm
                  countries={countries}
                  loading={fetchingCountries}
                  cartId={cartId}
                />
              )}
              <CheckoutShippingMethodsStyled>
                {selectedShippingMethods && selectedShippingMethods.carrier_code ? (
                  <ShippingMethodsFormSummary selectedShippingMethods={selectedShippingMethods} />
                ) : (
                  <ShippingMethodsForm cartId={cartId} shippingMethods={stepShippingMethods} />
                )}
              </CheckoutShippingMethodsStyled>
              <CheckoutPaymentMethodsStyled>
                {selectedPaymentMethods.length ? (
                  <PaymentMethodFormSummary paymentMethod={selectedPaymentMethods} />
                ) : (
                  <PaymentMethodsForm cartId={cartId} paymentMethods={stepPaymentMethods} />
                )}
              </CheckoutPaymentMethodsStyled>
              <CheckoutButtonStyled
                onClick={handleOrder}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                  selectedPaymentMethods.length && selectedShippingMethods.carrier_code
                    ? ''
                    : 'opacity-50 cursor-not-allowed'
                }`}>
                Checkout
              </CheckoutButtonStyled>
            </CheckoutFormStyled>
            <CheckoutFormCartStyled>
              {items && items.map((item) => <span key={item.product.id}>{item.product.name}</span>)}
              <PriceStyled>
                <p>Total:</p>
                <span>{price?.value}</span>
                <span>{price?.currency}</span>
              </PriceStyled>
            </CheckoutFormCartStyled>
          </CheckoutContentStyled>
        )}
      </CheckoutWrapperStyled>
    </>
  );
};

const CheckoutShippingMethodsStyled = styled.div`
  display: flex;
`;

const CheckoutPaymentMethodsStyled = styled.div`
  display: flex;
`;

const CheckoutWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

const CheckoutContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 50px;
`;

const CheckoutFormStyled = styled.div`
  display: flex;
  flex-basis: 50%;
  flex-direction: column;
  margin-right: 30px;
`;

const CheckoutFormCartStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const CheckoutButtonStyled = styled.button`
  max-width: 300px;
  margin: 30px auto;
  display: flex;
  justify-content: flex-start;
`;

const PriceStyled = styled.div`
  display: flex;
  font-weight: bold;
  p {
    margin-right: 5px;
  }
  span {
    margin-right: 2px;
  }
`;

export default CheckoutLayout;
