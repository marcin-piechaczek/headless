import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

const OrderThankYou = ({ orderNumber }) => {
  const client = useApolloClient();

  const cleanUp = () => {
    localStorage.clear();
    client.cache.reset();
  };

  useEffect(() => {
    return cleanUp;
  }, []);

  return (
    <>
      <h1>Thank you for your purchase!</h1>
      <h3>Your order # is: {orderNumber}</h3>
    </>
  );
};

export default OrderThankYou;
