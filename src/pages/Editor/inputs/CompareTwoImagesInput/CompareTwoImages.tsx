import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import { Button } from "antd/lib/radio";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import ProModal from "../../../../components/modals/ProModal";
import FreeModal from "../../../../components/modals/FreeModal";
import { ActionIconBox } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { Row, Col } from "antd";
import ImageEditor from "./ImageEditor";
import { mainTheme } from "../../../../assets/styles/_colors";
import { ActionButton } from "../layouts/EditorButtons";

interface Props {
  inputId: string;
  input?: any;
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

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
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
    this.props.input.reset();
    document
      .getElementById("file-hidden-input-" + this.props.input.id)!
      .click();
  };
  private openEditor = (edited: string) => {
    this.props.input.setEdited(edited);
    window.setTimeout(() => {
      this.props.input.setIsEditVisible(true);
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
    this.props.input.restore();
    this.props.input.setIsEditVisible(false);
  };
  private onEditorOk = () => {
    this.props.input.validateCanvas();
    this.props.input.setIsEditVisible(false);
  };

  public render() {
    return (
      <React.Fragment>
        <InputLayoutStandard input={this.props.input}>
          <HiddenInputFile
            id={"file-hidden-input-" + this.props.input!.id}
            name="file"
            onChange={this.props.input.updateImage}
          />
          <ActionButton
            active={true}
            onClick={this.requestImage}
            icon="camera"
          />
          <InputPrimitive disabled={true} value={this.props.input.imageName} />
        </InputLayoutStandard>
        <Row type="flex" style={{ paddingTop: "20px", paddingBottom: "50px" }}>
          <Col xl={12}>
            <ActionIconBox
              disabled={this.props.input.data.bg === false}
              // active={this.props.input.data.bg !== false}
              onClick={() => this.openEditor("bg")}
            >
              <FontAwesomeIcon icon="edit" />
            </ActionIconBox>
            <Row type="flex" justify="center">
              <ActionButton
                title="Editer 'Avant travaux'"
                disabled={this.props.input.data.bg === false}
                onClick={() => this.openEditor("before")}
              />
            </Row>
            <Row type="flex" justify="center">
              {this.props.input.value.before !== "" ? (
                <Img
                  src={this.props.input.value.before}
                  className="image-preview"
                />
              ) : (
                <p>Aucun apperçu disponible</p>
              )}
            </Row>
          </Col>
          <Col xl={12}>
            <Row type="flex" justify="center">
              <ActionButton
                title="Editer 'Après travaux'"
                disabled={this.props.input.data.bg === false}
                onClick={() => this.openEditor("after")}
              />
            </Row>
            <Row type="flex" justify="center">
              {this.props.input.value.after !== "" ? (
                <Img
                  src={this.props.input.value.after}
                  className="image-preview"
                />
              ) : (
                <p>Aucun apperçu disponible</p>
              )}
            </Row>
          </Col>
        </Row>

        <FreeModal
          style={{
            width: "80%",
            height: "100%",
            backgroundColor: mainTheme.bg_secondary,
            borderRadius: "40px",
            border: "none",
          }}
          show={this.props.input.isEditVisible}
          close={this.onEditorCancel}
        >
          <ImageEditor
            addObjects={this.props.input.edited !== "bg"}
            input={this.props.input}
            onOk={this.onEditorOk}
            onCancel={this.onEditorCancel}
            isActiveSelection={this.props.input.isActiveSelection}
            isSideMenuOpen={this.props.input.isSideMenuOpen}
            isObjectEditOpen={this.props.input.isObjectEditOpen}
            canvasMode={this.props.input.canvasStore.canvasMode}
            activeObjects={this.props.input.activeObjects}
            // addObjectsPanel={this.edited !== "bg"}
          />
        </FreeModal>
      </React.Fragment>
    );
  }
}

export default CompareTwoImagesInput;
