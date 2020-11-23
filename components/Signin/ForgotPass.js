import styled from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FORGOT_PASS from '../../queries/forgotPass/Forgotpass.graphql';
import {useMutation} from "@apollo/client";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";
import {setSignIn, setForgotPass} from "../../store/actions/storeSettings";

const ForgotPass = () => {
    const dispatch = useDispatch();
    const [forgotPass, { data: requestPasswordResetEmail, error }] = useMutation(FORGOT_PASS);
    const forgotPassSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
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

    return (

        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={forgotPassSchema}
            onSubmit={async (values) => {
                await forgotPass({
                    variables: {
                        forgotPassEmail: values.email,
                    }
                })
            }}>

            {({ errors, touched, values, handleChange }) => (

                <Form className="bg-white px-8 pt-6 pb-8 mb-4">

                    <FieldsetWrapperStyled>

                        <legend>Recover Password</legend>

                        <div className="mb-5">Please enter the email address associated with this account.</div>

                        {error?.message && (
                            <div className="text-red-500 text-xs italic mb-5">{error?.message}</div>
                        )}

                        {requestPasswordResetEmail && (
                            <div className="text-green-500 text-xs italic mb-5">Wysłano email z linkiem do resetu hasła!</div>
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

                        <ButtonsWrapperStyled>

                            <CancelButtonStyled
                                onClick={() => { toggleSignIn(); toggleForgotPass() }}
                                type="button"
                                className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                Cancel
                            </CancelButtonStyled>

                            <SubmitButtonStyled
                                type="submit"
                                className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                Submit
                            </SubmitButtonStyled>

                        </ButtonsWrapperStyled>

                    </FieldsetWrapperStyled>

                </Form>

            )}

        </Formik>

    );
};

export default ForgotPass;

const FieldsetWrapperStyled = styled.fieldset`
    padding: 20px 0 0;
`;

const ButtonsWrapperStyled = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const CancelButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 20px auto 0;
    display: block;
`;

const SubmitButtonStyled = styled.button`
    width: 140px;
    height: 50px;
    margin: 20px auto 0;
    display: block;
`;
