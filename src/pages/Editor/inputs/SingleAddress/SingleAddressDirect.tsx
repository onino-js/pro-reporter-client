import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { ReportStore } from "../../../../stores/report.store";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";
import { SingleAddressStore } from "../../../../stores/inputs/single-address";
import { ActionButton } from "../../../../components/ui/Buttons";
import SingleAddressChoiceModal from "./SingleAddressChoiceModal";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: SingleAddressStore;
  reportStore?: ReportStore;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  reportStore: allStores.reportStore,
}))
@observer
class SingleAddressDirect extends React.Component<Props> {
  public state = {
    showChoiceModal: false,
  };
  private setValue = (e: any) => {
    this.props.input!.setValue(e.currentTarget.value);
  };
  public onOk = () => {
    this.props.input!.confirmValue();
    this.props.uiStore!.setIsInputModalOpen(false);
    this.props.reportStore!.renderInput({
      id: this.props.input!.id,
      type: this.props.input!.inputRef.type,
      value: this.props.input!.value,
    });
    this.props.reportStore!.fieldHighlighted &&
      this.props.reportStore!.renderContainers();
  };
  public onCancel = () => {
    this.props.input!.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public onRefresh = () => {
    this.props.input!.reset();
  };
  public geoloc = () => {
    this.props.input!.geoloc();
  };
  public closeChoiceModal = () => this.props.input!.setShowChoiceModal(false);
  public confirmAddressChoice = () => {
    this.props.input!.setShowChoiceModal(false);
  };

  public render() {
    const input = this.props.input!;
    return (
      <InputContainer
        close={this.onCancel}
        visible={this.props.uiStore!.isInputModalOpen}
      >
        <InputLayoutDirect
          label={input.inputRef.label}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onRefresh={this.onRefresh}
          status={input.status}
        >
          <InputPrimitive
            type="text"
            value={input.value}
            onChange={this.setValue}
          />
          <ActionButton onClick={this.geoloc} icon="map-marker-alt" />
        </InputLayoutDirect>
        <SingleAddressChoiceModal
          show={input.showChoiceModal}
          close={this.closeChoiceModal}
          onOk={this.confirmAddressChoice}
          list={this.props.input!.foundAddresses}
        />
      </InputContainer>
    );
  }
}

export default SingleAddressDirect;
