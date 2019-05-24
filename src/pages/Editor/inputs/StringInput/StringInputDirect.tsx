import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { ReportStore } from "../../../../stores/report.store";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { StringStore } from "../../../../stores/inputs/string";
import { InputContainer } from "../../../../components/layouts/InputContainer";
import { InputList } from "../layouts/InputList";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: StringStore;
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
class StringInputDirect extends React.Component<Props> {
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
    const list = this.props.input!.inputRef.list;
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
          <InputPrimitive
            type="text"
            value={input.value}
            onChange={this.setValue}
          />
          {list && <InputList list={list} setValue={input.setValue} />}
        </InputLayoutDirect>
      </InputContainer>
    );
  }
}

export default StringInputDirect;
