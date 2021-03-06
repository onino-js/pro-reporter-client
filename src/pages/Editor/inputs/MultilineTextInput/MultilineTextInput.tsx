import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { TextareaInput } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { MultilineTextStore } from "../../../../stores/inputs/multiline-text";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: MultilineTextStore;
  layout?: any;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class MultilineTextInput extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input!.setValue(e.currentTarget.value);
  };
  public render() {
    const input = this.props.input!;
    return (
      <InputLayoutStandard input={input}>
        <TextareaInput value={input.value} onChange={this.setValue} />
      </InputLayoutStandard>
    );
  }
}

export default MultilineTextInput;
