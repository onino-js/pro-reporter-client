import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import logo from "./../../assets/images/proreporter-logo.png";
import styled from "./../../styled-components";
import { _measures } from "../../assets/styles/_measures";

interface Props {
  uiConfig: any;
  firebaseAuth: any;
}

const SigninContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.disabled};
`;

const LogoImg = styled.img`
  width: 400px;
  margin-bottom: 20px;
  @media (max-width: ${_measures.mobile}px) {
    width: 250px;
  }
`;

class Signin extends Component<Props> {
  render() {
    return (
      <SigninContainer>
        <LogoImg src={logo} alt="pro-reporter logo" />
        {/* <h3>Veuillez vous identifier</h3> */}
        <StyledFirebaseAuth
          // uiCallback={ui => {
          //   document.getElementById("loading")!.style.display = "none";
          // }}
          uiConfig={this.props.uiConfig}
          firebaseAuth={this.props.firebaseAuth}
        />
        {/* <AuthContainer id="firebaseui-auth-container" /> */}
      </SigninContainer>
    );
  }
}

export default Signin;
