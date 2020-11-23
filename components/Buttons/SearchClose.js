import React from 'react';
import styled from "styled-components";
import {toggleSearchAction, toggleSearchResultAction} from "../../store/actions/storeSettings";
import {useDispatch, useSelector} from "react-redux";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";

const SearchClose = () => {

    const { searchOpen } = useSelector(getStoreSettings);
    const { searchBlockResultItem } = useSelector(getStoreSettings);
    const dispatch = useDispatch();
    const toggleSearch = () => {
        dispatch(toggleSearchAction({
            data: {
                search: !searchOpen
            }
        }));

        dispatch(toggleSearchResultAction({
            data: {
                search: {state: false, value: ''}
            }
        }));
    };

    return(
        <>
            <ButtonClose onClick={toggleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 329.26933 329" width="15px" fill="#fff"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
            </ButtonClose>
        </>
    );
};
const ButtonClose = styled.button`
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 25px;
    height: 25px;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default SearchClose;