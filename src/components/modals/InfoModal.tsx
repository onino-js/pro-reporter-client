import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";

interface Props {
  show: boolean;
  close: () => void;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class InfoModal extends React.Component<Props> {
  componentDidMount() {}
  public render() {
    return (
      <ProModal
        show={this.props.show}
        close={this.props.close}
        headerTitle={"A propos"}
        width={["50%", "100%"]}
        height={["auto", "auto"]}
      >
        <ProContainer>
          <p>Version 1.0.10 (Beta) </p>
          <p>Copyright Onino.js. 2019. Tous droits réservés.</p>
          <a
            href="https://condition-utilisation.firebaseapp.com/"
            target="_blank"
          >
            Voir les conditions d'utilisation
          </a>
        </ProContainer>
      </ProModal>
    );
  }
}

export default InfoModal;
