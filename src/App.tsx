import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { inject, observer, Provider } from "mobx-react";
import { mainTheme } from "./assets/styles/_colors";
import Routes from "./components/routes/Routes";
import { startAuthListener, startAuth } from "./services/firebase.srevice";
import { AllStores } from "./models/all-stores.model";
import uiStore, { UiStore } from "./stores/ui.store";
import { editorStore } from "./stores/editor.store";

interface Props {
  uiStore?: UiStore;
  isLogged?: boolean;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.uiStore.isLogged,
}))
@observer
class App extends Component<Props> {
  componentDidMount() {
    if (!this.props.isLogged) {
      startAuth();
      startAuthListener(this.signIn, this.signOut);
    }
  }

  private signIn = (payload: any) => {
    this.props.uiStore!.setIsLogged(true);
    this.props.uiStore!.setDisplayName(payload.displayName);
  };
  private signOut = () => {
    this.props.uiStore!.setIsLogged(false);
    this.props.uiStore!.setDisplayName("");
  };

  render() {
    return (
      <ThemeProvider theme={mainTheme}>
        {!this.props.isLogged ? (
          <div id="firebaseui-auth-container" />
        ) : (
          <Routes />
        )}
      </ThemeProvider>
    );
  }
}

export default () => (
  <Provider uiStore={uiStore} editorStore={editorStore}>
    <App />
  </Provider>
);
