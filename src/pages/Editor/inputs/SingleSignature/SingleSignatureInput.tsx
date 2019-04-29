import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Row, Col } from "antd";
import SingleSignatureEditor from "./SingleSignatureEditor";
import { ActionButton } from "../../../../components/ui/Buttons";
import { SingleSignatureStore } from "../../../../stores/inputs/single-signature";

interface Props {
  inputId: string;
  input?: SingleSignatureStore;
  image: string;
  layout?: string;
}

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  width: "100%";
  height: auto;
  max-width: 100%;
  background-color: white;
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class SingleSignatureInput extends React.Component<Props> {
  private openModal = () => {
    this.props.input!.setIsEditVisible(true);
    window.setTimeout(() => this.props.input!.canvasStore.resizeCanvas(), 200);
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
          <ActionButton icon="edit"  onClick={this.openModal} />
        </InputLayoutStandard>
        <Row type="flex" style={{ paddingTop: "20px", paddingBottom: "50px" }}>
          <Col xl={6} xs={6} />
          <Col
            xl={3}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Col xl={10}>
            {this.props.input!.value !== "" ? (
              <Img
                src={this.props.input!.value}
                style={{}}
                width="100%"
                className="image-preview"
              />
            ) : (
              <p>Pas d'aperçu disponible</p>
            )}
          </Col>
          <Col xl={5} />
        </Row>

        <SingleSignatureEditor
          show={this.props.input!.isEditVisible}
          input={this.props.input}
          onOk={this.onEditorOk}
          onCancel={this.onEditorCancel}
        />
      </React.Fragment>
    );
  }
}

export default SingleSignatureInput;
