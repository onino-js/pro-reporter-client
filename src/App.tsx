import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { inject, observer, Provider } from "mobx-react";
import { mainTheme } from "./assets/styles/_colors";
import Routes from "./components/routes/Routes";
import { AllStores } from "./models/all-stores.model";
import uiStore, { UiStore } from "./stores/ui.store";
import reportStore from "./stores/report.store";
import authStore, { AuthStore } from "./stores/auth.store";
import * as firebase from "firebase";
import templateStore, { TemplateStore } from "./stores/templateStore";
import Signin from "./pages/Signin/Signin";
import firebaseStore from "./stores/firebaseStore";

const config = {
  apiKey: "AIzaSyBDHfw2EEgmWWIE7V7lPgpPLScx8C3lnVo",
  authDomain: "gham-f07f7.firebaseapp.com",
  databaseURL: "https://gham-f07f7.firebaseio.com",
  projectId: "gham-f07f7",
  storageBucket: "gham-f07f7.appspot.com",
  messagingSenderId: "1065942140105",
};
firebase.initializeApp(config);

interface Props {
  uiStore?: UiStore;
  authStore?: AuthStore;
  isLogged?: boolean;
  templateStore?: TemplateStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  authStore: allStores.authStore,
  isLogged: allStores.authStore.isLogged,
  templateStore: allStores.templateStore,
}))
@observer
class App extends Component<Props> {
  state = {
    isSignedIn: false, // Local signed-in state.
  };
  private unregisterAuthObserver: any = null;

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    !this.props.uiStore!.isTemplatesLoaded &&
      this.props.templateStore!.getTemplates(() =>
        this.props.uiStore!.setIsTemplatesLoaded(true),
      );

    firebase.auth().languageCode = "fr";
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      user && this.props.authStore!.setUserId(user!.uid);
      this.setState({ isSignedIn: !!user });
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        {!this.state.isSignedIn ? (
          <Signin uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
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
    reportStore={reportStore}
    authStore={authStore}
    templateStore={templateStore}
    firebaseStore={firebaseStore}
  >
    <App />
  </Provider>
);
