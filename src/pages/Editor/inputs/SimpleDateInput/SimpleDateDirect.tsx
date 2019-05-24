import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { UiStore } from "../../../../stores/ui.store";
import { ReportStore } from "../../../../stores/report.store";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";
import { SimpleDateStore } from "../../../../stores/inputs/simple-date";
import { DatePicker } from "antd";
import moment from "moment";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: SimpleDateStore;
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
class SimpleDateDirect extends React.Component<Props> {
  private setValue = (date: any, dateString: string) => {
    this.props.input!.setValue(dateString);
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
          <DatePicker
            onChange={this.setValue}
            value={moment(input.value || new Date())}
          />
        </InputLayoutDirect>
      </InputContainer>
    );
  }
}

export default SimpleDateDirect;
