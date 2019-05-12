import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { UiStore } from "../../../../stores/ui.store";
import { SimpleDateStore } from "../../../../stores/inputs/simple-date";
import { DatePicker } from "antd";
import moment from "moment";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: SimpleDateStore;
  layout?: any;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class SimpleDateInput extends React.Component<Props> {
  private setValue = (date: any, dateString: string) => {
    this.props.input!.setValue(dateString);
  };
  public render() {
    const input = this.props.input!;
    return (
      <InputLayoutStandard input={input}>
        <DatePicker
          onChange={this.setValue}
          value={moment(input.value || new Date())}
        />
      </InputLayoutStandard>
    );
  }
}

export default SimpleDateInput;
