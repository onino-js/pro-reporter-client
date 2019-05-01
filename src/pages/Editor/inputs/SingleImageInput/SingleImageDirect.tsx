import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Col, Row } from "antd";
import { ReportStore } from "../../../../stores/report.store";
import { _measures } from "../../../../assets/styles/_measures";
import {
  ActionButton,
  HiddenInputFile,
  CancelButton,
  OkButton,
} from "../../../../components/ui/Buttons";
import { SingleImageStore } from "../../../../stores/inputs/single-image";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";
import { Flex } from "../../../../components/ui/Flex";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: SingleImageStore;
  reportStore?: ReportStore;
}

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  width: "100px";
  height: auto;
  max-height: 100px;
  max-width: 100%;
  background-color: white;
  margin-top: 20px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  reportStore: allStores.reportStore,
}))
@observer
class SingleImageDirect extends React.Component<Props> {
  private addPhotoRequest = () => {
    this.props.input!.uploadRequest();
  };
  public onOk = () => {
    this.props.input!.confirmValue();
    this.props.uiStore!.setIsInputModalOpen(false);
    this.props.reportStore!.renderInput({
      id: this.props.input!.id,
      type: this.props.input!.inputRef.type,
      value: this.props.input!.value,
    });
  };
  public onCancel = () => {
    this.props.input!.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public onRefresh = () => {
    this.props.input!.reset();
  };
  public render() {
    const input = this.props.input!;
    return (
      <React.Fragment>
        <InputContainer
          close={this.onCancel}
          visible={this.props.uiStore!.isInputModalOpen}
        >
          <InputLayoutDirect
            label={input.inputRef.label}
            onOk={this.onOk}
            onCancel={this.onCancel}
            onRefresh={this.onRefresh}
            status={input.status}
          >
            <Body>
              <HiddenInputFile
                id={"file-input-" + input.id}
                name="file"
                onChange={input.onPhotoUpload}
              />
              <Flex>
                <ActionButton onClick={this.addPhotoRequest} icon="camera" />
                <InputPrimitive disabled={true} value={input.imageName} />
              </Flex>
              {input.value && (
                <Img
                  src={input.value}
                  className="image-preview"
                  width="auto"
                  height="150px"
                  style={{ maxWidth: "600px" }}
                />
              )}
            </Body>
          </InputLayoutDirect>
        </InputContainer>
        {/* <InputContainer
          close={this.onCancel}
          visible={this.props.uiStore!.isInputModalOpen}
        >
          <Row type="flex">
            <Col xl={16} md={16} xs={24}>
              <InputLayoutStandard input={this.props.input!}>
                <HiddenInputFile
                  id={"file-input-" + this.props.input!.id}
                  name="file"
                  onChange={this.props.input!.onPhotoUpload}
                />
                <ActionButton onClick={this.addPhotoRequest} icon="camera" />
                <InputPrimitive
                  disabled={true}
                  value={this.props.input!.imageName}
                />
                <Img
                  src={this.props.input!.value}
                  className="image-preview"
                  width="auto"
                  height="150px"
                  style={{ maxWidth: "600px" }}
                />
              </InputLayoutStandard>
            </Col>
            <Col
              xl={8}
              md={8}
              xs={24}
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
              {this.props.input!.value !== "" ? (
                <img
                  src={this.props.input!.value}
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
        </InputContainer> */}
      </React.Fragment>
    );
  }
}

export default SingleImageDirect;
