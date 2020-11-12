import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import SET_PAYMENT_METHOD from '../../../../queries/checkout/setPaymentMethod.graphql';

const PaymentMethodsForm = ({ paymentMethods, cartId }) => {
  const [setPaymentMethod] = useMutation(SET_PAYMENT_METHOD);

  const handlePaymentMethodChange = (paymentMethod) => {
    setPaymentMethod({
      variables: {
        cartId,
        paymentMethod
      }
    });
  };
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg mt-5 w-full">
        <PaymentMethodsWrapperStyled className="px-6 py-4">
          <div className="font-bold text-xl mb-2">3. Payment Methods</div>

          {paymentMethods.map((paymentMethod) => (
            <label key={paymentMethod.code} className="inline-flex items-center mb-2">
              <input
                type="radio"
                className="form-radio"
                name="accountType"
                value={paymentMethod.id}
                onChange={() => handlePaymentMethodChange(paymentMethod.code)}
              />
              <span className="ml-2 w-full flex">{paymentMethod.title}</span>
            </label>
          ))}
        </PaymentMethodsWrapperStyled>
      </div>
    </>
  );
};

const PaymentMethodsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PaymentMethodsForm;
