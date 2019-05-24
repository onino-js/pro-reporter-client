import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { TextareaInput } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { ReportStore } from "../../../../stores/report.store";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";
import { MultilineTextStore } from "../../../../stores/inputs/multiline-text";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: MultilineTextStore;
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
class MultilineTextDirect extends React.Component<Props> {
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
          input={input}
        >
          <TextareaInput
            rows={4}
            value={input.value}
            onChange={this.setValue}
          />
        </InputLayoutDirect>
      </InputContainer>
    );
  }
}

export default MultilineTextDirect;
