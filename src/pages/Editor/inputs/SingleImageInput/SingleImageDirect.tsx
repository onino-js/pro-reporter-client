import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import { EditorStore } from "../../../../stores/editor.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import {
  OkButton,
  CancelButton,
  SelectButton,
  ActionButton,
  HiddenInputFile,
} from "../layouts/EditorButtons";
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
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
  editorStore: allStores.editorStore,
}))
@observer
class SingleImageDirect extends React.Component<Props> {
  private addPhotoRequest = () => {
    this.props.input.uploadRequest();
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
              <HiddenInputFile
                id={"file-input-" + this.props.input!.id}
                name="file"
                onChange={this.props.input.onPhotoUpload}
              />
              <ActionButton
                active={true}
                onClick={this.addPhotoRequest}
                icon="camera"
              />
              <InputPrimitive
                disabled={true}
                value={this.props.input.imageName}
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
        <Row style={{ paddingTop: "20px", paddingBottom: "50px" }}>
          <Col xl={24} style={{ display: "flex", justifyContent: "center" }}>
            {this.props.input.value !== "" ? (
              <img
                src={this.props.input.value}
                className="image-preview"
                width="auto"
                height="150px"
                style={{ maxWidth: "600px" }}
              />
            ) : (
              <p>Pas d'aperçu disponible</p>
            )}
          </Col>
        </Row>
      </InputContainer>
    );
  }
}

export default SingleImageDirect;
