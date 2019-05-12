import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { InputPrimitive, TextareaInput } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { StringStore } from "../../../../stores/inputs/string";
import { InputList } from "../layouts/InputList";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: StringStore;
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
    const list = this.props.input!.inputRef.list;
    const input = this.props.input!;
    return (
      <InputLayoutStandard input={input}>
        <TextareaInput value={input.value} onChange={this.setValue} />
        {list && <InputList list={list} setValue={input.setValue} />}
      </InputLayoutStandard>
    );
  }
}

export default MultilineTextInput;
