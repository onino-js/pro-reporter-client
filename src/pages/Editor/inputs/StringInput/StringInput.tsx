import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  layout?: any;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class StringInput extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input.setValue(e.currentTarget.value);
  };
  public render() {
    return (
      <InputLayoutStandard input={this.props.input}>
        <InputPrimitive
          type="text"
          value={this.props.input!.value}
          onChange={this.setValue}
        />
      </InputLayoutStandard>
    );
  }
}

export default StringInput;
