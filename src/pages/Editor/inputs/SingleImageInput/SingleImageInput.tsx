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
import { ActionButton, HiddenInputFile } from "../layouts/EditorButtons";

interface Props {
  inputId: string;
  input?: any;
  image: string;
}

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class SingleImageInput extends React.Component<Props> {
  private addPhotoRequest = () => {
    this.props.input.uploadRequest();
  };
  public render() {
    return (
      <React.Fragment>
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
