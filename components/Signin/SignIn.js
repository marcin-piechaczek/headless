import styled from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SIGN_IN from '../../queries/signin/Signin.graphql';
import {useMutation} from "@apollo/client";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";
import {setForgotPass, setRegister, setSignIn} from "../../store/actions/storeSettings";

const SignIn = () => {
    const dispatch = useDispatch();
    const [signIn, { data: token, error }] = useMutation(SIGN_IN);
    const signInSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });
    const { signInOpen } = useSelector(getStoreSettings);
    const toggleSignIn = () => {
        dispatch(setSignIn({
            data: {
                signIn: !signInOpen
            }
        }));
    };
    const { forgotPassOpen } = useSelector(getStoreSettings);
    const toggleForgotPass = () => {
        dispatch(setForgotPass({
            data: {
                forgotPass: !forgotPassOpen
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

    return (

        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={signInSchema}
            onSubmit={async (values) => {
                   await signIn({
                    variables: {
                        signInEmail: values.email,
                        signInPassword: values.password
                    }
                })
            }}>

            {({ errors, touched, values, handleChange }) => (

                <Form className="bg-white px-8 pt-6 pb-8 mb-4">

                    <FieldsetWrapperStyled>

                        <legend>Sign-in to Your Account</legend>

                        {error?.message && (
                            <div className="text-red-500 text-xs italic mb-5">{error?.message}</div>
                        )}

                        {token && (
                            <div className="text-green-500 text-xs italic mb-5">Poprawnie zalogowano! (Otrzymano token)</div>
                        )}

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
                            <LinkWrapperStyled onClick={() => { toggleSignIn(); toggleForgotPass();}}>Forgot Password?</LinkWrapperStyled>
                        </div>

                        <SignInButtonStyled
                            type="submit"
                            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                            Sign in
                        </SignInButtonStyled>

                        <CreateAccountButtonStyled
                            onClick={() => { toggleSignIn(); toggleRegister();}}
                            type="button"
                            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                            Create an account
                        </CreateAccountButtonStyled>

                    </FieldsetWrapperStyled>

                </Form>

            )}

        </Formik>

    );
};

export default SignIn;

const FieldsetWrapperStyled = styled.fieldset`
    padding: 20px 0 0;
`;

const SignInButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 20px auto 0;
    display: block;
`;

const LinkWrapperStyled = styled.button`
    text-decoration: underline;
    cursor: pointer;
`;

const CreateAccountButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 20px auto 0;
    display: block;
`;
