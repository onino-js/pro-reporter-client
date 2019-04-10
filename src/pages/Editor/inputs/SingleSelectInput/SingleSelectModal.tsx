import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutModal from "../layouts/InputLayoutModal";
import { UiStore } from "../../../../stores/ui.store";
import { EditorStore } from "../../../../stores/editor.store";
import FreeModal from "../../../../components/modals/FreeModal";
import { mainTheme } from "../../../../assets/styles/_colors";
import { SelectButton } from "../layouts/EditorButtons";
import { InputPrimitive } from "../layouts/InputPrimitive";
import styled from "../../../../styled-components";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  editorStore?: EditorStore;
}

const Modal = styled(FreeModal)``;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
  editorStore: allStores.editorStore,
}))
@observer
class SingleSelectModal extends React.Component<Props> {
  private setValue = (e: string) => {
    this.props.input!.setValue(e);
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
          <div style={{ width: "100%" }}>
            {this.props.input!.options.values.map(
              (item: any, index: number) => (
                <SelectButton
                  key={"single-select-input" + index}
                  onClick={() => this.setValue(item)}
                  className={this.props.input.value === item ? "active" : ""}
                >
                  {item}
                </SelectButton>
              ),
            )}
          </div>
        </InputLayoutModal>
      </FreeModal>
    );
  }
}

export default SingleSelectModal;
