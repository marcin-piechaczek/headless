import styled, { keyframes } from 'styled-components';
import {useSelector} from "react-redux";
import {getStoreSettings} from "../../store/reducers/root/storeSettings";
import SignIn from "./SignIn";
import ForgotPass from "./ForgotPass";
import Register from "./Register";
import React from "react";

const SignInWrapper = () => {

    const { signInOpen, forgotPassOpen, registerOpen } = useSelector(getStoreSettings);

    return (
        <>
            <FormWrapperStyled className="max-w-sm rounded overflow-hidden shadow-lg">

                {signInOpen ? <SignIn /> : null}

                {forgotPassOpen ? <ForgotPass /> : null}

                {registerOpen ? <Register /> : null}

            </FormWrapperStyled>
        </>
    )
}

export default SignInWrapper;

const rotate = keyframes`
  from {
    top: 30px;
  }

  to {
    top: 74px;
  }
`;

const FormWrapperStyled = styled.div`
    position: fixed;
    right: 10px;
    top: 74px;
    width: 440px;
    background: white;
    animation: ${rotate} 0.2s linear;
    overflow-y: scroll;
    z-index: 9;
`;