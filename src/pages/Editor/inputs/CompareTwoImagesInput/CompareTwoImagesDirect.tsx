import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Col, Row } from "antd";
import ImageEditor from "./ImageEditor";
import { ReportStore } from "../../../../stores/report.store";
import { _measures } from "../../../../assets/styles/_measures";
import { HiddenInputFile, ActionButton, ActionLink, CancelButton, OkButton } from "../../../../components/ui/Buttons";
import { CompareTwoImagesStore, Iedited } from "../../../../stores/inputs/compare-two-images";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: CompareTwoImagesStore;
  reportStore?: ReportStore;
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
  @media (max-width: ${_measures.tablet}px) {
    padding: 20px;
  }
`;

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  max-width: 90%;
  height: auto;
  cursor: pointer;
`;

const UpperRow = styled.div`
  width: 100%;
  display: flex;
`;

const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
    this.props.input!.retsoreValue();
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
    this.props.input!.restore();
    this.props.input!.setIsEditVisible(false);
  };
  private onEditorOk = () => {
    this.props.input!.validateCanvas();
    this.props.input!.setIsEditVisible(false);
  };
  public render() {
    return (
      <React.Fragment>
        <InputContainer
          close={this.onCancel}
          visible={this.props.uiStore!.isInputModalOpen}
        >
          <UpperRow>
            <Col xl={24} xs={24}>
              <InputLayoutStandard input={this.props.input!}>
                <HiddenInputFile
                  id={"file-hidden-input-" + this.props.input!.id}
                  name="file"
                  onChange={this.props.input!.updateImage}
                />
                <ActionButton
                  onClick={this.requestImage}
                  icon="camera"
                />
                <InputPrimitive
                  disabled={true}
                  value={this.props.input!.imageName}
                />
              </InputLayoutStandard>
            </Col>
          </UpperRow>
          <MiddleRow>
            <Col xl={24} xs={24}>
              <Col xl={8} xs={8}>
                <Row>
                  <ActionLink
                    disabled={this.props.input!.data.bg.length === 0}
                    onClick={() => this.openEditor("bg")}
                    label="Editer le fond"
                    icon="edit"
                  />
                </Row>
              </Col>
              <Col xl={8} xs={8}>
                {this.props.input!.value.before === "" && (
                  <p>Aucun apperçu disponible</p>
                )}
                {this.props.input!.value.before === "" && (
                  <ActionLink
                    disabled={this.props.input!.data.bg.length === 0}
                    onClick={() => this.openEditor("before")}
                    label="Editer 'Avant travaux'"
                    icon="edit"
                  />
                )}
                {this.props.input!.value.before !== "" &&
                  this.props.input!.value.before !== "" && (
                    <Img
                      src={this.props.input!.value.before}
                      onClick={() => this.openEditor("before")}
                      alt="#"
                    />
                  )}
              </Col>
              <Col xl={8} xs={8}>
                {this.props.input!.value.after === "" && (
                  <p>Aucun apperçu disponible</p>
                )}
                {this.props.input!.value.after === "" && (
                  <ActionLink
                    disabled={this.props.input!.data.bg.length === 0}
                    onClick={() => this.openEditor("after")}
                    label="Editer 'Après travaux'"
                    icon="edit"
                  />
                )}
                {this.props.input!.value.after !== "" &&
                  this.props.input!.value.after !== "" && (
                    <Img
                      src={this.props.input!.value.after}
                      onClick={() => this.openEditor("after")}
                      alt="#"
                    />
                  )}
              </Col>
            </Col>
          </MiddleRow>
          <BottomRow>
            <CancelButton onClick={this.onCancel}> ANNULER </CancelButton>
            <OkButton onClick={this.onOk}>CONFIRMER</OkButton>
          </BottomRow>
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
          // addObjectsPanel={this.edited !== "bg"}
        />
      </React.Fragment>
    );
  }
}

export default CompareTwoImagesDirect;
