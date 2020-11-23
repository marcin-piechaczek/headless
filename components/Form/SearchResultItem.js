import React, { useRef } from "react";
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import SEARCH_RESULT_QUERY from '../../queries/search/Result.graphql';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";
import {toggleSearchResultAction} from "../../store/actions/storeSettings";
import useOutsideClick from "../useOutsideClick/useOutsideClick";

const SearchResultItem = ({ query }) => {
    const { searchBlockResultItem } = useSelector(getStoreSettings);
    const dispatch = useDispatch();
    const SearchResultList = (value) => {
        dispatch(toggleSearchResultAction({
            data: {
                search: value
            }
        }));
    };

    const { loading, error, data } = useQuery(SEARCH_RESULT_QUERY, {
        fetchPolicy: "network-only",
        variables: { query }
    });

    const ref = useOutsideClick(() => {
        SearchResultList({state: false, value: ''})
    });

    if(loading) return <AutoCompleteResult><p>Loading...</p></AutoCompleteResult>;

    if(error) return `Error! ${error}`;

    return(
        <>
            <AutoCompleteResult ref={ref}>
                {data?.products.items.map(prod => (
                    <AutoCompleteResultItem key={prod.id}>
                        <AutoCompleteResultItemImage><img src={prod.image.url} width="60" /></AutoCompleteResultItemImage>
                        <AutoCompleteResultItemName>
                            <Link
                                href={{
                                    pathname: '_url-resolver',
                                    query: {
                                        pathname: `/${prod.url_key + prod.url_suffix}`,
                                        type: 'PRODUCT'
                                    }
                                }}
                                as={`/${prod.url_key + prod.url_suffix}`}>
                                <a>{prod.name}</a>
                            </Link>
                        </AutoCompleteResultItemName>
                        <AutoCompleteResultItemPrice>{prod.price_range.minimum_price.final_price.value}{prod.price_range.minimum_price.final_price.currency}</AutoCompleteResultItemPrice>
                    </AutoCompleteResultItem>
                ))}
            </AutoCompleteResult>
        </>
    );
};

const AutoCompleteResult = styled.div`
    position: absolute;
    top: 40px;
    background: #f9f9f9;
    z-index: 2;
`;

const AutoCompleteResultItem = styled.div`
    margin: 5px 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const AutoCompleteResultItemImage = styled.div`
    flex: 0 0 auto;
    width: 60px;
`;

const AutoCompleteResultItemName = styled.div`
    flex: 0 1 auto;
    width: calc(100% - 60px - 100px);
`;

const AutoCompleteResultItemPrice = styled.div`
    flex: 0 0 auto;
    width: 100px;
    text-align: right;
`;

export default SearchResultItem
