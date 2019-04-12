import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutModal from "../layouts/InputLayoutModal";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { EditorStore } from "../../../../stores/editor.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { OkButton, CancelButton } from "../layouts/EditorButtons";
import { Col, Row } from "antd";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  editorStore?: EditorStore;
}

const InputContainer: any = styled.div`
  display: ${(props: any) => (props.visible ? "flex" : "none")};
  background-color: ${props => props.theme.bg_secondary};
  /* min-height: 400px; */
  border-top: 5px solid ${props => props.theme.secondary};
  padding: 50px;
  flex-direction: column;
  justify-content: space-between;
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  editorStore: allStores.editorStore,
}))
@observer
class StringInputDirect extends React.Component<Props> {
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
      <InputContainer
        close={this.onCancel}
        visible={this.props.uiStore!.isInputModalOpen}
      >
        <Row type="flex">
          <Col xl={16}>
            <InputLayoutStandard input={this.props.input}>
              <InputPrimitive
                type="text"
                value={this.props.input!.value}
                onChange={this.setValue}
              />
            </InputLayoutStandard>
          </Col>
          <Col
            xl={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <CancelButton onClick={this.onCancel}> ANNULER </CancelButton>
            <OkButton onClick={this.onOk}>CONFIRMER</OkButton>
          </Col>
        </Row>
      </InputContainer>
    );
  }
}

export default StringInputDirect;
