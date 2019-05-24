import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import { UiStore, IinputDescription } from "../../stores/ui.store";

interface Props {
  uiStore?: UiStore;
  inputDescription?: IinputDescription;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  inputDescription: allStores.uiStore.inputDescription,
}))
@observer
class InputDescriptionModal extends React.Component<Props> {
  componentDidMount() {}
  private close = () => {
    this.props.uiStore!.hideModal("input-description");
  };

  componentDidUpdate(prevProps: Props, prevState: any) {
    if (
      prevProps.inputDescription!.content !==
      this.props.inputDescription!.content
    ) {
      console.log("bley");
      this.renderDescription();
    }
  }

  private renderDescription = () => {
    const desType = this.props.inputDescription!.type;
    console.log(desType);
    switch (desType) {
      case "text":
        break;
      case "svg":
        const svgEl: HTMLElement = document.getElementById(
          "svg-input-description",
        )!;
        svgEl.innerHTML = this.props.inputDescription!.content;
        break;
    }
  };

  public render() {
    return (
      <ProModal
        show={this.props.uiStore!.showInputDesctiptionModal}
        close={this.close}
        headerTitle={"A propos"}
        width={["50%", "100%"]}
        height={["auto", "auto"]}
      >
        <ProContainer>
          <svg
            id="svg-input-description"
            width="100%"
            height="auto"
            viewBox="0 0 744.09449 1052.3622"
          />
        </ProContainer>
      </ProModal>
    );
  }
}

export default InputDescriptionModal;
