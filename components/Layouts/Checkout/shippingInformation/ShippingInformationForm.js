import styled from 'styled-components';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import Region from './Region';
import SET_SHIPPING_ADDRESS from '../../../../queries/checkout/setShippingAddress.graphql';
import SET_BILLING_ADDRESS from '../../../../queries/checkout/setBillingAddress.graphql';
import SET_GUEST_EMAIL from '../../../../queries/checkout/setGuestEmail.graphql';
import IS_EMAIL_AVAILABLE from '../../../../queries/checkout/isEmailAvailable.graphql';
import Loader from '../../../Loader/Loader';

const ShippingInformationFormSummary = ({ countries, loading, cartId }) => {
  const [
    setShippingAddress,
    { data: shippingAddress, loading: settingShippingAddress }
  ] = useMutation(SET_SHIPPING_ADDRESS);
  const [setBillingAddress] = useMutation(SET_BILLING_ADDRESS);
  const [setGuestEmail] = useMutation(SET_GUEST_EMAIL);
  const [isEmailAvailable, { data }] = useLazyQuery(IS_EMAIL_AVAILABLE);

  const checkoutSchema = Yup.object().shape({
    firstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
      .test('isEmailAvailable', 'Email already registered', async (email) => {
        if (email) {
          await isEmailAvailable({
            variables: {
              email
            }
          });
          return data?.isEmailAvailable.is_email_available;
        }
        return false;
      }),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    region: Yup.string().required('Required'),
    postcode: Yup.string().required('Required'),
    country_code: Yup.string().required('Required'),
    telephone: Yup.string().required('Required')
  });

  return (
    <>
      {settingShippingAddress && !shippingAddress ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{
            email: '',
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            region: '',
            postcode: '',
            country_code: '',
            telephone: '',
            useForBillingAddress: true
          }}
          validationSchema={checkoutSchema}
          onSubmit={async (values) => {
            const formValues = {
              ...values
            };
            delete formValues.useForBillingAddress;
            delete formValues.email;

            await setGuestEmail({
              variables: {
                cartId,
                email: values.email
              }
            });

            await setShippingAddress({
              variables: {
                cartId,
                shippingAddress: formValues
              }
            });

            if (values.useForBillingAddress) {
              await setBillingAddress({
                variables: {
                  cartId,
                  billingAddress: formValues
                }
              });
            }
          }}>
          {({ errors, touched, values, handleChange }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                  First Name
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                />
                {errors.firstname && touched.firstname && (
                  <p className="text-red-500 text-xs italic">{errors.firstname}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                />
                {errors.lastname && touched.lastname && (
                  <p className="text-red-500 text-xs italic">{errors.lastname}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                  Street Address
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Street Address"
                />
                {errors.street && touched.street && (
                  <p className="text-red-500 text-xs italic">{errors.street}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city">
                  City
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-xs italic">{errors.city}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country_code">
                  Country
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    autoComplete="none"
                    name="country_code"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="country_code">
                    <option value="" disabled hidden>
                      Select country
                    </option>
                    {!loading && countries ? (
                      <>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.full_name_locale}
                          </option>
                        ))}
                      </>
                    ) : null}
                  </Field>
                  {errors.country_code && touched.country_code && (
                    <p className="text-red-500 text-xs italic">{errors.country_code}</p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <Region name="region" countries={countries} />
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postcode">
                  Zip
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="postcode"
                  id="postcode"
                  placeholder="Zip"
                />
                {errors.postcode && touched.postcode && (
                  <p className="text-red-500 text-xs italic">{errors.postcode}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                  Phone Number
                </label>
                <Field
                  className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="string"
                  name="telephone"
                  id="telephone"
                  placeholder="Phone number"
                />
                {errors.telephone && touched.telephone && (
                  <p className="text-red-500 text-xs italic">{errors.telephone}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <Field
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="useForBillingAddress"
                    name="useForBillingAddress"
                  />
                  <span className="text-sm">Billing address is the same</span>
                </label>
              </div>
              {values.useForBillingAddress ? null : <div>Form</div>}
              <CheckoutButtonStyled
                type="submit"
                // disabled={isSubmitting}
                className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                Continue to Shipping Method
              </CheckoutButtonStyled>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ShippingInformationFormSummary;

const CheckoutButtonStyled = styled.button`
  width: 150px;
  height: 50px;
  margin: 20px auto;
`;
