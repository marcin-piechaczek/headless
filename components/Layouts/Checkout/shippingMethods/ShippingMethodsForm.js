import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import SET_SHIPPING_METHOD from '../../../../queries/checkout/setShippingMethods.graphql';

const ShippingMethodsForm = ({ cartId, shippingMethods }) => {
  const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD);

  const handleShippingMethodChange = (shippingMethod) => {
    const { carrier_code, method_code } = shippingMethod;
    setShippingMethod({
      variables: {
        cartId,
        carrier_code,
        method_code
      }
    });
  };
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg mt-5 w-full">
        <ShippingMethodsWrapperStyled className="px-6 py-4">
          <div className="font-bold text-xl mb-2">2. Shipping Methods</div>

          {shippingMethods.map((shippingMethod) => (
            <label className="inline-flex items-center mb-2" key={shippingMethod.carrier_code}>
              <input
                type="radio"
                className="form-radio"
                name="accountType"
                value={shippingMethod.carrier_code}
                onChange={() => handleShippingMethodChange(shippingMethod)}
              />
              <span className="ml-2 w-full flex">
                {shippingMethod.carrier_title}
                <ShippingMethodsPriceStyled>
                  <span className="price">{shippingMethod.price_incl_tax.value}</span>
                  <span className="price">{shippingMethod.price_incl_tax.currency}</span>
                </ShippingMethodsPriceStyled>
              </span>
            </label>
          ))}
        </ShippingMethodsWrapperStyled>
      </div>
    </>
  );
};

const ShippingMethodsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShippingMethodsPriceStyled = styled.span`
  display: flex;
  margin-left: 10px;
  span {
    display: flex;
    flex-direction: row;
  }
`;

export default ShippingMethodsForm;
