import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { SelectButton } from "../layouts/EditorButtons";

interface Props {
  inputId: string;
  input?: any;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class SingleSelectInput extends React.Component<Props> {
  private setValue = (e: string) => {
    this.props.input!.setValue(e);
  };
  public render() {
    return (
      <InputLayoutStandard input={this.props.input}>
        {this.props.input!.options.values.map((item: any, index: number) => (
          <SelectButton
            key={"single-select-input" + index}
            onClick={() => this.setValue(item)}
            className={this.props.input.value === item ? "active" : ""}
          >
            {item}
          </SelectButton>
        ))}
      </InputLayoutStandard>
    );
  }
}

export default SingleSelectInput;
