import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { InputList } from "../layouts/InputList";
import { SingleAddressStore } from "../../../../stores/inputs/single-address";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: SingleAddressStore;
  layout?: any;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class SingleAddressInput extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input!.setValue(e.currentTarget.value);
  };
  public render() {
    const input = this.props.input!;
    return (
      <InputLayoutStandard input={input}>
        <InputPrimitive
          type="text"
          value={input.value}
          onChange={this.setValue}
        />
      </InputLayoutStandard>
    );
  }
}

export default SingleAddressInput;
