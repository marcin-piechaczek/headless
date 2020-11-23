import styled from 'styled-components';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import RESET_PASS from '../../queries/resetPass/Resetpass.graphql';
import {useMutation} from "@apollo/client";
import router from 'next/router';

const ResetPass = () => {
    const [resetPass, { data: resetPassword, error }] = useMutation(RESET_PASS);
    const resetPassSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        confirmNewPassword: Yup.string()
            .required('Required')
            .test('passwords-match', 'Passwords must match', function(value){
                return this.parent.newPassword === value
            }),
    });

    console.log("reset: ", resetPassword);

    return (

        <Formik
            initialValues={{
                newPassword: '',
                confirmNewPassword: '',
            }}
            validationSchema={resetPassSchema}
            onSubmit={async (values) => {
                await resetPass({
                    variables: {
                        resetPassEmail: 'kuba.chrzan@smartmage.pl',
                        resetPassToken: 'HmRiOa2WioP56z4njqFFDVScnhOTJekb',
                        resetPassNewPass: values.newPassword,
                        resetPassConfirmNewPassword: values.confirmNewPassword
                    }
                })
            }}>

            {({ errors, touched, values, handleChange }) => (

                <FormWrapperStyled>

                    <Form className="bg-white px-8 pt-6 pb-8 mb-4">

                        <FieldsetWrapperStyled>

                            <legend>Reset Password</legend>

                            {error?.message && (
                                <div className="text-red-500 text-xs italic mb-5">{error?.message}</div>
                            )}

                            {resetPassword && (
                                <div className="text-green-500 text-xs italic mb-5">Poprawnie ustawiono nowe hasło!</div>
                            )}

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                    New password*
                                </label>
                                <Field
                                    name="newPassword"
                                    type="password"
                                    id="newPassword"
                                    placeholder="New password"
                                    value={values.newPassword}
                                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.newPassword && touched.newPassword && (
                                    <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                                    Confirm new password*
                                </label>
                                <Field
                                    name="confirmNewPassword"
                                    type="password"
                                    id="confirmNewPassword"
                                    placeholder="Confirm new password"
                                    value={values.confirmNewPassword}
                                    className="shadow mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.confirmNewPassword && touched.confirmNewPassword && (
                                    <p className="text-red-500 text-xs italic">{errors.confirmNewPassword}</p>
                                )}
                            </div>

                        </FieldsetWrapperStyled>

                        <SubmitButtonStyled
                            type="submit"
                            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                            Set a New Password
                        </SubmitButtonStyled>

                </Form>

                </FormWrapperStyled>

            )}

        </Formik>

    );
};

export default ResetPass;

const FormWrapperStyled = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
`;

const FieldsetWrapperStyled = styled.fieldset`
    padding: 20px 0 0;
`;

const SubmitButtonStyled = styled.button`
    width: 280px;
    height: 50px;
    margin: 20px 0 0;
    display: block;
`;
