import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import { Button } from "antd/lib/radio";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Row, Col } from "antd";
import { ActionIconBox } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputPrimitive } from "../layouts/InputPrimitive";

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

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class SingleImageInput extends React.Component<Props> {
  private setValue = (e: string) => {
    this.props.input!.setValue(e);
  };
  private addPhotoRequest = () => {
    this.props.input.uploadRequest();
  };
  public render() {
    return (
      <React.Fragment>
        <InputLayoutStandard
          input={this.props.input}
          actions={
            <ActionIconBox active={true} onClick={this.addPhotoRequest}>
              <FontAwesomeIcon icon="camera" />
            </ActionIconBox>
          }
        >
          <HiddenInputFile
            id={"file-input-" + this.props.input!.id}
            name="file"
            onChange={this.props.input.onPhotoUpload}
          />
          <InputPrimitive disabled={true} value={this.props.input.imageName} />
        </InputLayoutStandard>
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
      </React.Fragment>
    );
  }
}

export default SingleImageInput;
