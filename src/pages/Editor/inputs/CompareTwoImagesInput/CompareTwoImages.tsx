import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { Row, Col } from "antd";
import ImageEditor from "./ImageEditor";
import { ActionButton, ActionLink } from "../../../../components/ui/Buttons";
import { CompareTwoImagesStore } from "../../../../stores/inputs/compare-two-images";


interface Props {
  inputId: string;
  input?: CompareTwoImagesStore;
  image: string;
}

const HiddenInputFile = styled.input.attrs({
  type: "file",
})`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  width: "100%";
  height: auto;
  max-width: 100%;
`;

const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class CompareTwoImagesInput extends React.Component<Props> {
  componentDidMount() {
    //this.props.input.initialize();
  }
  componentWillUnmount() {
    // this.props.input.setData();
  }
  private requestImage = () => {
    this.props.input!.reset();
    document
      .getElementById("file-hidden-input-" + this.props.input!.id)!
      .click();
  };
  private openEditor = (edited: string) => {
    this.props.input!.setEdited(edited);
    window.setTimeout(() => {
      this.props.input!.setIsEditVisible(true);
      this.props.input!.canvasStore.resizeCanvas();
    }, 200);
    // if (this.props.input.status === "valid") {
    //   this.props.input.setEdited(edited);
    //   this.props.input.setIsEditVisible(true);
    //   window.setTimeout(
    //     () => this.props.input!.canvasStore.resizeCanvas(),
    //     200,
    //   );
    // }
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
        <InputLayoutStandard input={this.props.input!}>
          <HiddenInputFile
            id={"file-hidden-input-" + this.props.input!.id}
            name="file"
            onChange={this.props.input!.updateImage}
          />
          <ActionButton
            active={true}
            onClick={this.requestImage}
            icon="camera"
          />
          <InputPrimitive disabled={true} value={this.props.input!.imageName} />
        </InputLayoutStandard>
        <MiddleRow>
          <Col xl={24}>
            <Col xl={6}>
              <Row>
                <ActionLink
                  disabled={this.props.input!.data.bg === false}
                  onClick={() => this.openEditor("bg")}
                  label="Editer le fond"
                  icon="edit"
                />
              </Row>
            </Col>
            <Col xl={8}>
              {this.props.input!.value.before === "" && (
                <p>Aucun apperçu disponible</p>
              )}
              {this.props.input!.value.before === false && (
                <ActionLink
                  disabled={this.props.input!.data.bg === false}
                  onClick={() => this.openEditor("before")}
                  label="Editer 'Avant travaux'"
                  icon="edit"
                />
              )}
              {this.props.input!.value.before !== "" &&
                this.props.input!.value.before !== false && (
                  <Img
                    src={this.props.input!.value.before}
                    onClick={() => this.openEditor("before")}
                    alt="#"
                  />
                )}
            </Col>
            <Col xl={8}>
              {this.props.input!.value.after === "" && (
                <p>Aucun apperçu disponible</p>
              )}
              {this.props.input!.value.after === false && (
                <ActionLink
                  disabled={this.props.input!.data.bg === false}
                  onClick={() => this.openEditor("after")}
                  label="Editer 'Après travaux'"
                  icon="edit"
                />
              )}
              {this.props.input!.value.after !== "" &&
                this.props.input!.value.after !== false && (
                  <Img
                    src={this.props.input!.value.after}
                    onClick={() => this.openEditor("after")}
                    alt="#"
                  />
                )}
            </Col>
          </Col>
        </MiddleRow>

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

export default CompareTwoImagesInput;
