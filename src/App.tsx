import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { inject, observer, Provider } from "mobx-react";
import { mainTheme } from "./assets/styles/_colors";
import Routes from "./components/routes/Routes";
import { startAuthListener, startAuth } from "./services/firebase.srevice";
import { AllStores } from "./models/all-stores.model";
import uiStore, { UiStore } from "./stores/ui.store";
import { Report } from "./stores/report";
import reportStore from "./stores/report.store";
import authStore, { AuthStore } from "./stores/auth.store";
import * as firebase from "firebase";
import styled from "./styled-components";

interface Props {
  uiStore?: UiStore;
  authStore?: AuthStore;
  isLogged?: boolean;
}

const AuthContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: "red";
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  authStore: allStores.authStore,
  isLogged: allStores.authStore.isLogged,
}))
@observer
class App extends Component<Props> {
  componentDidMount() {
    // firebaseui.start('#firebaseui-auth-container', {
    //   signInOptions: [
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID
    //   ],
    //   // Other config options...
    // });
    console.log(firebase.auth().currentUser);
    if (!this.props.isLogged) {
      startAuth();
      startAuthListener(this.signIn, this.signOut);
    }
  }

  private signIn = (payload: any) => {
    this.props.authStore!.setIsLogged(true);
    this.props.authStore!.setDisplayName(payload.displayName);
  };
  private signOut = () => {
    this.props.authStore!.setIsLogged(false);
    this.props.authStore!.setDisplayName("");
  };

  render() {
    console.log("logged", this.props.isLogged);
    return (
      <ThemeProvider theme={mainTheme}>
        {!this.props.isLogged ? (
          <React.Fragment>
            <AuthContainer id="firebaseui-auth-container" />
            {/* <LoadingContainer id="loading">Loading</LoadingContainer> */}
          </React.Fragment>
        ) : (
          <Routes />
        )}
      </ThemeProvider>
    );
  }
}

export default () => (
  <Provider
    uiStore={uiStore}
    Report={Report}
    reportStore={reportStore}
    authStore={authStore}
  >
    <App />
  </Provider>
);
