import React from 'react';
import { Field, Form, Formik } from 'formik';
import Region from '../shippingInformation/Region';
import styled from 'styled-components';
import * as Yup from 'yup';

const BillingAddress = ({ countries, cartId }) => {
  const billingSchema = Yup.object().shape({
    billingFirstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    billingLastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    billingStreet: Yup.string().required('Required'),
    billingCity: Yup.string().required('Required'),
    billingRegion: Yup.string().required('Required'),
    billingPostcode: Yup.string().required('Required'),
    billingCountry_code: Yup.string().required('Required'),
    billingTelephone: Yup.string().required('Required')
  });

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          street: '',
          city: '',
          region: '',
          postcode: '',
          country_code: '',
          telephone: ''
        }}
        validationSchema={billingSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ errors, touched }) => (
          <Form className="bg-white rounded pt-6 pb-8 mb-4">
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
                  {countries ? (
                    <>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.full_name_locale}
                        </option>
                      ))}
                    </>
                  ) : null}
                </Field>
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
            <SaveButtonStyled
              type="submit"
              // disabled={isSubmitting}
              className="px-3 py-2 bg-green-400 text-white text-xs font-bold uppercase rounded">
              Save
            </SaveButtonStyled>
          </Form>
        )}
      </Formik>
    </>
  );
};

const SaveButtonStyled = styled.button`
  width: 70px;
  height: 40px;
  margin: 20px auto;
`;

export default BillingAddress;
