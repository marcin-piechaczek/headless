import React, { useEffect }from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import SearchResultItem from '../Form/SearchResultItem';
import {useDispatch, useSelector} from "react-redux";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";
import {toggleSearchResultAction} from "../../store/actions/storeSettings";
import { useRouter } from 'next/router';

const SearchForm = () => {
    const router = useRouter();
    const { searchBlockResultItem } = useSelector(getStoreSettings);
    const dispatch = useDispatch();
    const SearchResultList = (value) => {
        dispatch(toggleSearchResultAction({
            data: {
                search: value
            }
        }));
    };

    const SearchSchema = Yup.object().shape({
        product: Yup.string()
            .min(3, 'Szukana fraza jest za krótka')
            .max(30, 'Szukana fraza jest za długa')
            .required('Wpisz szukaną fraze!'),
    });

    const inputHandleChange = (result) => {
        if(result.target.value.length > 3) {
            SearchResultList({state: true, value: result.target.value});
        } else {
            SearchResultList({state: false, value: ''});
        }
    };

    return(
        <>
            {searchBlockResultItem.state && <SearchResultItem query={searchBlockResultItem.value} /> }

            <Formik
                enableReinitialize
                initialValues={{product: ''}}
                validationSchema={SearchSchema}
                onSubmit={values => {
                    SearchResultList({state: false, value: ''});

                    router.push({
                        pathname: '/search.html',
                        query: {
                            type: 'CATEGORY',
                            q:  values.product
                        }
                    });
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <FormWrapper>
                            <div>
                                <input name="product"  value={values.product}
                                       onChange={(e) => {
                                           handleChange(e);
                                           inputHandleChange(e)}
                                       }
                                />
                                {errors.product && touched.product ? (
                                    <FormValidateError>{errors.product}</FormValidateError>) : null}
                            </div>
                            <SearchButtonStyled type="submit">Szukaj</SearchButtonStyled>
                        </FormWrapper>
                    </Form>
                )}
            </Formik>
        </>
    );
};
const SearchButtonStyled = styled.button`
    padding: 0px 10px;
    height: 25px;
    background: #2d3748;
    color: #fff;
    display: flex;
`;

const FormWrapper = styled.div`
    display: flex;
    align-item: center;
`;

const FormValidateError = styled.div`
    color: red;
    font-size: 12px;
`;

export default SearchForm;




