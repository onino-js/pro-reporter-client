import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import FreeModal from "../../../../components/modals/FreeModal";
import { ActionIconBox } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { Row, Col } from "antd";
import ImageEditor from "./ImageEditor";
import { mainTheme } from "../../../../assets/styles/_colors";
import InputLayoutModal from "../layouts/InputLayoutModal";

interface Props {
  inputId: string;
  input?: any;
  image: string;
  layout: string;
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
class SingleImageEditableInput extends React.Component<Props> {
  componentDidMount() {
    this.props.input.initialize();
  }
  componentWillUnmount() {
    this.props.input.setData();
  }
  private requestImage = () => {
    document.getElementById("file-input-" + this.props.input.id)!.click();
  };
  private openModal = () => {
    if (this.props.input.status === "valid") {
      this.props.input.setIsEditVisible(true);
      window.setTimeout(
        () => this.props.input!.canvasStore.resizeCanvas(),
        200,
      );
    }
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
    const Layout: any =
      this.props.layout === "modal" ? InputLayoutModal : InputLayoutStandard;
    return (
      <React.Fragment>
        <Layout
          input={this.props.input}
          actions={
            <div style={{ display: "flex" }}>
              <ActionIconBox active={true} onClick={this.requestImage}>
                <FontAwesomeIcon icon="camera" />
              </ActionIconBox>
            </div>
          }
          additionalInfos={
            <Row
              type="flex"
              style={{ paddingTop: "20px", paddingBottom: "50px" }}
            >
              <Col xl={6} xs={6} />
              <Col
                xl={3}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActionIconBox
                  active={this.props.input.status === "valid"}
                  onClick={this.openModal}
                >
                  <FontAwesomeIcon icon="edit" />
                </ActionIconBox>
              </Col>
              <Col
                xl={10}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {this.props.input.value !== "" ? (
                  <Img src={this.props.input.value} className="image-preview" />
                ) : (
                  <p>Pas d'aperçu disponible</p>
                )}
              </Col>
              <Col xl={5} />
            </Row>
          }
        >
          <HiddenInputFile
            id={"file-input-" + this.props.input!.id}
            name="file"
            onChange={this.props.input.updateImage}
          />
          <InputPrimitive disabled={true} value={this.props.input.imageName} />
        </Layout>

        <FreeModal
          style={{
            width: "80%",
            height: "80%",
            backgroundColor: mainTheme.bg_secondary,
            borderRadius: "40px",
            border: "none",
          }}
          show={this.props.input.isEditVisible}
          close={this.onEditorCancel}
        >
          <ImageEditor
            input={this.props.input}
            onOk={this.onEditorOk}
            onCancel={this.onEditorCancel}
          />
        </FreeModal>
      </React.Fragment>
    );
  }
}

export default SingleImageEditableInput;
