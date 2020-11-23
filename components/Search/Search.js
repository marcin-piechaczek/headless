import React from 'react';
import styled from 'styled-components';
import SearchForm from '../Form/SearchForm';
import SearchClose from '../Buttons/SearchClose';

const Search = () => {
    return(
        <>
        <WrapperSearch>
            <SearchForm/>
            <SearchClose/>
        </WrapperSearch>
        </>
    );
};

const WrapperSearch = styled.div`
    position: relative;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
`;

export default Search;