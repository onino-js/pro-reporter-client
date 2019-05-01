import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import { Col } from "antd";
import ImageEditor from "./ImageEditor";
import { ReportStore } from "../../../../stores/report.store";
import {
  HiddenInputFile,
  ActionButton,
  ActionLink,
} from "../../../../components/ui/Buttons";
import {
  CompareTwoImagesStore,
  Iedited,
} from "../../../../stores/inputs/compare-two-images";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: CompareTwoImagesStore;
  reportStore?: ReportStore;
}

const Body = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  /* margin-bottom: 30px; */
  overflow-y: auto;
`;

const UpperRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0px 20px;
`;

const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Col1 = styled(Col).attrs({
  xl: 8,
  md: 24,
  xs: 24,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Col2 = styled(Col).attrs({
  xl: 8,
  md: 12,
  xs: 24,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  width: 90%;
  height: auto;
  cursor: pointer;
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  reportStore: allStores.reportStore,
}))
@observer
class CompareTwoImagesDirect extends React.Component<Props> {
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
    this.props.input!.restore();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  private requestImage = () => {
    this.props.input!.reset();
    document
      .getElementById("file-hidden-input-" + this.props.input!.id)!
      .click();
  };
  private openEditor = (edited: Iedited) => {
    this.props.input!.setEdited(edited);
    window.setTimeout(() => {
      this.props.input!.setIsEditVisible(true);
      this.props.input!.canvasStore.resizeCanvas();
    }, 200);
  };

  private onEditorCancel = () => {
    this.props.input!.restoreEdited();
    this.props.input!.setIsEditVisible(false);
  };
  private onEditorOk = () => {
    this.props.input!.validateCanvas();
    this.props.input!.setIsEditVisible(false);
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
              <UpperRow>
                <HiddenInputFile
                  id={"file-hidden-input-" + input.id}
                  name="file"
                  onChange={input.updateImage}
                />
                <ActionButton onClick={this.requestImage} icon="camera" />
                <InputPrimitive disabled={true} value={input.imageName} />
              </UpperRow>
              <MiddleRow>
                <Col1>
                  <ActionLink
                    disabled={input.data.bg.length === 0}
                    onClick={() => this.openEditor("bg")}
                    label="Editer le fond"
                    icon="edit"
                  />
                </Col1>
                <Col2>
                  {input.value.before === "" && (
                    <ActionLink
                      disabled={input.data.bg.length === 0}
                      onClick={() => this.openEditor("before")}
                      label="Editer 'Avant travaux'"
                      icon="edit"
                    />
                  )}
                  {input.value.before !== "" && (
                    <Img
                      src={input.value.before}
                      onClick={() => this.openEditor("before")}
                      alt="#"
                    />
                  )}
                </Col2>
                <Col2>
                  {input.value.after === "" && (
                    <ActionLink
                      disabled={input.data.bg.length === 0}
                      onClick={() => this.openEditor("after")}
                      label="Editer 'Après travaux'"
                      icon="edit"
                    />
                  )}
                  {input.value.after !== "" && (
                    <Img
                      src={input.value.after}
                      onClick={() => this.openEditor("after")}
                      alt="#"
                    />
                  )}
                </Col2>
              </MiddleRow>
            </Body>
          </InputLayoutDirect>
        </InputContainer>

        <ImageEditor
          show={this.props.input!.isEditVisible}
          addObjects={this.props.input!.edited !== "bg"}
          input={this.props.input}
          onOk={this.onEditorOk}
          onCancel={this.onEditorCancel}
          isActiveSelection={this.props.input!.isActiveSelection}
          isSideMenuOpen={this.props.input!.isSideMenuOpen}
          isObjectEditOpen={this.props.input!.isObjectEditOpen}
          canvasMode={this.props.input!.canvasStore.canvasMode}
          activeObjects={this.props.input!.activeObjects}
        />
      </React.Fragment>
    );
  }
}

export default CompareTwoImagesDirect;
