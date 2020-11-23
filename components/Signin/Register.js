import styled from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import REGISTER from '../../queries/register/Register.graphql';
import {useMutation} from "@apollo/client";
import {setRegister, setSignIn} from "../../store/actions/storeSettings";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";

const Register = () => {
    const dispatch = useDispatch();
    const { signInOpen } = useSelector(getStoreSettings);
    const toggleUserMenu = () => {
        dispatch(setSignIn({
            data: {
                signIn: !signInOpen
            }
        }));
    };
    const { registerOpen } = useSelector(getStoreSettings);
    const toggleRegister = () => {
        dispatch(setRegister({
            data: {
                register: !registerOpen
            }
        }));
    };
    const [register, { data: customer, error }] = useMutation(REGISTER);
    const registerInSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    return (

        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                is_subscribed: false,
                checked: [],
            }}
            validationSchema={registerInSchema}
            onSubmit={async (values) => {
                const {firstname, lastname, email, password, isSubscibed} = values;
                await register({
                    variables: {
                        firstname,
                        lastname,
                        email,
                        password,
                        isSubscibed,
                    }
                })
            }}>

            {({ errors, touched, values, handleChange }) => (

                <Form className="bg-white px-8 pt-6 pb-8 mb-4">

                    <FieldsetWrapperStyled>

                            {error?.message && (
                                <div className="text-red-500 text-xs italic mb-5">{error?.message}</div>
                            )}

                            {customer && (
                                <div className="text-green-500 text-xs italic mb-5">Udana rejestracja <strong>{customer?.createCustomer.customer.firstname}</strong>! Witamy na pokładzie! Sprawdź najszybszy koszyk w mieście.</div>
                            )}

                            {customer?.createCustomer.customer.is_subscribed && (
                                <div className="text-green-500 text-xs italic mb-5">Zostałeś także zapisany do naszego newslettera!</div>
                            )}

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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <Field
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    value={values.email}
                                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-xs italic">{errors.email}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={values.password}
                                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.password && touched.password && (
                                    <p className="text-red-500 text-xs italic">{errors.password}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <CheckboxStyled>Subscribe to news and updates
                                    <Field
                                        type="checkbox"
                                        name="isSubscibed"
                                        className="checkbox-subscription"
                                    />
                                </CheckboxStyled>
                            </div>

                            <ButtonsWrapperStyled>

                                <CancelButtonStyled
                                    onClick={() => { toggleUserMenu(); toggleRegister();}}
                                    type="button"
                                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                    Cancel
                                </CancelButtonStyled>

                                <CreateAccountButtonStyled
                                    type="submit"
                                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                    Create an account
                                </CreateAccountButtonStyled>

                            </ButtonsWrapperStyled>

                        </FieldsetWrapperStyled>

                </Form>

            )}

        </Formik>

    );
};

export default Register;

const FieldsetWrapperStyled = styled.fieldset`
    padding: 20px 0 0;
`;

const ButtonsWrapperStyled = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const CheckboxStyled = styled.label`
    padding-left: 20px;
    position: relative;
    input[type="checkbox"] {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
`;

const CancelButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 0;
    display: block;
`;

const CreateAccountButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 0;
    display: block;
`;
