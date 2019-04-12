import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutModal from "../layouts/InputLayoutModal";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { EditorStore } from "../../../../stores/editor.store";
import FreeModal from "../../../../components/modals/FreeModal";
import { mainTheme } from "../../../../assets/styles/_colors";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  editorStore?: EditorStore;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(item => item.id === inputId)[0],
  editorStore: allStores.editorStore,
}))
@observer
class StringInputModal extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input.setValue(e.currentTarget.value);
  };
  public onOk = () => {
    this.props.input.confirmValue();
    this.props.uiStore!.setIsInputModalOpen(false);
    this.props.editorStore!.renderInput({
      id: this.props.input.id,
      type: this.props.input.type,
      value: this.props.input.value,
    });
  };
  public onCancel = () => {
    this.props.input.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public render() {
    return (
      <FreeModal
        close={this.onCancel}
        show={this.props.uiStore!.isInputModalOpen}
        style={{
          // width: "auto",
          height: "auto",
          backgroundColor: mainTheme.bg_secondary,
          borderRadius: "10px",
          border: "none",
        }}
      >
        <InputLayoutModal
          input={this.props.input}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <InputPrimitive
            type="text"
            value={this.props.input!.value}
            onChange={this.setValue}
          />
        </InputLayoutModal>
      </FreeModal>
    );
  }
}

export default StringInputModal;
